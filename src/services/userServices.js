const userRepository = require("../repositories/userRepository.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return callback("Error hashing password", null);
    }

    userRepository.createUser(name, email, hashedPassword, callback);
  });
};

const loginUser = (email, password, callback) => {
  if (!email || !password) {
    return callback("Email and password are required", null);
  }

  email = email.trim();
  password = password.trim();

  if (!email || !password) {
    return callback("Email and password cannot be empty", null);
  }

  userRepository.loginUser(email, (err, result) => {
    if (err) {
      return callback("Error fetching user", null);
    }

    if (result.length === 0) {
      return callback("Invalid email or password", null);
    }

    const user = result[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return callback("Error comparing passwords", null);
      }

      if (!isMatch) {
        return callback("Invalid email or password", null);
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
      );

      callback(null, { user, token });
    });
  });
};

module.exports = {
  getAllUsers,
  createUser,
  loginUser,
};
