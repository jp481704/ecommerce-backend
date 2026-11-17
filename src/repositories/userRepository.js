const db = require("../config/db");

const getAllUsers = (callback) => {
  const query = "select * from users";
  db.query(query, callback);
};


const createUser = (name,email,password,callback)=>{
    const query = "INSERT INTO USERS (name,email,password) VALUES (?,?,?)";
    db.query(query,[name,email,password],callback);
}

module.exports = {
  getAllUsers,
  createUser
};
