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
const postModel = require('../models/postModel');


const handleLike = async (req, res) => {
    try {
        const Data = req.body
        if (Data) {
            const post = await postModel.findOne({ _id: Data.postId }).populate("userId")
            if (post) {
                if (post.userId._id.toString() === Data.userId) {
                    var deletedPost = await postModel.findOneAndDelete({ _id: Data.postId })

                }
                if(deletedPost){
                    res.json(deletedPost)
                }
            }

        }
    } catch (err) { }

}

module.exports = handleLike

