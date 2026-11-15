const userRepository = require("../repositories/userRepository.js");

const getAllUsers = (callback) => {
  userRepository.getAllUsers(callback);
};

const createUser = (name,email,callback)=>{
    userRepository.createUser(name,email,callback);
}

module.exports = {
  getAllUsers,
  createUser
};
