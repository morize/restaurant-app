const express = require('express');

const helmetMiddleware = require('./middleware/helmet');
const corsMiddleware = require('./middleware/cors');
const cookieMiddleware = require('./middleware/cookies');
const {
  setupGooglePassportStrategy,
  initializePassport,
  initializePassportSession,
} = require('./middleware/passport');

const authRoutes = require('./routes/authRoutes');
const fileRoutes = require('./routes/fileRoutes');
const appRoutes = require('./routes/appRoutes');

const app = express();

function setupExpressApp() {
  app.use(helmetMiddleware);

  setupGooglePassportStrategy();

  app.use(cookieMiddleware);
  app.use(corsMiddleware);
  app.use([initializePassport(), initializePassportSession()]);

  app.use([express.static('public'), appRoutes]);
  app.use(fileRoutes);
  app.use(authRoutes);
}

setupExpressApp();

module.exports = app;
