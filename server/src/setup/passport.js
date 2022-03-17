const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = require('../utils/config');
const { getUserByGoogleId, createUser } = require('../data/users/users.model');

async function findOrCreateUser(user, done) {
  const existingUser = await getUserByGoogleId(user.id);

  if (!existingUser) {
    const newUserDoc = await createUser(user.name.givenName, user.id);
    done(null, newUserDoc._id);
  } else {
    done(null, existingUser._id);
  }
}

function initializePassport() {
  return passport.initialize();
}

function initializePassportSession() {
  return passport.session();
}

function setupGooglePassportStrategy() {
  const googleStrategyOptions = {
    callbackURL: '/auth/google/callback',
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
  };

  passport.use(
    new Strategy(
      googleStrategyOptions,
      (accessToken, refreshToken, profile, done) => done(null, profile)
    )
  );

  passport.serializeUser(findOrCreateUser);

  passport.deserializeUser((id, done) => done(null, id));
}

module.exports = {
  initializePassport,
  initializePassportSession,
  setupGooglePassportStrategy,
};
