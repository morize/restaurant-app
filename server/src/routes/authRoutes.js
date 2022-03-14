const { Router } = require('express');
const passport = require('passport');

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
    successRedirect: 'http://localhost:3001',
    session: true,
  })
);

module.exports = authRoutes;
