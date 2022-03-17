const {
  getOrderById,
  getOrdersFromUserId,
  getAllOrders,
  createOrder,
  updateOrder,
  deleteOrder,
} = require('./orders.model');
const { checkIfCurrentUserIsAdmin } = require('../users/users.model');
const { checkIfAuthenticated } = require('../../utils/errorHandling');

module.exports = {
  Query: {
    getOrder: async (_, args, { currentUserId }) => {
      await checkIfCurrentUserIsAdmin(currentUserId);
      return await getOrderById(args.orderId);
    },

    getMyOrders: async (_, __, { currentUserId, isAuthenticated }) => {
      checkIfAuthenticated(isAuthenticated);
      return await getOrdersFromUserId(currentUserId);
    },

    getAllOrders: async (_, __, { currentUserId }) => {
      await checkIfCurrentUserIsAdmin(currentUserId);
      return await getAllOrders();
    },
  },

  Mutation: {
    createOrder: async (_, args, { currentUserId, isAuthenticated }) => {
      checkIfAuthenticated(isAuthenticated);
      return await createOrder(currentUserId, args.orderItems, args.extraInfo);
    },

    // Update own Order if it's not older than 20 minutes?
    // Create Order for User as admin

    updateOrder: async (_, args, { currentUserId }) => {;
      await checkIfCurrentUserIsAdmin(currentUserId);
      return await updateOrder(args.orderId, args.status);
    },

    deleteOrder: async (_, args, { currentUserId }) => {
      await checkIfCurrentUserIsAdmin(currentUserId);
      return await deleteOrder(args.orderId);
    },
  },
};
