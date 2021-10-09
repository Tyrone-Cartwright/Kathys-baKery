// Require dependencies
const mongoose = require('mongoose');

// Create the user schema variable
const Schema = mongoose.Schema;

// Create a user Schema
const userSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: String,
  address: { type: String, required: true },
  phone: { type: Number, required: true },
  employee_id: { type: Number },
  hrsWorked: Number,
  salary: Number,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
