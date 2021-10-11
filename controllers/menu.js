const express = require('express');
const router = express.Router();
const Menu = require('../data/menu-data');

// Index page
router.get('/', (req, res) => {
  Menu.find({}, (error, menu) => {
    res.render('menus/index.ejs', { menu });
  });
});

module.exports = router;
