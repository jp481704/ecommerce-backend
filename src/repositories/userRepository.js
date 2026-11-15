const db = require("../config/db");

const getAllUsers = (callback) => {
  const query = "select * from users";
  db.query(query, callback);
};


const createUser = (name,email,callback)=>{
    const query = "INSERT INTO USERS (name,email) VALUES (?,?)";
    db.query(query,[name,email],callback);
}

module.exports = {
  getAllUsers,
  createUser
};
