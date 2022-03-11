const helmet = require('helmet');

const { ENVIRONMENT } = require('../utils/config');

async function setHelmetMiddleware() {
  return await helmet({
    contentSecurityPolicy: ENVIRONMENT === 'production',
    crossOriginEmbedderPolicy: ENVIRONMENT === 'production',
  });
}

module.exports = { setHelmetMiddleware };
