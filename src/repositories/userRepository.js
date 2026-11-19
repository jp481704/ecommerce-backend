const db = require("../config/db");

const getAllUsers = (callback) => {
  const query = "SELECT * FROM users";
  db.query(query, callback);
};

const createUser = (name, email, password, callback) => {
  const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

  db.query(query, [name, email, password], callback);
};

const loginUser = (email, callback) => {
  const query = "SELECT * FROM users WHERE email = ?";

  db.query(query, [email], callback);
};

module.exports = {
  getAllUsers,
  createUser,
  loginUser,
};
