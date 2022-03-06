const items = require('./items.mongo');
var ObjectId = require('mongoose').Types.ObjectId;

async function getAllItems() {
  return await items.find({});
}

async function getItemById(id) {
  checkForValidItemId(id);

  const item = await items.findById(id);

  checkIfItemExists(item);

  return item;
}

async function getItemsByPrice(min, max) {
  return await items.find({ price: { $gte: min, $lte: max } });
}

async function addNewItem(name, description, price, type) {
  try {
    return await items.create({
      name,
      description,
      price,
      type,
    });
  } catch (err) {
    throw new Error(err);
  }
}

async function updateItem(id, name, description, price, type) {
  checkForValidItemId(id);

  const updatedItem = await items.findOneAndUpdate(
    { _id: id },
    {
      name,
      description,
      price,
      type,
    }
  );

  checkIfItemExists(updatedItem);

  return updatedItem;
}

async function deleteItem(id) {
  checkForValidItemId(id);

  const itemToDelete = await items.findOneAndDelete({ _id: id });

  checkIfItemExists(itemToDelete);

  return itemToDelete;
}

function checkForValidItemId(id) {
  if (!ObjectId.isValid(id) || !(ObjectId(id).toString() === id)) {
    throw new Error('Invalid ID');
  }
}

function checkIfItemExists(item) {
  if (!item) throw new Error('Item not found');
}

module.exports = {
  getAllItems,
  getItemById,
  getItemsByPrice,
  addNewItem,
  updateItem,
  deleteItem,
};
