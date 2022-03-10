const { readFileSync } = require('fs');
const { createServer } = require('https');

function startAppListenerByProtocol(app) {
  const isEnvironmentProduction = process.env.NODE_ENV === 'production';
  const PORT_DEV = process.env.PORT_DEV;
  const PORT_PROD = process.env.PORT_PROD;

  if (isEnvironmentProduction) {
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

module.exports = { startAppListenerByProtocol };
