const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');

const { CLIENT_ID, CLIENT_SECRET } = require('../utils/config');

function verifyAuthCallback(accessToken, refreshToken, profile, done) {
  done(null, profile);
}

function setupGooglePassportStrategy() {
  const AUTH_OPTIONS = {
    callbackURL: '/auth/google/callback',
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
  };

  passport.use(new Strategy(AUTH_OPTIONS, verifyAuthCallback));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    done(null, id);
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
