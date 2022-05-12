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
const appRoutes = require('../routes/appRoutes');

const app = express();

app.use(helmetMiddleware);
app.use(cookieMiddleware);
app.use(corsMiddleware);

app.use([express.static('public'), appRoutes]);

setupGooglePassportStrategy();

app.use([initializePassport(), initializePassportSession()]);

app.use(authRoutes);
app.use(fileRoutes);

module.exports = app;
