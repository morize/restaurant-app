const itemsModel = require('./items.model');

module.exports = {
  Query: {
    items: async () => itemsModel.getAllItems(),

    item: async (_, args) => itemsModel.getItemById(args.id),

    itemsByPrice: async (_, args) =>
      itemsModel.getItemsByPrice(args.min, args.max),
  },

  Mutation: {
    addNewItem: async (_, args) =>
      itemsModel.addNewItem(args.name, args.description, args.price, args.type),

    updateItem: async (_, args) =>
      itemsModel.updateItem(
        args.id,
        args.name,
        args.description,
        args.price,
        args.type
      ),

    deleteItem: async (_, args) => itemsModel.deleteItem(args.id),
  },
};
