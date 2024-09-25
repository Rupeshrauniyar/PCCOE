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
    cookie: { maxAge: 60000 }
}));

const userModel = require('../models/userModel');

const renderLoginPage = async (req, res) => {
    try {
        res.render('login', { error: req.flash("error") });
    } catch (err) { }
}

const handleLoginPost = async (req, res) => {
    try {
        const { username, password } = req.body;


        if (username.length > 0 && password.length > 0) {
            const existingUser = await userModel.findOne({ username: username });
            if (existingUser) {
                bcrypt.compare(password, existingUser.password, (err, result) => {
                    if (result) {
                        const token = jwt.sign({ username }, process.env.JWT)
                        const oneYear = 1000 * 60 * 60 * 24 * 365;
                        const tenYears = oneYear * 10;
                        res.cookie("token", token, { maxAge: tenYears, httpOnly: true });
                        req.flash("User", existingUser.username);
                        res.redirect('/');
                    } else {
                        req.flash('error', 'Invalid Credentials.');
                        res.redirect('/login');
                    }
                })
            } else {
                req.flash('error', 'Account not found.');
                res.redirect('/login');
            }

        } else {
            req.flash('error', 'Please fill all the fields.');
            res.redirect('/login');
        }


    }
    catch (err) {
        req.flash('error', 'Something went wrong. Please try again.');
        res.redirect('/login');

    }


}

module.exports = {
    renderLoginPage,
    handleLoginPost
};
