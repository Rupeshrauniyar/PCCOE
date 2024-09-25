const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');


const app = express();
require('dotenv').config();
app.use(express.json());
app.set("view engine", 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(cookieParser());
app.use(session({
    secret: process.env.JWT,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 600000 }
}));


const indexRoute = require('./routes/indexRoute');
const loginRoute = require('./routes/loginRoute');
const registerRoute = require('./routes/registerRoute');
const postRoute = require('./routes/postRoute');
const likeRoute = require('./routes/likeRoute');
const commentRoute = require("./routes/commentRoute")
const fetchCommentRoute = require("./routes/fetchCommentRoute")
const sharedPostRoute = require("./routes/sharedPostsRoute")
const savePostRoute = require("./routes/savePostRoute")
const profileRoute = require("./routes/profileRoute")
const followfollowingRoute = require("./routes/follow-followingRoute")
const editProfileRoute = require("./routes/editProfileRoute")
const deleteRoute = require("./routes/deleteRoute")
const searchRoute = require("./routes/searchRoute")


app.use('/', indexRoute);
app.use('/login', loginRoute);
app.use('/register', registerRoute);
app.use('/post', postRoute);
app.use("/like", likeRoute)
app.use("/comment", commentRoute)
app.use('/fetch/comment', fetchCommentRoute)
app.use("/posts", sharedPostRoute)
app.use("/save", savePostRoute)
app.use("/profile", profileRoute)
app.use("/follow-following", followfollowingRoute)
app.use("/edit", editProfileRoute)
app.use("/search", searchRoute)
app.use("/delete", deleteRoute)
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
