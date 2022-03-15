const { Router } = require('express');
const passport = require('passport');

const { PLAYGROUND } = require('../utils/config');
const authRoutes = Router();

authRoutes.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['email', 'profile'],
  })
);

authRoutes.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/failed',
    successRedirect: PLAYGROUND
      ? 'https://studio.apollographql.com/sandbox/explorer'
      : 'http://localhost:3001',
    session: true,
  })
);

module.exports = authRoutes;
