const express = require("express");
const userController = require("../controllers/userControllers");
const router = express.Router();


router.get("/users", userController.getUser);
router.post("/users", userController.createUser);


module.exports = router;