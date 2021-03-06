const cookieSession = require('cookie-session');

const {
  COOKIE_KEY_1,
  COOKIE_KEY_2,
  ENVIRONMENT,
  PLAYGROUND,
} = require('../../utils/config');

const isProduction = ENVIRONMENT === 'production';

const cookieMiddleware = cookieSession({
  name: 'session',
  maxAge: 1000 * 60 * 60 * 24,
  keys: [COOKIE_KEY_1, COOKIE_KEY_2],
  secure: isProduction,
  sameSite: isProduction | PLAYGROUND ? 'none' : 'strict',
});

module.exports = cookieMiddleware;
