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
    cookie: { maxAge: 60000 } 
}));


const isLoggedIn = require('../middlewares/isLoggedIn');

const router = express.Router();

const sharedPostController = require("../controllers/sharedPostController")

router.get("/:postId", isLoggedIn, sharedPostController);


module.exports = router;