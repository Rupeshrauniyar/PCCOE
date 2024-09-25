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

const sharedPostRender = async (req, res) => {
    try{
        const postId = req.params.postId
        const searchedPost = await postModel.find({ _id: postId }).populate("userId")
        const extraPosts = await postModel.find({ _id: { $ne: postId } }).populate("userId")
        const Data = {
            searchedPost,
            extraPosts
        }
        const token = req.cookies.token;
        const decoded = jwt.verify(token, process.env.JWT);
        const user = await userModel.findOne({ username: decoded.username }).select('-password');
        const posts = await postModel.find().populate('userId').select("-password");
        res.render('displayPost', {  user: user, Data: Data });
    
    }catch(err){
        
    }
   
}


module.exports = sharedPostRender