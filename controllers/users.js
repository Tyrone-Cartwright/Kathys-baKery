const express = require('express');
const router = express.Router();
const { auth, requiresAuth } = require('express-openid-connect');
const User = require('../models/user');

//req.isAuthenticated is provided from the auth router
router.get('/', (req, res) => {
  // res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  res.render('home.ejs', {
    title: "Kathy's baKery",
    isAuthenticated: req.oidc.isAuthenticated(),
  });
});

//TODO INDEX ROUTE
router.get('/', (req, res) => {
  User.find({}, (error, user) => {
    res.render('users/index.ejs', { user });
  });
});

//TODO NEW ROUTE
router.get('/new', (req, res) => {
  res.render('users/new.ejs');
});

//TODO DELETE ROUTE
router.delete('/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id, { new: true }, (error, user) => {
    res.redirect('/');
  });
});

//TODO UPDATE ROUTE
router.put('/:id', (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (error, updateUser) => {
      res.redirect(`/user/${req.params.id}`);
    }
  );
});

router.put('/:id/buy', (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    { $inc: { qty: -1 } },
    (error, updateUser) => {
      if (error) {
        console.log(error);
      } else {
        console.log(updateUser.qty);
        res.redirect(`/user/${req.params.id}`);
      }
    }
  );
});

//TODO CREATE ROUTE
router.post('/', (req, res) => {
  // req.body.name = !!req.body.name;
  // product.push(req.body.name);
  const user = {
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
    address: req.body.address,
    phone: req.body.phone,
    employee_id: Number(req.body.employee_id),
    hrsWorked: Number(req.body.hrsWorked),
    salary: Number(req.body.salary),
  };
  User.create(user, (error, user) => {
    // console.log(newUser);
    res.render('users/show.ejs', { user });
  });
});

//TODO EDIT ROUTE
router.get('/:id/edit', (req, res) => {
  User.findById(req.params.id, (error, user) => {
    res.render('users/edit.ejs', { user });
  });
});

//TODO SHOW ROUTE
// router.get('/:id', (req, res) => {
//   User.findById(req.params.id, (error, user) => {
//     res.render('users/show.ejs', {
//       user,
//       index: req.params.id,
//     });
//   });
// });

// router.get('/login', (req, res) => {
//   res.render('login', { error: '' });
// });

// User's profile protected route
// router.get('/profile', requiresAuth(), (req, res) => {
//   res.send(JSON.stringify(req.oidc.user));
// });

module.exports = router;
