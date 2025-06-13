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
    
    userLiked: {
        type: Boolean,
        default: false,
    },

    likes: {
        type: Number,
        default: 0,
    },
    comments: {
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
    this.likedBy.push(user._id);
    this.likes = this.likes + 1;
};

postSchema.methods.comment = function() {
    this.comments = this.comments + 1;
}

postSchema.methods.getLikes = function() {
    return this.likes;
}

module.exports = mongoose.model('Post', postSchema);