const { join } = require('path');

const { ApolloServer } = require('apollo-server-express');
const { loadFilesSync } = require('@graphql-tools/load-files');
const { makeExecutableSchema } = require('@graphql-tools/schema');

function getSchema() {
  const typeDefs = loadFilesSync(join(__dirname, '../**/*.graphql'));
  const resolvers = loadFilesSync(join(__dirname, '../**/*.resolvers.js'));

  return makeExecutableSchema({ typeDefs, resolvers });
}

function readContext({ req }) {
  req.isAuthenticated() && console.log(req.user);
  return { user: req.user };
}

function apolloServer() {
  return new ApolloServer({
    schema: getSchema(),
    context: readContext,
    cache: true,
  });
}

module.exports = { apolloServer };
