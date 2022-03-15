const { Schema, model } = require('mongoose');

const usersSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },

  googleId: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    required: true,
    default: 'guest',
    enum: ['guest', 'admin'],
  },
});

module.exports = model('User', usersSchema);
