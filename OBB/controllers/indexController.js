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
  cookie: { maxAge: 10 * 365 * 24 * 60 * 60 * 100000 }
}));

const userModel = require('../models/userModel');
const postModel = require('../models/postModel');

const index = async (req, res) => {
  try{
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT);
    const user = await userModel.findOne({ username: decoded.username }).select('-password').populate("following")
    const posts = await postModel.find().populate('userId').select("-password");
    res.render('index', { loggedInUser: req.flash("User"), success: req.flash("success"), user: user, posts: posts });
  }catch(err){
    
  }
 
}
module.exports = index;