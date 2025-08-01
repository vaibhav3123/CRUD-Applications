const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/users');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/CRUD');

// Get all users
app.get("/", (req, res) => {
  UserModel.find()
    .then(users => res.json(users))
    .catch(err => res.json(err));
});

// Get user by ID
app.get('/getuser/:id', (req, res) => {
  const id = req.params.id;
  UserModel.findById(id)
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

// Create new user
app.post("/createUser", (req, res) => {
  UserModel.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

// Update user
app.put("/updateUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndUpdate(id, req.body, { new: true })
    .then(updatedUser => res.json(updatedUser))
    .catch(err => res.json(err));
});

app.delete("/deleteUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndDelete(id)
    .then(() => res.json({ message: 'User deleted successfully' }))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
