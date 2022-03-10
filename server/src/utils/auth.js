const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');

const AUTH_OPTIONS = {
  callbackURL: '/auth/google/callback',
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
};

function verifyAuthCallback(accessToken, refreshToken, profile, done) {
  console.log(`Token: ${accessToken}`);
  done(null, profile);
}


function loginGoogle() {
  passport.authenticate('google', {
    scope: ['email'],
  });
}

async function receiveGoogleCallback() {
  passport.authenticate('google', {
    failureRedirect: '/failed',
    successRedirect: '/',
    session: false,
  }),
    () => console.log('Google CALLED BACK');
}

function logout(req, res) {}

module.exports = {
  AUTH_OPTIONS,
  verifyAuthCallback,
  logout,
};
