const userService = require("../services/userServices.js");

const getUser = (req, res) => {
  userService.getAllUsers((err, result) => {
    if (err) {
      console.log("Error fetching users:", err);

      return res.status(500).json({
        error: "Error fetching users",
      });
    }

    res.json({
      users: result,
    });
  });
};

const createUser = (req, res) => {
  const { name, email, password } = req.body;

  userService.createUser(name, email, password, (err, result) => {
    if (err && err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        error: "Email already exists",
      });
    }

    if (err) {
      console.log("Error creating user:", err);

      return res.status(500).json({
        error: err,
      });
    }

    res.status(201).json({
      message: "User created successfully",
      userId: result.insertId,
    });
  });
};

const loginUser = (req, res) => {
  const { email, password } = req.body;

  userService.loginUser(email, password, (err, result) => {
    if (err) {
      return res.status(401).json({
        error: err,
      });
    }

    res.status(200).json({
      message: "Login successful",
      user: result.user,
      token: result.token,
    });
  });
};

module.exports = {
  getUser,
  createUser,
  loginUser,
};
