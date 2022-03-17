const users = require('./users.mongo');

const {
  checkForValidItemId,
  checkIfItemExists,
} = require('../../utils/errorHandling');

async function getUserById(id) {
  checkForValidItemId(id);

  const user = await users.findById(id);

  checkIfItemExists(user);

  return user;
}

async function getAllUsers() {
  return await users.find({});
}

async function createUser(userName, googleId) {
  return await users.create({
    userName,
    googleId,
  });
}

async function updateUserById(id, userName, googleId, role) {
  checkForValidItemId(id);
  return await users.findOneAndUpdate(
    { _id: id },
    { userName, googleId, role },
    { runValidators: true }
  );
}

async function deleteUserById(id) {
  checkForValidItemId(id);
  return await users.findOneAndDelete({ _id: id });
}

async function getUserByGoogleId(googleId) {
  return await users.findOne({ googleId });
}

async function checkIfCurrentUserIsAdmin(id) {
  const user = await users.findById(id);

  if (!user) {
    throw new Error('Unrecognized user or not logged in.');
  }

  if (user.role !== 'admin')
    throw new Error(
      'Your request is not authorized. Only managers or admins can add or modify this field'
    );
}

module.exports = {
  getUserById,
  getAllUsers,
  createUser,
  updateUserById,
  deleteUserById,

  getUserByGoogleId,
  checkIfCurrentUserIsAdmin,
};
