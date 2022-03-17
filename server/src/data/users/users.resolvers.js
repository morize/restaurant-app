const usersModel = require('./users.model');
const { checkIfLoggedIn } = require('../../utils/errorHandling');
const { throwErrorByUserRole } = require('../users/users.model');

module.exports = {
  Query: {
    users: (_, args, context) => {
      checkIfLoggedIn(context.isAuthenticated);
      return usersModel.getAllUsers();
    },

    user: (_, args) => {
      checkIfLoggedIn(context.isAuthenticated);
      return usersModel.getUserById(args.id);
    },
  },

  Mutation: {
    updateUser: (_, args, context) => {
      throwErrorByUserRole(context.id);
      usersModel.updateUser(args.id, args.userName, args.googleId, args.role);
    },

    deleteUser: (_, args, context) => {
      throwErrorByUserRole(context.id);
      usersModel.deleteUser(args.id);
    },
  },
};
