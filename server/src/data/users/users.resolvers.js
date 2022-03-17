const usersModel = require('./users.model');

module.exports = {
  Query: {
    getCurrentUser: async (_, __, { currentUserId, isAuthenticated }) =>
      await usersModel.getCurrentUser(currentUserId, isAuthenticated),

    getUser: async (_, args, { currentUserId }) =>
      await usersModel.getSpecificUser(args.id, currentUserId),

    getAllUsers: async (_, __, { currentUserId }) =>
      await usersModel.getAllUsers(currentUserId),
  },

  Mutation: {
    updateCurrentUser: async (_, args, { currentUserId, isAuthenticated }) =>
      await usersModel.updateCurrentUser(
        currentUserId,
        isAuthenticated,
        args.userName,
        args.googleId
      ),

    updateUser: async (_, args, { currentUserId }) =>
      await usersModel.updateSpecificUser(
        currentUserId,
        args.id,
        args.userName,
        args.googleId,
        args.role
      ),

    deleteUser: async (_, args, { currentUserId }) =>
      await usersModel.deleteSpecificUser(currentUserId, args.id),
  },
};
