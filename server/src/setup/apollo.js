const { join } = require('path');

const { ApolloServer } = require('apollo-server-express');
const { loadFilesSync } = require('@graphql-tools/load-files');
const { makeExecutableSchema } = require('@graphql-tools/schema');

function getSchema() {
  const typeDefs = loadFilesSync(join(__dirname, '../**/*.graphql'));
  const resolvers = loadFilesSync(join(__dirname, '../**/*.resolvers.js'));

  return makeExecutableSchema({ typeDefs, resolvers });
}

async function readContext({ req, res }) {
  const userId = req.user;
  const isAuthenticated = req.isAuthenticated();

  if (isAuthenticated) {
    res.setHeader('currentUserId', userId);
    res.setHeader('isAuthenticated', isAuthenticated);
  }

  return { currentUserId: userId, isAuthenticated: isAuthenticated };
}

const apolloServer = new ApolloServer({
  schema: getSchema(),
  context: readContext,
  cache: true,
  debug: false,
});

module.exports = apolloServer;
