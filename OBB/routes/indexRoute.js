const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const session = require('express-session');
require('dotenv').config();
app.use(express.json());
app.use(cookieParser());
app.use(flash());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(session({
    secret: process.env.JWT,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 } // 10 years in milliseconds
  }));
  



const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn")

const indexController = require("../controllers/indexController")

router.get("/", isLoggedIn, indexController)


module.exports = router;