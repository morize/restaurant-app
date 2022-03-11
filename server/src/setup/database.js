const mongoose = require('mongoose');

const { MONGO_URL } = require('../utils/config');

async function startMongoDBServer() {
  return await mongoose.connect(MONGO_URL);
}

module.exports = { startMongoDBServer };
