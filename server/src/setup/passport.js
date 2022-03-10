const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');

function verifyAuthCallback(accessToken, refreshToken, profile, done) {
  console.log(`Token: ${accessToken}`);
  done(null, profile);
}

function setGooglePassportStrategy() {
  const AUTH_OPTIONS = {
    callbackURL: '/auth/google/callback',
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  };

  passport.use(new Strategy(AUTH_OPTIONS, verifyAuthCallback));
}

module.exports = { setGooglePassportStrategy };
