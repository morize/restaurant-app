const items = require('./items.mongo');
const { defaultItemsData } = require('./items.seeder');
const {
  checkForValidId,
  checkIfItemExists,
} = require('../../utils/errorHandling');

async function getItemById(itemId) {
  checkForValidId(itemId);

  const item = await items.findById(itemId);

  checkIfItemExists(item);

  return item;
}

async function getAllItems() {
  return await items.find({});
}

async function getItemsByPrice(min, max) {
  return await items.find({ price: { $gte: min, $lte: max } });
}

async function createItem(name, description, price, type) {
  return await items.create({
    name,
    description,
    price,
    type,
  });
}

async function updateItem(itemId, name, description, price, type) {
  checkForValidId(id);

  const updatedItem = await items.findOneAndUpdate(
    { _id: itemId },
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

async function deleteItem(itemId) {
  checkForValidId(itemId);

  const itemToDelete = await items.findOneAndDelete({ _id: itemId });

  checkIfItemExists(itemToDelete);

  return itemToDelete;
}

async function populateItemsData() {
  const itemsData = [];

  for (let i = 0; i < defaultItemsData.length; i++) {
    let { name, description, price, type } = defaultItemsData[i];
    let item = await createItem(name, description, price, type);
    itemsData.push(item);
  }

  return itemsData;
}

module.exports = {
  getItemById,
  getAllItems,
  getItemsByPrice,
  createItem,
  updateItem,
  deleteItem,
  populateItemsData,
};
