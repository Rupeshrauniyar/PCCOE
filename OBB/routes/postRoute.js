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
    cookie: { maxAge: 60000 } // 10 years in milliseconds
}));


const isLoggedIn = require('../middlewares/isLoggedIn');

const router = express.Router();

const postController = require('../controllers/postController');

const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", isLoggedIn,postController.postRenderController);
router.post("/",isLoggedIn, upload.single("image"), postController.postUploadController);


module.exports = router;