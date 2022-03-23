const {
  AuthenticationError,
  ValidationError,
  SyntaxError,
} = require('apollo-server-express');

var ObjectId = require('mongoose').Types.ObjectId;

function checkForValidId(id) {
  if (!ObjectId.isValid(id) && !(ObjectId(id).toString() === id)) {
    throw new ValidationError('Invalid ID');
  }
}

function checkIfItemExists(item) {
  if (!item) throw new SyntaxError('Item not found');
}

function checkIfAuthenticated(isLoggedIn) {
  if (!isLoggedIn) throw new AuthenticationError('You are not logged in');
}

module.exports = {
  checkForValidId,
  checkIfItemExists,
  checkIfAuthenticated,
};
