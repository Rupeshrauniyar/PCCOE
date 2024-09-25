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

const savePost = async (req, res) => {
    try{
        const { postId, userId } = req.body;
        var user = await userModel.findOne({ _id: userId })
        if (user.saved.includes(postId)) {
            const post = await postModel.findOneAndUpdate({ _id: postId },
                { $pull: { saved: userId } },
                { new: true }
            )
    
            var updateUser = await userModel.findOneAndUpdate({ _id: userId },
                { $pull: { saved: postId } },
                { new: true }
            )
    
        } else {
            const post = await postModel.findOneAndUpdate({ _id: postId },
                { $push: { saved: userId } },
                { new: true }
            )
    
            var updateUser = await userModel.findOneAndUpdate({ _id: userId },
                { $push: { saved: postId } },
                { new: true }
            )
    
        }
    }catch(err){}
   

    res.send(updateUser)
}


module.exports = savePost