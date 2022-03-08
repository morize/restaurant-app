const express = require('express');
const { ApolloServer } = require('apollo-server-express');

require('dotenv').config();

const {
  getSchema,
  startMongoDBServer,
  determineHelmetMiddleware,
  startAppListener,
} = require('./utils/serverSetup');

async function startApolloServer() {
  const app = express();
  const helmet = await determineHelmetMiddleware();
  const server = new ApolloServer({ schema: getSchema() });
  
  app.use(helmet);

  await startMongoDBServer();
  await server.start();

  server.applyMiddleware({ app, path: '/graphql' });

  startAppListener(app);
}

startApolloServer();
