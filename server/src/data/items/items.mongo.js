const { Schema, model } = require('mongoose');

const itemsSchema = new Schema({
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
    enum: ['breakfast', 'meal', 'dessert', 'drink'],
  },

  imagePath: {
    type: String,
    required: true,
    default: 'default.jpg',
  },
});

module.exports = model('Item', itemsSchema);
