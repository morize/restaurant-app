const MONGO_URL = process.env.MONGO_URL;

const PORT_DEV = process.env.PORT_DEV;
const PORT_PROD = process.env.PORT_PROD;

const ENVIRONMENT = process.env.NODE_ENV;

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

const COOKIE_KEY_1 = process.env.COOKIE_KEY_1;
const COOKIE_KEY_2 = process.env.COOKIE_KEY_2;

module.exports = {
  MONGO_URL,
  PORT_DEV,
  PORT_PROD,
  ENVIRONMENT,
  CLIENT_ID,
  CLIENT_SECRET,
  COOKIE_KEY_1,
  COOKIE_KEY_2,
};
