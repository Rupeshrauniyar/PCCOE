const mongoose = require('mongoose');
const db = require('../config/db');

const postSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    caption: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: false
    },
    fileTYPE: {
        type: String,
        required: false
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'

    }],
    comments: [{
        comment: String,
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users'
        },
        commentedOn: {
            type: Date,
            default: Date.now()
        }

    }],
    uploadedAt: {
        type: Date,
        default: Date.now
    },
    saved: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        default: null
    }]


})

const postModel = mongoose.model('Posts', postSchema);
module.exports = postModel;