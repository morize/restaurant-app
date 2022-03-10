const helmet = require('helmet');

async function setHelmetMiddleware() {
  const isEnvironmentProduction = process.env.NODE_ENV === 'production';

  return await helmet({
    contentSecurityPolicy: isEnvironmentProduction,
    crossOriginEmbedderPolicy: isEnvironmentProduction,
  });
}

module.exports = { setHelmetMiddleware };
