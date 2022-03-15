const usersModel = require('./users.model');

module.exports = {
  Query: {
    users: () => usersModel.getAllUsers(),

    user: (_, args) => usersModel.getUserById(args.id),
  },

  Mutation: {
    updateUser: (_, args) =>
      usersModel.updateUser(args.id, args.userName, args.googleId, args.role),
    deleteUser: (_, args) => usersModel.deleteUser(args.id),
  },
};
