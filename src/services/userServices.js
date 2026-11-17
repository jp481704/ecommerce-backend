const userRepository = require("../repositories/userRepository.js");

const getAllUsers = (callback) => {
  userRepository.getAllUsers(callback);
};

const createUser = (name, email, password, callback) => {
  if (!name || !email || !password) {
    return callback("Name, email, and password are required", null);
  }

  name = name.trim();
  email = email.trim();
  password = password.trim();

  if (!name || !email || !password) {
    return callback("Name, email, and password cannot be empty", null);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return callback("Invalid email format", null);
  }

  userRepository.createUser(name, email, password, callback);
};

module.exports = {
  getAllUsers,
  createUser,
};
