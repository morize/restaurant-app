const express = require('express');
const { ApolloServer } = require('apollo-server-express');

require('dotenv').config();

const { getSchema } = require('./data/schema');

const { setHelmetMiddleware } = require('./setup/helmet');
const { setGooglePassportStrategy } = require('./setup/passport');
const { startMongoDBServer } = require('./setup/database');
const { startAppListenerByProtocol } = require('./setup/protocol');

const authRoutes = require('./setup/routes/authRoutes');

async function startApolloServer() {
  const app = express();
  const helmet = await setHelmetMiddleware();
  const server = new ApolloServer({ schema: getSchema() });

  app.use(helmet);

  setGooglePassportStrategy();

  app.use(authRoutes);

  await startMongoDBServer();
  await server.start();

  server.applyMiddleware({ app, path: '/graphql' });
  server.applyMiddleware({ app, path: '/login' });
  
  startAppListenerByProtocol(app);
}

startApolloServer();
