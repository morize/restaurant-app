const helmet = require('helmet');

function helmetMiddleware() {
  return helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  });
}

module.exports = { helmetMiddleware };
