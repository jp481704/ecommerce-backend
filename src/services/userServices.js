const userRepository = require("../repositories/userRepository.js");
const bcrypt = require("bcrypt");

const getAllUsers = (callback) => {
  userRepository.getAllUsers(callback);
};

const loginUser = (email, password, callback) => {
  if (!email || !password) {
    return callback("Email and password are required", null);
  }

  userRepository.loginUser(email, (err, result) => {
    if (err) {
      return callback("Error fetching user", null);
    }

    if (result.length === 0) {
      return callback("User not found", null);
    }

    bcrypt.compare(password, result[0].password, (err, isMatch) => {
      if (err) {
        return callback("Error comparing passwords", null);
      }

      if (!isMatch) {
        return callback("Incorrect password", null);
      }

      callback(null, result[0]);
    });
  });
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

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return callback("Error hashing password", null);
    }

    userRepository.createUser(name, email, hashedPassword, callback);
  });
};

module.exports = {
  getAllUsers,
  createUser,
  loginUser,
};
