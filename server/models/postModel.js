const mongoose = require('mongoose');
const User = require('./userModel');
const Comment = require('./commentModel');
//const uuid = require('uuid');

// the oop class
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
    },

    text: {
        type: String,
        required: true,
    },

    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    image: {
        type: String,
         //data: Buffer,
         //contentType: String,
     },

    likes: {
        type: Number,
        default: 0,
    },

    likedBy: {
        type: Array,
        default: [],
    },

}, { timestamps: true})

postSchema.methods.commentP = function(comment) {
    this.comments.push(comment);
}

postSchema.methods.like = function(user) {
    this.likedBy.push(user);
    this.likes = this.likes + 1;
}

postSchema.methods.getLikes = function() {
    return this.likes;
}

module.exports = mongoose.model('Post', postSchema);