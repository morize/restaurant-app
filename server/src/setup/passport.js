const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = require('../utils/config');
const { getUserByGoogleId, addNewUser } = require('../data/users/users.model');

function verifyAuthCallback(accessToken, refreshToken, profile, done) {
  done(null, profile);
}

function setupGooglePassportStrategy() {
  const AUTH_OPTIONS = {
    callbackURL: '/auth/google/callback',
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
  };

  passport.use(new Strategy(AUTH_OPTIONS, verifyAuthCallback));

  passport.serializeUser(async (user, done) => {
    const existingUser = await getUserByGoogleId(user.id);

    if (!existingUser) {
      const newUserDoc = await addNewUser(user.name.givenName, user.id);
      done(null, newUserDoc);
    } else {
      done(null, existingUser);
    }
  });

  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });
}

function initializePassport() {
  return passport.initialize();
}

function initializePassportSession() {
  return passport.session();
}

module.exports = {
  setupGooglePassportStrategy,
  initializePassport,
  initializePassportSession,
};
