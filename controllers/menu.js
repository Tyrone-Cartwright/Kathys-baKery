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

router.get('/new', (req, res) => {
  res.render('new.ejs');
});

// router.get('/seed', (req, res) => {
//   Menu.deleteMany({}, (err, menu) => {});

//   Menu.create(menuSeed, (err, menu) => {
//     res.redirect('/menu');
//   });
// });

router.delete('/:id', (req, res) => {
  Menu.findByIdAndRemove(req.params.id, (err, menu) => {
    res.redirect('/');
  });
});

router.put('/:id', (req, res) => {
  Menu.findByIdAndUpdate(req.params.id, req.body, (err, menu) => {
    res.render('/');
  });
});

// Create page
router.post('/', (req, res) => {
  Menu.create(req.body, (error, menu) => {
    res.render('index.ejs', { menu });
  });
});

router.get('/:id/edit', (req, res) => {
  Menu.findById(req.params.id, (err, menu) => {
    res.render('edit.ejs', { menu });
  });
});

// Show page
router.get('/:id', (req, res) => {
  Menu.findById(req.params.id, (error, menu) => {
    res.render('menus/show.ejs', { menu });
  });
});

module.exports = router;
