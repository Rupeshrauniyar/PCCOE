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

const userModel = require('../models/userModel');
const postModel = require("../models/postModel")

const profileRender = async (req, res) => {
    
    const userId = req.params.userId
    var foundUser = await userModel.findOne({ _id: userId }).select("-password").populate("posts")
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT);
    const user = await userModel.findOne({ username: decoded.username }).select('-password');
    res.render("profile", { user: foundUser, loggedIn: user })
}


module.exports = profileRender