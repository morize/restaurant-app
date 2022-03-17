const itemsModel = require('./items.model');
const { throwErrorByUserRole } = require('../users/users.model');

module.exports = {
  Query: {
    items: async () => itemsModel.getAllItems(),

    item: async (_, args) => itemsModel.getItemById(args.id),

    itemsByPrice: async (_, args) =>
      itemsModel.getItemsByPrice(args.min, args.max),
  },

  Mutation: {
    addNewItem: async (_, args, context) => {
      await throwErrorByUserRole(context.id);

      return itemsModel.addNewItem(
        args.name,
        args.description,
        args.price,
        args.type
      );
    },

    updateItem: async (_, args, context) => {
      await throwErrorByUserRole(context.id);

      return itemsModel.updateItem(
        args.id,
        args.name,
        args.description,
        args.price,
        args.type
      );
    },

    deleteItem: async (_, args) => {
      await throwErrorByUserRole(context.id);

      return itemsModel.deleteItem(args.id);
    },
  },
};
