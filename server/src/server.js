const express = require('express');
require('dotenv').config();

const { helmetMiddleware } = require('./setup/helmet');
const { startMongoDBServer } = require('./setup/database');
const { corsMiddleware, startAppListener } = require('./setup/protocol');
const { cookieMiddleware } = require('./setup/cookies');
const {
  setupGooglePassportStrategy,
  initializePassport,
  initializePassportSession,
} = require('./setup/passport');
const { apolloServer } = require('./setup/apollo');

const authRoutes = require('./routes/authRoutes');

async function startApolloServer() {
  const app = express();

  setupGooglePassportStrategy();

  app.use(helmetMiddleware());

  app.use(cookieMiddleware());

  app.use([initializePassport(), initializePassportSession()]);

  app.use(authRoutes);

  app.use(corsMiddleware());

  const server = apolloServer();

  await startMongoDBServer();
  await server.start();

  server.applyMiddleware({ app, path: '/graphql', cors: false });

  startAppListener(app);
}

startApolloServer();
