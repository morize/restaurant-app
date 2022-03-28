const cors = require('cors');
const { readFileSync } = require('fs');
const { createServer } = require('https');

const { ENVIRONMENT, PORT } = require('../utils/config');

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
    ).listen(PORT, () => console.log(`Listening on port: ${PORT}`));
  } else {
    app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
  }
}

module.exports = { corsMiddleware, startAppListener };
