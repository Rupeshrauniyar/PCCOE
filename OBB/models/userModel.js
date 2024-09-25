const mongoose = require('mongoose');
const db = require('../config/db');

const Userschema = mongoose.Schema({
    phone_email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: "https://scontent.fbir7-1.fna.fbcdn.net/v/t1.30497-1/84628273_176159830277856_972693363922829312_n.jpg?stp=c15.0.50.50a_cp0_dst-jpg_p50x50&_nc_cat=1&ccb=1-7&_nc_sid=7565cd&_nc_ohc=H600uBzvlmwQ7kNvgGx0Owg&_nc_ht=scontent.fbir7-1.fna&edm=AP4hL3IEAAAA&oh=00_AYC5py_GE2HjqaL_E_th1wQy3haZre0sXmkHDrUABoFKXA&oe=66E63599"
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        default: null
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        default: null
    }],
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Posts',
        default: null
    }],
    stories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stories',
        default: null
    }],
    blockedUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        default: null
    }],
    notifications: [{}],
    verified: {
        type: Boolean,
        default: false
    },
    saved: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Posts',
        default: null
    }],
    bio: {
        type: String,
        default: null
    },
    recentSearches: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        default: null
    }]
})


const userModel = mongoose.model('Users', Userschema);
module.exports = userModel;