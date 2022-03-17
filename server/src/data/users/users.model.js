const users = require('./users.mongo');

const {
  checkForValidItemId,
  checkIfItemExists,
  checkIfAuthenticated,
} = require('../../utils/errorHandling');

async function getUserById(id) {
  checkForValidItemId(id);

  const user = await users.findById(id);

  checkIfItemExists(user);

  return user;
}

async function updateUserById(id, userName, googleId, role) {
  checkForValidItemId(id);

  return await users.findOneAndUpdate(
    { _id: id },
    { userName, googleId, role },
    { runValidators: true }
  );
}

async function checkIfUserIsAdmin(id) {
  const user = await users.findById(id);

  if (!user) {
    throw new Error('Unrecognized user or not logged in.');
  }

  if (user.role !== 'admin')
    throw new Error(
      'Your request is not authorized. Only managers or admins can add or modify this field'
    );
}

async function getUserByGoogleId(googleId) {
  return await users.findOne({ googleId });
}

async function addNewUser(userName, googleId) {
  const newUser = await users.create({
    userName,
    googleId,
  });

  return newUser.toObject({ versionKey: false });
}

async function getCurrentUser(id, isAuthenticated) {
  checkIfAuthenticated(isAuthenticated);
  return await getUserById(id);
}

async function getSpecificUser(id, currentUserId) {
  await checkIfUserIsAdmin(currentUserId);
  return await getUserById(id);
}

async function getAllUsers(currentUserId) {
  await checkIfUserIsAdmin(currentUserId);
  return await users.find({}, { versionKey: false });
}

async function updateCurrentUser(
  currentUserId,
  isAuthenticated,
  userName,
  googleId
) {
  checkIfAuthenticated(isAuthenticated);
  return await updateUserById(currentUserId, userName, googleId);
}

async function updateSpecificUser(currentUserId, id, userName, googleId, role) {
  await checkIfUserIsAdmin(currentUserId);
  return await updateUserById(id, userName, googleId, role);
}

async function deleteSpecificUser(currentUserId, id) {
  checkForValidItemId(id);

  await checkIfUserIsAdmin(currentUserId);

  return await users.findOneAndDelete({ _id: id });
}

module.exports = {
  addNewUser,
  getUserByGoogleId,

  getCurrentUser,
  getSpecificUser,
  getAllUsers,
  updateCurrentUser,
  updateSpecificUser,
  deleteSpecificUser,
};
