const helmet = require('helmet');

const { ENVIRONMENT } = require('../utils/config');

function helmetMiddleware() {
  const isProduction = ENVIRONMENT === 'production';

  return helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  });
}

module.exports = { helmetMiddleware };
