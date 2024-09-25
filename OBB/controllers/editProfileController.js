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


const editProfileRender = async (req, res) => {
    try {
        const token = req.cookies.token;
        const decoded = jwt.verify(token, process.env.JWT);
        const user = await userModel.findOne({ username: decoded.username }).select('-password');
        res.render("editProfile", { user: user, error: req.flash("error"), success: req.flash("success") })
    } catch (err) {

    }

}


const admin = require("firebase-admin")
const serviceAccount = require('../service-account.json');
const bucket = admin.storage().bucket()

const editProfileHandler = async (req, res) => {
    try {
        const userId = req.params.userId
        const { bio, phone_email } = req.body
        const image = req.file
        const user = await userModel.findOne({ _id: userId })
        if (user) {

            if (image) {
                var blob = bucket.file(`profilePicture/${Date.now()}_${image.originalname}`);
                var blobStream = blob.createWriteStream({
                    metaData: {
                        contentType: image.mimetype,
                    }
                })
                blobStream.on('error', (err) => {
                    req.flash('error', 'Something went wrong.Please try again.');
                    res.redirect('/editProfile');
                })
                blobStream.on("finish", async () => {
                    await blob.makePublic()
                    const imageUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
                    if (imageUrl) {
                        var updateUser = await userModel.findOneAndUpdate({ _id: userId },
                            {
                                profilePicture: imageUrl,
                                bio: bio,
                                phone_email
                            },

                        )
                    }


                })
                req.flash("success", "Profile changed.")
                res.redirect(`/edit/${userId}`)
                blobStream.end(image.buffer)

            }
            else {
                var updateUser = await userModel.findOneAndUpdate({ _id: userId },
                    {
                        bio: bio, phone_email
                    },


                )
                req.flash("success", "Profile changed.")
                res.redirect(`/edit/${userId}`)

            }


        }
    } catch (err) {
        console.log("something went wrong.")
    }



}

module.exports = {
    editProfileRender,
    editProfileHandler
}

