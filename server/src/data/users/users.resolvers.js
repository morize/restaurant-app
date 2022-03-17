const {
  getUserById,
  getAllUsers,
  updateUserById,
  deleteUserById,
  checkIfCurrentUserIsAdmin,
} = require('./users.model');
const { checkIfAuthenticated } = require('../../utils/errorHandling');

module.exports = {
  Query: {
    getCurrentUser: async (_, __, { currentUserId, isAuthenticated }) => {
      checkIfAuthenticated(isAuthenticated);
      return await getUserById(currentUserId);
    },

    getUser: async (_, args, { currentUserId }) => {
      await checkIfCurrentUserIsAdmin(currentUserId);
      return await getUserById(args.id);
    },

    getAllUsers: async (_, __, { currentUserId }) => {
      await checkIfCurrentUserIsAdmin(currentUserId);
      return await getAllUsers();
    },
  },

  Mutation: {
    updateCurrentUser: async (_, args, { currentUserId, isAuthenticated }) => {
      checkIfAuthenticated(isAuthenticated);
      return await updateUserById(
        currentUserId,
        args.userName,
        args.googleId
      );
    },

    updateUser: async (_, args, { currentUserId }) => {
      await checkIfCurrentUserIsAdmin(currentUserId);
      return await updateUserById(
        args.id,
        args.userName,
        args.googleId,
        args.role
      );
    },

    deleteUser: async (_, args, { currentUserId }) => {
      await checkIfCurrentUserIsAdmin(currentUserId);
      return await deleteUserById(args.id);
    },
  },
};
