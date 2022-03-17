const { Schema, model } = require('mongoose');
const itemsModel = require('../items/items.mongo');

const ordersSchema = new Schema({
  clientId: {
    type: String,
    required: true,
  },

  orderItems: {
    type: [{ item: { type: itemsModel.schema }, quantity: Number, _id: false }],
    required: true,
  },

  status: {
    type: String,
    enum: ['pending', 'completed', 'canceled'],
    required: true,
    default: 'pending',
  },

  extraInfo: String,

  totalPrice: {
    type: Number,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = model('Order', ordersSchema);
