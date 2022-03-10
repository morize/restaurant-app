const mongoose = require('mongoose');

async function startMongoDBServer() {
  return await mongoose.connect(process.env.MONGO_URL);
}

module.exports = { startMongoDBServer };
