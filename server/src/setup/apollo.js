const { join } = require('path');

const { ApolloServer } = require('apollo-server-express');
const { loadFilesSync } = require('@graphql-tools/load-files');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const { PLAYGROUND } = require('../utils/config');

function getSchema() {
  const typeDefs = loadFilesSync(join(__dirname, '../**/*.graphql'));
  const resolvers = loadFilesSync(join(__dirname, '../**/*.resolvers.js'));

  return makeExecutableSchema({ typeDefs, resolvers });
}

function readContext({ req }) {
  return { id: req.user, isAuthenticated: req.isAuthenticated() };
}

function apolloServer() {
  return new ApolloServer({
    schema: getSchema(),
    context: readContext,
    cache: true,
    debug: false,
    //introspection: PLAYGROUND,
  });
}

module.exports = { apolloServer };
