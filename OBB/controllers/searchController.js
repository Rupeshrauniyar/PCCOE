const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const session = require('express-session');
// const chalk = require('chalk');



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


const renderSearch = async (req, res) => {
    try {
        const token = req.cookies.token;
        const decoded = jwt.verify(token, process.env.JWT);
        const user = await userModel.findOne({ username: decoded.username }).select('-password').populate("following")
        res.render("search", { user: user })
    } catch (err) {
        console.log("something went wrong.")
    }


}
const handleSearch = async (req, res) => {
    try {
        const Data = req.body
        if (Data) {
            const searchQuery = Data.searchedData
            if (searchQuery.length > 0) {
                const user = await userModel.find({
                    username: {
                        $regex: new RegExp(`^[^a-zA-Z0-9]*${searchQuery}`, 'i')
                    }
                })
                res.send(user)
            }

        }
    } catch (err) {
        console.log("something went wrong.")
    }

}
const updateSearch = async (req, res) => {
    try {
        const Data = req.body
        if (Data) {
            const token = req.cookies.token
            const decoded = jwt.verify(token, process.env.JWT)
            const username = decoded.username
            const myId = await userModel.findOne({ username: username })
            var fetchedUserId = Data.userId
            if (myId) {

                if (myId.recentSearches.includes(Data.userId)) {
                    res.send(myId)
                } else {
                    const myIdUpdate = await userModel.findOneAndUpdate(
                        { username: username },
                        { $push: { recentSearches: fetchedUserId } }, { new: true })
                    res.send(myIdUpdate)

                }
            }


        }
    } catch (err) {
        console.log("something went wrong.")
    }

}

module.exports = { renderSearch, handleSearch, updateSearch }

