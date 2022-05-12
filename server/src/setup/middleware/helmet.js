const helmet = require('helmet');

const helmetMiddleware = helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
});

module.exports = helmetMiddleware;
