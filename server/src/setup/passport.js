const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');

const { CLIENT_ID, CLIENT_SECRET } = require('../utils/config');

function verifyAuthCallback(accessToken, refreshToken, profile, done) {
  console.log(accessToken);
  done(null, profile);
}

function setGooglePassportStrategy() {
  const AUTH_OPTIONS = {
    callbackURL: '/auth/google/callback',
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
  };

  passport.use(new Strategy(AUTH_OPTIONS, verifyAuthCallback));
}

function initializePassport() {
  return passport.initialize();
}

module.exports = { setGooglePassportStrategy, initializePassport };
