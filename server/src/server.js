const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cookieSession = require('cookie-session');

require('dotenv').config();

const { getSchema } = require('./utils/schema');

const { setHelmetMiddleware } = require('./setup/helmet');
const {
  setGooglePassportStrategy,
  initializePassport,
} = require('./setup/passport');
const { startMongoDBServer } = require('./setup/database');
const { startAppListenerByProtocol } = require('./setup/protocol');

const authRoutes = require('./setup/routes/authRoutes');

async function startApolloServer() {
  const app = express();
  const helmet = await setHelmetMiddleware();
  const server = new ApolloServer({ schema: getSchema() });

  setGooglePassportStrategy();

  app.use(helmet);

  app.use(
    cookieSession({
      name: 'session',
      maxAge: 1000 * 60 * 60 * 24,
      keys: [],
    })
  );

  app.use(initializePassport());

  app.use(authRoutes);

  await startMongoDBServer();
  await server.start();

  server.applyMiddleware({ app, path: '/graphql' });
  server.applyMiddleware({ app, path: '/login' });

  startAppListenerByProtocol(app);
}

startApolloServer();
