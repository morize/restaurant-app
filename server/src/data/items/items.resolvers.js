const {
  getItemById,
  getAllItems,
  getItemsByPrice,
  createItem,
  updateItem,
  deleteItem,
} = require('./items.model');
const { checkIfCurrentUserIsAdmin } = require('../users/users.model');

module.exports = {
  Query: {
    getItem: async (_, args) => await getItemById(args.id),

    getAllItems: async () => await getAllItems(),

    getItemsByPrice: async (_, args) =>
      await getItemsByPrice(args.min, args.max),
  },

  Mutation: {
    createItem: async (_, args, { currentUserId }) => {
      await checkIfCurrentUserIsAdmin(currentUserId);
      return await createItem(
        args.name,
        args.description,
        args.price,
        args.type
      );
    },

    updateItem: async (_, args, { currentUserId }) => {
      await checkIfCurrentUserIsAdmin(currentUserId);
      return await updateItem(
        args.id,
        args.name,
        args.description,
        args.price,
        args.type
      );
    },

    deleteItem: async (_, args) => {
      await checkIfCurrentUserIsAdmin(currentUserId);
      return deleteItem(args.id);
    },
  },
};
