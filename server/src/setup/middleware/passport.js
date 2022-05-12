const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = require('../../utils/config');
const { getUserByGoogleId, createUser } = require('../../data/users/users.model');

async function findOrCreateUserInDatabase(profile, done) {
  const existingUser = await getUserByGoogleId(profile.id);

  if (!existingUser) {
    const newUserDoc = await createUser(profile.name.givenName, profile.id);
    done(null, newUserDoc._id);
  } else {
    done(null, existingUser._id);
  }
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
      (_, __, profile, done) => done(null, profile)
    )
  );

  passport.serializeUser(findOrCreateUserInDatabase);

  passport.deserializeUser((id, done) => done(null, id));
}

function initializePassport() {
  return passport.initialize();
}

function initializePassportSession() {
  return passport.session();
}

module.exports = {
  initializePassport,
  initializePassportSession,
  setupGooglePassportStrategy,
};
