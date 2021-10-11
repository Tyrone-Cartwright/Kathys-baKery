const express = require('express');
const router = express.Router();
const Menu = require('../models/menu');
const menuSeed = require('../data/menuSeed');

router.get('/seed', (req, res) => {
  Menu.deleteMany({}, (err, menu) => {});

  Menu.create(menuSeed, (err, menu) => {
    res.redirect('/menu');
  });
});

// Index page
router.get('/', (req, res) => {
  Menu.find({}, (err, menu) => {
    res.render('menus/index.ejs', { menu });
  });
});

// router.get('/seed', (req, res) => {
//   Menu.deleteMany({}, (err, menu) => {});

//   Menu.create(menuSeed, (err, menu) => {
//     res.redirect('/menu');
//   });
// });

// Create page
router.post('/', (req, res) => {
  Menu.create(req.body, (error, menu) => {
    res.render('index.ejs', { menu });
  });
});

module.exports = router;
