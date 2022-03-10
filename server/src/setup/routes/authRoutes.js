const { Router } = require('express');
const passport = require('passport');

const authRoutes = Router();

authRoutes.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['email'],
  })
);

authRoutes.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/failed',
    successRedirect: '/',
    session: false,
  }),
  () => console.log('Google CALLED BACK')
);

module.exports = authRoutes;
