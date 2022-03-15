const cors = require('cors');
const { readFileSync } = require('fs');
const { createServer } = require('https');

const { ENVIRONMENT, PORT_PROD, PORT_DEV } = require('../utils/config');

function corsMiddleware() {
  const corsOptions = {
    origin: ['http://localhost:3001', 'https://studio.apollographql.com'],
    credentials: true,
  };

  return cors(corsOptions);
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
