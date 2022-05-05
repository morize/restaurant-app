const { Router } = require('express');
const passport = require('passport');

const { PLAYGROUND, ENVIRONMENT } = require('../utils/config');
const authRoutes = Router();

const serverUrl =
  ENVIRONMENT === 'production' ? 'https://localhost' : 'http://localhost:3000';

authRoutes.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile'],
    prompt: 'select_account',
  })
);

authRoutes.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/failed',
    successRedirect: PLAYGROUND
      ? 'https://studio.apollographql.com/sandbox/explorer'
      : `${serverUrl}/app/cafeteria`,
    session: true,
  })
);

authRoutes.get('/auth/logout', (req, res) => {
  req.logout();
  return res.redirect(`${serverUrl}/app`);
});

authRoutes.get('/failure', (req, res) => res.send('Failed to log in.'));

module.exports = authRoutes;
