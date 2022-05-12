const cors = require('cors');

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

module.exports = { corsMiddleware };
