const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');


const app = express();
require('dotenv').config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(cookieParser());
app.use(session({
  secret: process.env.JWT,
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 60000 } // 10 years in milliseconds
}));




const router = express.Router();


const loginController = require("../controllers/loginController")

router.get("/", loginController.renderLoginPage);
router.post("/", loginController.handleLoginPost);

module.exports = router;