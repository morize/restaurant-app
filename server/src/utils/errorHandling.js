var ObjectId = require('mongoose').Types.ObjectId;

function checkForValidItemId(id) {
  if (!ObjectId.isValid(id) || !(ObjectId(id).toString() === id)) {
    throw new Error('Invalid ID');
  }
}

function checkIfItemExists(item) {
  if (!item) throw new Error('Item not found');
}

module.exports = {
  checkForValidItemId,
  checkIfItemExists,
};
