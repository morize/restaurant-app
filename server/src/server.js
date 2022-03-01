const { join } = require('path');
const express = require('express');

const { ApolloServer } = require('apollo-server-express');

const { loadFilesSync } = require('@graphql-tools/load-files');
const { makeExecutableSchema } = require('@graphql-tools/schema');

async function startApolloServer() {
  const app = express();

  const typesArray = loadFilesSync(join(__dirname, '**/*.graphql'));
  const resolversArray = loadFilesSync(join(__dirname, '**/*.resolvers.js'));

  const schema = makeExecutableSchema({
    typeDefs: typesArray,
    resolvers: resolversArray,
  });

  const server = new ApolloServer({
    schema,
  });

  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  app.listen(3000, () => console.log('Listening on port: 3000'));
}

startApolloServer();
