const itemsModel = require('./items.model');

module.exports = {
  Query: {
    items: () => itemsModel.getAllItems(),

    item: (_, args) => itemsModel.getItemById(args.id),

    itemsByPrice: (_, args) => itemsModel.getItemsByPrice(args.min, args.max),
  },

  Mutation: {
    addNewItem: (_, args) => itemsModel.addNewItem(args.id, args.description, args.price, args.type),
  }
};
