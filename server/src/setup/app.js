const express = require('express');

const { helmetMiddleware } = require('./helmet');
const { corsMiddleware } = require('./protocol');
const { cookieMiddleware } = require('./cookies');
const {
  setupGooglePassportStrategy,
  initializePassport,
  initializePassportSession,
} = require('./passport');

const authRoutes = require('../routes/authRoutes');
const fileRoutes = require('../routes/fileRoutes');
const { setAppRouteFolder, appRoutes } = require('../routes/appRoutes');

const app = express();

app.use(helmetMiddleware());

app.use([setAppRouteFolder(), appRoutes]);

setupGooglePassportStrategy();

app.use(cookieMiddleware());
app.use(corsMiddleware());

app.use([initializePassport(), initializePassportSession()]);

app.use(authRoutes);
app.use(fileRoutes);

module.exports = app;
