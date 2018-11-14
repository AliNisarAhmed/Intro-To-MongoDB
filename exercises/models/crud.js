const User = require('./user')

const getUserById = (id) => {
  return User.findById(id).exec();
}

const getAllUsers = () => {
  return User.find({}).exec();
}

const createUser = (userDetails) => {
  const user = User.create(userDetails);
  return user;
}
const removeUserById = (id) => {
  return User.findByIdAndRemove(id).exec();
}

const updateUserById = (id, update) => {
  return User.findByIdAndUpdate(id, update, {new: true}).exec();
}

module.exports = {
  getUserById,
  getAllUsers,
  createUser,
  removeUserById,
  updateUserById
}
