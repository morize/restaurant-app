const cors = require('cors');
const { readFileSync } = require('fs');
const { createServer } = require('https');

const { ENVIRONMENT, PORT_PROD, PORT_DEV } = require('../utils/config');

function corsMiddleware() {
  return cors({
    origin: [
      'http://localhost:3000',
      'https://studio.apollographql.com',
      'https://localhost',
    ],
    credentials: true,
  });
}

function startAppListener(app) {
  if (ENVIRONMENT === 'production') {
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

module.exports = { corsMiddleware, startAppListener };
