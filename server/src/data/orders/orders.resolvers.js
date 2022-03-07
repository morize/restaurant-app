const ordersModel = require('./orders.model');

module.exports = {
  Query: {
    orders: () => ordersModel.getAllOrders(),

    order: (_, args) => ordersModel.getOrderById(args.id),
  },

  Mutation: {
    addNewOrder: (_, args) =>
      ordersModel.addNewOrder(args.clientId, args.extraInfo, args.orderItems),

    updateStatus: (_, args) => ordersModel.updateStatus(args.id, args.status),
    deleteOrder: (_, args) => ordersModel.deleteOrder(args.id),
  },
};
