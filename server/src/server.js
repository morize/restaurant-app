const { join } = require('path');
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const { ApolloServer } = require('apollo-server-express');

const { loadFilesSync } = require('@graphql-tools/load-files');
const { makeExecutableSchema } = require('@graphql-tools/schema');

mongoose.connection.once('open', () =>
  console.log('MongoDB connection ready!')
);

mongoose.connection.on('error', (err) => console.log(err));

async function startApolloServer() {
  const app = express();

  const MONGO_URL = process.env.MONGO_URL;
  const PORT = process.env.PORT;

  const typesArray = loadFilesSync(join(__dirname, '**/*.graphql'));
  const resolversArray = loadFilesSync(join(__dirname, '**/*.resolvers.js'));

  const schema = makeExecutableSchema({
    typeDefs: typesArray,
    resolvers: resolversArray,
  });

  const server = new ApolloServer({
    schema,
    //debug: false
  });

  await mongoose.connect(MONGO_URL);
  
  await server.start();

  server.applyMiddleware({ app, path: '/graphql' });

  app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
}

startApolloServer();
