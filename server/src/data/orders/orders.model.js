const orders = require('./orders.mongo');
const { getItemById } = require('../items/items.model');

const {
  checkForValidItemId,
  checkIfItemExists,
} = require('../../utils/errorHandling');

async function getAllOrders() {
  return await orders.find({});
}

async function getOrderById(id) {
  checkForValidItemId(id);

  const order = await orders.findById(id);

  checkIfItemExists(order);

  return order;
}

async function addNewOrder(clientId, extraInfo, orderItems) {
  // checkForValidItemId(clientId); when you make user graph

  try {
    const itemsInOrder = await getItemsFromOrder(orderItems);

    const totalPrice = getTotalPriceFromItems(
      itemsInOrder.map((item) => item.item.price),
      orderItems
    );

    return await orders.create({
      clientId,
      clientName: 'TestUser',
      extraInfo,
      totalPrice: totalPrice,
      orderItems: itemsInOrder,
    });
  } catch (err) {
    throw new Error(err);
  }
}

async function updateStatus(id, status) {
  checkForValidItemId(id);

  const updatedItem = await orders.findOneAndUpdate(
    { _id: id },
    { status },
    { runValidators: true }
  );

  checkIfItemExists(updatedItem);

  return updatedItem;
}

async function deleteOrder(id) {
  checkForValidItemId(id);

  const orderToDelete = await orders.findOneAndDelete({ _id: id });

  checkIfItemExists(orderToDelete);

  return orderToDelete;
}

async function getItemsFromOrder(orderItems) {
  const itemsInOrder = [];

  for (let i = 0; i < orderItems.length; i++) {
    let orderItem = await getItemById(orderItems[i].itemId);
    orderItem &&
      itemsInOrder.push({ item: orderItem, quantity: orderItems[i].quantity });
  }

  return itemsInOrder;
}

function getTotalPriceFromItems(itemPrices, orderItems) {
  var totalPrice = 0;

  for (let i = 0; i < itemPrices.length; i++) {
    totalPrice += itemPrices[i] * orderItems[i].quantity;
  }

  return Number(totalPrice.toFixed(2));
}

module.exports = {
  getAllOrders,
  getOrderById,
  addNewOrder,
  updateStatus,
  deleteOrder,
};
