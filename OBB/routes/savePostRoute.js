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



const router = express.Router();
const savePostController = require('../controllers/savePostController');
const isLoggedIn = require('../middlewares/isLoggedIn');

router.post('/', isLoggedIn, savePostController)

module.exports = router;