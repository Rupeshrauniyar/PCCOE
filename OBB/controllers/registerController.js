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

const renderRegisterPage = async (req, res) => {
    res.render("register", { error: req.flash("error") })
}
const handleRegisterPost = async (req, res) => {
    try {
        const { username, password, phone_email } = req.body;
        if (username.length > 3 && password.length > 3 && phone_email.length > 3) {
            const existingUserName = await userModel.findOne({ username: username });
            const existingPhoneEmail = await userModel.findOne({ phone_email: phone_email });
            if (existingUserName) {
                req.flash('error', 'Username already exists');
                res.redirect('/register');
            } else if (existingPhoneEmail) {
                req.flash('error', 'Phone number or email already exists');
                res.redirect('/register');
            } else {
                bcrypt.genSalt(10, async (err, salt) => {
                    bcrypt.hash(password, salt, async (err, hashedPassword) => {
                        if (hashedPassword) {
                            const user = await userModel.create({
                                username,
                                password: hashedPassword,
                                phone_email
                            });
                            const token = jwt.sign({ username }, process.env.JWT);
                            if (token) {
                                const oneYear = 1000 * 60 * 60 * 24 * 365;
                                const tenYears = oneYear * 10;
                                res.cookie("token", token, { maxAge: tenYears, httpOnly: true });
                                req.flash("User", user.username);
                                res.redirect('/');
                            } else {
                                req.flash('error', 'Something went wrong. Please try again.');
                                res.redirect('/register');
                            }

                        } else {
                            req.flash('error', 'Something went wrong.Please try again.');
                            res.redirect('/register');
                        }

                    });
                })
            }
        } else {
            req.flash('error', 'Please fill all the fields.');
            res.redirect('/register');
        }


    }
    catch (err) {

        req.flash('error', 'Something went wrong. Please try again.');
        res.redirect('/register');

    }


}

module.exports = {
    renderRegisterPage,
    handleRegisterPost
};
