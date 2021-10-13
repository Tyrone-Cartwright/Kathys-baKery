// Require dependencies
const mongoose = require('mongoose');

// Create the menu Schema variable
const Schema = mongoose.Schema;

// Create a menu Schema
const menuSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  img: String,
  price: Number,
  qty: Number,
  preparedBy: String,
});

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;
