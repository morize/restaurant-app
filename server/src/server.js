const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');

require('dotenv').config();

const {
  getSchema,
  startMongoDBServer,
  determineHelmetMiddleware,
  startAppListener,
} = require('./utils/serverSetup');

const {
  AUTH_OPTIONS,
  verifyAuthCallback,
  loginGoogle,
  receiveGoogleCallback,
} = require('./utils/auth');

async function startApolloServer() {
  const app = express();
  const helmet = await determineHelmetMiddleware();
  const server = new ApolloServer({ schema: getSchema() });

  app.use(helmet);

  passport.use(new Strategy(AUTH_OPTIONS, verifyAuthCallback));

  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['email'],
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google', {
      failureRedirect: '/failed',
      successRedirect: '/',
      session: false,
    }),
    () => console.log('Google CALLED BACK')
  );

  // app.get('/auth/logout', logout);

  await startMongoDBServer();
  await server.start();

  server.applyMiddleware({ app, path: '/graphql' });
  server.applyMiddleware({ app, path: '/login' });
  startAppListener(app);
}

startApolloServer();
