const MONGO_URL = process.env.MONGO_URL;

const ENVIRONMENT = process.env.NODE_ENV;
const PORT = ENVIRONMENT === 'production' ? process.env.PORT_PROD : process.env.PORT_DEV;

const PLAYGROUND = process.env.PLAYGROUND;

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const COOKIE_KEY_1 = process.env.COOKIE_KEY_1;
const COOKIE_KEY_2 = process.env.COOKIE_KEY_2;

module.exports = {
  MONGO_URL,
  PORT,
  ENVIRONMENT,
  PLAYGROUND,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  COOKIE_KEY_1,
  COOKIE_KEY_2,
};
