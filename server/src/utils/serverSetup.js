const { join } = require('path');
const { readFileSync } = require('fs');
const { createServer } = require('https');

const helmet = require('helmet');
const mongoose = require('mongoose');
const { loadFilesSync } = require('@graphql-tools/load-files');
const { makeExecutableSchema } = require('@graphql-tools/schema');

function getSchema() {
  return makeExecutableSchema({
    typeDefs: loadFilesSync(join(__dirname, '../**/*.graphql')),
    resolvers: loadFilesSync(join(__dirname, '../**/*.resolvers.js')),
  });
}

async function startMongoDBServer() {
  return await mongoose.connect(process.env.MONGO_URL);
}

async function determineHelmetMiddleware() {
  const isEnvironmentProduction = process.env.NODE_ENV === 'production';

  return await helmet({
    contentSecurityPolicy: isEnvironmentProduction,
    crossOriginEmbedderPolicy: isEnvironmentProduction,
  });
}

async function startAppListener(app) {
  const isEnvironmentProduction = process.env.NODE_ENV === 'production';
  const PORT_DEV = process.env.PORT_DEV;
  const PORT_PROD = process.env.PORT_PROD;

  if (isEnvironmentProduction) {
    createServer(
      {
        key: readFileSync('.ssl/key.pem'),
        cert: readFileSync('.ssl/cert.pem'),
      },
      app
    ).listen(PORT_PROD, () => console.log(`Listening on port: ${PORT_PROD}`));
  } else {
    app.listen(PORT_DEV, () => console.log(`Listening on port: ${PORT_DEV}`));
  }
}

module.exports = {
  getSchema,
  startMongoDBServer,
  determineHelmetMiddleware,
  startAppListener,
};
