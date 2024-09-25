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
        const { postId, userId } = req.body;

        const Post = await postModel.findOne({ _id: postId })
        let updatePost = ""
        if (Post) {
            if (Post.likes.includes(userId)) {
                updatePost = await postModel.findOneAndUpdate({ _id: postId }, { $pull: { likes: userId } }, { new: true })
            } else {
                updatePost = await postModel.findOneAndUpdate({ _id: postId }, { $push: { likes: userId } }, { new: true })
            }
            if (updatePost) {
                res.json(updatePost);
            }
        }

    } catch (err) { }

}

module.exports = handleLike

