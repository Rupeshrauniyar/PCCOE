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

const followfollowingHandler = async (req, res) => {
    try {
        const Data = req.body
        if (Data.userId.includes(Data.myId)) {

        } else {
            const followUser = await userModel.findOne({ _id: Data.userId })
            if (followUser.followers.includes(Data.myId)) {
                var updateFollowUser = await userModel.findOneAndUpdate({ _id: Data.userId },
                    { $pull: { followers: Data.myId } },
                    { new: true }
                )
                var myAccountUpdate = await userModel.findOneAndUpdate({ _id: Data.myId },
                    { $pull: { following: Data.userId } },
                    { new: true }
                )
            } else {
                var updateFollowUser = await userModel.findOneAndUpdate({ _id: Data.userId },
                    { $push: { followers: Data.myId } },
                    { new: true }
                )
                var myAccountUpdate = await userModel.findOneAndUpdate({ _id: Data.myId },
                    { $push: { following: Data.userId } },
                    { new: true }
                )
            }
            const returnData = {
                updateFollowUser,
                myAccountUpdate
            }
            res.send(returnData)

        }
    } catch (err) {
        console.log("something went wrong.")
    }


}

module.exports = followfollowingHandler