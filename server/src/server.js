require('dotenv').config();

const { readFileSync } = require('fs');
const https = require('https');
const http = require('http');

const app = require('./setup/app');
const { startMongoDBServer } = require('./setup/database');
const { startApolloServer } = require('./setup/apollo');

const { ENVIRONMENT, PORT } = require('./utils/config');

function determineServerProtocol(app) {
  if (ENVIRONMENT === 'production') {
    const serverCredentials = {
      key: readFileSync('.ssl/key.pem'),
      cert: readFileSync('.ssl/cert.pem'),
    };
    return https.createServer(serverCredentials, app);
  } else {
    return http.createServer(app);
  }
}

async function startServer() {
  const server = determineServerProtocol(app);

  await startMongoDBServer();
  await startApolloServer(app);

  server.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
}

startServer();
