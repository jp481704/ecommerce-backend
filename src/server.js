const express = require("express");
const db = require("./config/db");

const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("E-commerce Backend API is running");
});

app.use(userRoutes);

app.post("/users", (req, res) => {
  const { name, email } = req.body;
  const query = `INSERT INTO users (name,email) VALUES (?,?)`;

  db.query(query, [name, email], (err, result) => {
    if (err) {
      console.log("Error inserting user:", err);
      return res.status(500).json({ error: "Error inserting user" });
    }
    res
      .status(201)
      .json({ message: "User created successfully", userId: result.insertId });
  });
});

app.put("/users/:id", (req, res) => {
  const userId = req.params.id;
  const { name, email } = req.body;
  const query = `UPDATE users SET name=?, email=? WHERE id=?`;

  db.query(query, [name, email, userId], (err, result) => {
    if (err) {
      console.log("Error updating user:", err);
      return res.status(500).json({ error: "Error updating user" });
    }
    res.json({ message: "User updated successfully" });
  });
});

app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  const query = `Delete from users where id=?`;

  db.query(query, [userId], (err, result) => {
    if (err) {
      console.log("Error deleting user:", err);
      return res.status(500).json({ error: "Error deleting user" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  });
});

app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  const query = `SELECT * FROM users WHERE id=?`;

  db.query(query, [userId], (err, result) => {
    if (err) {
      console.log("Error fetching user:", err);
      return res.status(500).json({ error: "Error fetching user" });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ user: result[0] });
  });
});

app.listen(3333, () => {
  console.log("Server is running on port 3333");
});
