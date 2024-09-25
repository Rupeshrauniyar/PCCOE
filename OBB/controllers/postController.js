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
    cookie: { maxAge: 10 * 365 * 24 * 60 * 60 * 100000 }
}));

const userModel = require('../models/userModel');
const postModel = require('../models/postModel');



const admin = require('firebase-admin');
const serviceAccount = require('../service-account.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "instagram-mern-app-storage.appspot.com"
})
const bucket = admin.storage().bucket();

const postRenderController = async (req, res) => {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT);
    const user = await userModel.findOne({ username: decoded.username }).select('-password');
    res.render('post', { error: req.flash('error'), success: req.flash('success'), user: user });
}

const postUploadController = async (req, res) => {
    try {
        const { caption } = req.body;
        const image = req.file;
        if (image) {
            if (caption) {

                const blob = bucket.file(`posts/${Date.now()}_${image.originalname}`);
                const blobStream = blob.createWriteStream({
                    metaData: {
                        contentType: image.mimetype,
                    }
                })
                blobStream.on('error', (err) => {
                    req.flash('error', 'Something went wrong.Please try again.');
                    res.redirect('/post');
                })
                blobStream.on('finish', async () => {
                    await blob.makePublic();
                    const fileURL = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
                    const fileType = fileURL.split(".").pop()

                    const token = req.cookies.token;
                    const decoded = jwt.verify(token, process.env.JWT);
                    const user = await userModel.findOne({ username: decoded.username }).select('-password');
                    if (fileType === "mp4") {
                        var post = await postModel.create({
                            caption,
                            file: fileURL,
                            userId: user._id,
                            fileTYPE: "video"
                        })
                    }
                    else if (fileType === "jpg") {
                        var post = await postModel.create({
                            caption,
                            file: fileURL,
                            userId: user._id,
                            fileTYPE: "image"

                        })
                    }

                    const updateUsersPost = await userModel.findOneAndUpdate(
                        { username: decoded.username },
                        { $push: { posts: post._id } },
                        { new: true }
                    )

                    req.flash('success', 'Post uploaded');
                    res.redirect('/');

                })
                blobStream.end(image.buffer);
            } else {
                req.flash('error', 'Enter a caption.');
                res.redirect('/post');
            }
        } else {
            if (caption) {
                const token = req.cookies.token;
                const decoded = jwt.verify(token, process.env.JWT);
                const user = await userModel.findOne({ username: decoded.username }).select('-password');
                var post = await postModel.create({
                    caption,
                    userId: user._id,
                })


                const updateUsersPost = await userModel.findOneAndUpdate(
                    { username: decoded.username },
                    { $push: { posts: post._id } },
                    { new: true }
                )

                req.flash('success', 'Tweet uploaded');
                res.redirect('/');
            } else {
                req.flash('error', 'Enter a caption.');
                res.redirect('/post');
            }
        }

    } catch (err) {
        req.flash('error', "Upload failed.");
        res.redirect('/post');
    }


}

module.exports = { postRenderController, postUploadController }