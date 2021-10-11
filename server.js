// Require Dependencies
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const expressSession = require('express-session');
const { auth } = require('express-openid-connect');
// const usersControllers = require('./controllers/users');
const menuControllers = require('./controllers/menu');

// Initialize app
const app = express();

// Server settings
require('dotenv').config();
const DATABASE_URL = process.env.DATABASE_URL;

// Database connection
mongoose.connect(DATABASE_URL);

// DB Connection Error & Success
// Define cb fn'c for various events
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo is connected'));
db.on('disconnected', () => console.log('mongo is disconnected'));

// Auth config
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER,
};

// Mount Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(
  expressSession({
    secret: 'baKeryKat',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.static('public'));
// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// Mount Routes
// app.use('/', usersControllers);
app.use('/menu', menuControllers);

// App Listener
const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(`The bakery is listening to port ${PORT} while it bakes.`)
);
