const express = require('express');

const helmetMiddleware = require('./middleware/helmet');
const corsMiddleware = require('./middleware/cors');
const cookieMiddleware = require('./middleware/cookies');
const {
  setupGooglePassportStrategy,
  initializePassport,
  initializePassportSession,
} = require('./middleware/passport');

const authRoutes = require('../routes/authRoutes');
const fileRoutes = require('../routes/fileRoutes');
const { setAppRouteFolder, appRoutes } = require('../routes/appRoutes');

const app = express();

app.use(helmetMiddleware);

app.use([setAppRouteFolder(), appRoutes]);

setupGooglePassportStrategy();

app.use(cookieMiddleware);
app.use(corsMiddleware);

app.use([initializePassport(), initializePassportSession()]);

app.use(authRoutes);
app.use(fileRoutes);

module.exports = app;
