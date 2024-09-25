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

const commentHandler = async (req, res) => {
    try {
        const { commentValue, postId, userId } = req.body
        const updatePost = await postModel.findOneAndUpdate({ _id: postId },
            {
                $push:
                {
                    comments:
                    {
                        comment: commentValue,
                        userId: userId
                    }
                },


            },
            { new: true })
        if (updatePost) {
            req.flash("success", "Comment added successfully.")
            res.send({ updatePost, success: req.flash("success") })

        }
    } catch (err) {
        console.log("something went wrong.")
    }

}

const fetchCommentController = async (req, res) => {
    try {

        const { postId } = req.body;
        const post = await postModel.findOne({ _id: postId }).populate({
            path: 'comments.userId',
            select: "_id followers following username profilePicture"
        });



        if (post) {
            res.send(post)
        }
    } catch (err) {

    }

}

module.exports = { commentHandler, fetchCommentController }