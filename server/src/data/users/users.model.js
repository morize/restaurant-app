const users = require('./users.mongo');

const {
  checkForValidItemId,
  checkIfItemExists,
} = require('../../utils/errorHandling');

async function getAllUsers() {
  return await users.find({}, { versionKey: false });
}

async function getUserById(id) {
  checkForValidItemId(id);

  const user = await users.findById(id);

  checkIfItemExists(user);

  return user;
}

async function addNewUser(userName, googleId) {
  try {
    const newUser = await users.create({
      userName,
      googleId,
    });

    return newUser.toObject({ versionKey: false });
  } catch (err) {
    throw new Error(err);
  }
}

async function updateUser(id, userName, googleId, role) {
  checkForValidItemId(id);

  const updatedItem = await orders.findOneAndUpdate(
    { _id: id },
    { userName, googleId, role },
    { runValidators: true }
  );

  //checkIfItemExists(updatedItem);

  return updatedItem;
}

async function deleteUser(id) {
  checkForValidItemId(id);

  const userToDelete = await users.findOneAndDelete({ _id: id });

  return userToDelete;
}

async function getUserByGoogleId(googleId) {
  return await users.findOne({ googleId }, { __v: false });
}

async function throwErrorByUserRole(id) {
  const user = await users.findById(id);

  if (!user) {
    throw new Error('You are not logged in.');
  }

  if (user.role === 'guest')
    throw new Error(
      'Your request is not authorized. Only managers or admins can add or modify this field'
    );
}

module.exports = {
  getAllUsers,
  getUserById,
  addNewUser,
  updateUser,
  deleteUser,
  getUserByGoogleId,
  throwErrorByUserRole,
};
