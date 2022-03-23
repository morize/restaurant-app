const { Router } = require('express');
const passport = require('passport');

const { PLAYGROUND } = require('../utils/config');
const authRoutes = Router();

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
      : 'http://localhost:3001/overview',
    session: true,
  })
);

authRoutes.get('/auth/logout', (req, res) => {
  req.logout();
  return res.redirect('http://localhost:3001');
});

authRoutes.get('/failure', (req, res) => res.send('Failed to log in.'));

module.exports = authRoutes;
