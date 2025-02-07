
const User = require('./User');

const ADMIN_PASS = 'supersecret';

async function getUser(username, password) {
  try {
    const user = await User.findOne({ username, password });
    return user;
  } catch (err) {
    throw err;
  }
}

async function setUserPassword(username, email, oldPassword, newPassword) {
  try {
    const user = await User.findOne({ username, email, password: oldPassword });
    if (!user) {
      return false;
    }
    user.password = newPassword;
    await user.save();
    return true;
  } catch (err) {
    throw err;
  }
}

async function addUser(username, password, email) {
  try {
    const existing = await User.findOne({ username });
    if (existing) {
      return false;
    }
    const newUser = new User({ username, password, email });
    await newUser.save();
    return true;
  } catch (err) {
    throw err;
  }
}

async function removeUser(username, adminPass) {
  if (adminPass !== ADMIN_PASS) {
    return false;
  }
  try {
    const result = await User.deleteOne({ username });
    return result.deletedCount > 0;
  } catch (err) {
    throw err;
  }
}

async function getAllUsers(adminPass) {
  if (adminPass !== ADMIN_PASS) {
    return [];
  }
  try {
    const users = await User.find({});
    return users;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getUser,
  setUserPassword,
  addUser,
  removeUser,
  getAllUsers,
};
