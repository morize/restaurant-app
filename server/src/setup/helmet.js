const helmet = require('helmet');

const { ENVIRONMENT } = require('../utils/config');

function helmetMiddleware() {
  const isProduction = ENVIRONMENT === 'production';

  return helmet({
    contentSecurityPolicy: isProduction,
    crossOriginEmbedderPolicy: isProduction,
  });
}

module.exports = { helmetMiddleware };
