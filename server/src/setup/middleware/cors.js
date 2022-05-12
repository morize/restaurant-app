const cors = require('cors');

module.exports = cors({
  origin: [
    'http://localhost:3000',
    'https://studio.apollographql.com',
    'https://localhost',
  ],
  credentials: true,
});
