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

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


const router = express.Router();
const editProfileController = require('../controllers/editProfileController');
const isLoggedIn = require('../middlewares/isLoggedIn');

router.get('/:userId', isLoggedIn, editProfileController.editProfileRender)

router.post('/:userId', isLoggedIn, upload.single("image"), editProfileController.editProfileHandler)


module.exports = router;