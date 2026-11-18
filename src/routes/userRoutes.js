const express = require("express");
const userController = require("../controllers/userControllers.js");

const router = express.Router();

router.get("/users", userController.getUser);

router.post("/users", userController.createUser);

router.post("/login", userController.loginUser);

module.exports = router;