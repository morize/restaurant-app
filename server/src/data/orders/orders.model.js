const orders = require('./orders.mongo');
const { getItemById } = require('../items/items.model');

const {
  checkForValidId,
  checkIfItemExists,
} = require('../../utils/errorHandling');

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

async function getOrderById(orderId) {
  checkForValidId(orderId);

  const order = await orders.findById(orderId);

  checkIfItemExists(order);

  return order;
}

async function getOrdersFromUserId(userId) {
  checkForValidId(userId);

  const ordersFromUser = await orders.find({ clientId: userId });

  checkIfItemExists(ordersFromUser);

  return ordersFromUser;
}

async function getAllOrders() {
  return await orders.find({});
}

async function createOrder(currentUserId, orderItems, extraInfo) {
  checkForValidId(currentUserId);

  const itemsInOrder = await getItemsFromOrder(orderItems);

  const totalPrice = getTotalPriceFromItems(
    itemsInOrder.map((item) => item.item.price),
    orderItems
  );

  return await orders.create({
    clientId: currentUserId,
    orderItems: itemsInOrder,
    extraInfo,
    totalPrice: totalPrice,
  });
}

async function updateOrder(orderId, status) {
  checkForValidId(orderId);
  
  const updatedItem = await orders.findOneAndUpdate(
    { _id: orderId },
    { status: status },
    { runValidators: true }
  );

  checkIfItemExists(updatedItem);

  return updatedItem;
}

async function deleteOrder(id) {
  checkForValidId(id);

  const orderToDelete = await orders.findOneAndDelete({ _id: id });

  checkIfItemExists(orderToDelete);

  return orderToDelete;
}

module.exports = {
  getOrderById,
  getOrdersFromUserId,
  getAllOrders,
  createOrder,
  updateOrder,
  deleteOrder,
};
