var ObjectId = require('mongoose').Types.ObjectId;

function checkForValidId(id) {
  if (!ObjectId.isValid(id) && !(ObjectId(id).toString() === id)) {
    throw new Error('Invalid ID');
  }
}

function checkIfItemExists(item) {
  if (!item) throw new Error('Item not found');
}

function checkIfAuthenticated(isLoggedIn) {
  if (!isLoggedIn) throw new Error('You are not logged in.');
}

module.exports = {
  checkForValidId,
  checkIfItemExists,
  checkIfAuthenticated,
};
