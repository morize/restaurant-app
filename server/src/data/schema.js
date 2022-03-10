const { join } = require('path');
const { loadFilesSync } = require('@graphql-tools/load-files');
const { makeExecutableSchema } = require('@graphql-tools/schema');

function getSchema() {
  const typeDefs = loadFilesSync(join(__dirname, '../**/*.graphql'));
  const resolvers = loadFilesSync(join(__dirname, '../**/*.resolvers.js'));
  
  return makeExecutableSchema({ typeDefs, resolvers });
}

module.exports = { getSchema };
