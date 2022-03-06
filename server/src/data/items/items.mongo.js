const mongoose = require('mongoose');

const itemsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  description: String,

  price: {
    type: Number,
    required: true,
  },

  type: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Item', itemsSchema);
