const ordersModel = require('./orders.model');
const { checkIfLoggedIn } = require('../../utils/errorHandling');

module.exports = {
  Query: {
    orders: (_, args, context) => {
      checkIfLoggedIn(context.isAuthenticated);
      return ordersModel.getAllOrders();
    },

    order: (_, args, context) => {
      checkIfLoggedIn(context.isAuthenticated);
      return ordersModel.getOrderById(args.id);
    },
  },

  Mutation: {
    addNewOrder: (_, args, context) => {
      checkIfLoggedIn(context.isAuthenticated);
      return ordersModel.addNewOrder(
        args.clientId,
        args.extraInfo,
        args.orderItems
      );
    },

    updateStatus: (_, args, context) => {
      checkIfLoggedIn(context.isAuthenticated);
      return ordersModel.updateStatus(args.id, args.status);
    },

    deleteOrder: (_, args, context) => {
      checkIfLoggedIn(context.isAuthenticated);
      return ordersModel.deleteOrder(args.id);
    },
  },
};
