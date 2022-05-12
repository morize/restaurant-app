const cors = require('cors');

const corsMiddleware = cors({
  origin: [
    'http://localhost:3000',
    'https://studio.apollographql.com',
    'https://localhost',
  ],
  credentials: true,
});

module.exports = corsMiddleware;
