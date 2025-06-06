const mongoose = require('mongoose');
const User = require('./userModel');
const Post = require('./postModel'); 

const Schema = mongoose.Schema;
CommentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
}, { timestamps: true});

module.exports = mongoose.model('Comment', CommentSchema)