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
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: Date.now() * 24 * 60 * 60 * 10000 }
}));
const userModel = require('../models/userModel');

const isLoggedIn = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (token) {
            const decoded = jwt.verify(token, process.env.JWT);

            if (decoded) {
                const user = await userModel.findOne({ username: decoded.username });
                if (user) {
                    req.user = decoded;
                    next();
                } else {
                    res.redirect('/login');
                }

            } else {
                res.redirect('/login');
            }
        }
        else {
            res.redirect('/login');
        }
    } catch (err) {
        res.redirect("/login")
    }

}

module.exports = isLoggedIn;