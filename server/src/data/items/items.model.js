const items = [
  {
    id: 'chicken-sandwich',
    description: 'Chicken Sandwich',
    price: 3.4,
    type: 'breakfast',
  },
  {
    id: 'tuna-sandwich',
    description: 'Tuna Sandwich',
    price: 3.0,
    type: 'breakfast',
  },
  {
    id: 'hot-coffee',
    description: 'Hot Coffee',
    price: 1.5,
    type: 'drinks',
  },
];

function getAllItems() {
  return items;
}

function getItemById(id) {
  return items.find((item) => item.id == id);
}

function getItemsByPrice(min, max) {
  return items.filter((item) => item.price >= min && item.price <= max);
}

function addNewItem(id, description, price, type) {
  const newItem = {
    id,
    description,
    price,
    type,
  };
  items.push(newItem);
  return newItem;
}

module.exports = {
  getAllItems,
  getItemById,
  getItemsByPrice,
  addNewItem,
};
