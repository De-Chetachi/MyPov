const Comment = require('../models/commentModel');
const Post = require('../models/postModel');
const User = require('../models/userModel');
const verify = require('../util/verify');
const { mongoose } = require('mongoose');
const { ObjectId } = require('mongodb');

class commentController {
    static async comments(req, res) {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: `invalid id: ${id}`});
        }
        const comments = await Comment.find({post: id});
        if (!comments || comments.length === 0) {
            return res.status(200).json([]);
        }
        return res.status(200).json(comments)

    }

    static async addComment(req, res) {
        try {
            const { id } = req.params;
            const userId = await verify(req, res);
            if (!mongoose.Types.ObjectId.isValid(id)){
                return res.status(404).json({error: `invalid id: ${id}`});
            }
            const post = await Post.findById(id);
            post.comment();
            if (!post)
            { 
                return res.status(404).json({error: `No post with id: ${id}`});
            }
            const user = await User.findById(userId);
            if(!user) {
                return res.status(404).json({error: `No user with id: ${userId}`});
            }
            const { body } = req.body;
            const comment = await Comment.create({ user, post, body });
            return res.status(201).json(comment)
        } catch(error) {
            res.status(400).json({error: error.message});
        }
    }

    static async comment(req, res) {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: `No comment with id: ${id}`});
        }
        const comment = await Comment.findById(id);
        if (!comment)
        { 
            return res.status(404).json({error: `No comment with id: ${id}`});
        }
        return res.status(200).json({id: comment});
    }

    static async deleteComment(req, res) {
        try{
            const userId = await verify(req, res);
            const { id } = req.params;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(404).json({ error: `No comment with id ${id}` });
            }
            const comment = await Comment.findById(id);
            if (!comment) return res.status(404).json({ error: `No comment with id ${id}` });
            if(!(comment.user.equals(userId))) return res.status(401).json({ error: 'only the person who made this comment can delete it' });
            await Comment.findByIdAndDelete(id);
            res.status(204).json({ deleted: comment })
        } catch(error) {
            res.status(400).json({error: error.message});
        }
    }

    static async updateComment(req, res) {
        try{
            const userId = await verify(req, res);
            const { id } = req.params;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(404).json({ error: `No comment with id ${id}` });
            }
            const body = req.body;
            let comment = await Comment.findById(id);
            if (!comment) return res.status(404).json({ error: `No comment with id ${id}` });
            // console.log(comment.user, userId);
            if (!(comment.user.equals(userId))) return res.status(401).json({ error: 'only the person who made this comment can edit it' });
            comment = await Comment.findByIdAndUpdate(id, body, { new: true });
            res.status(200).json({ updated: comment })
        } catch(error) {
            res.status(400).json({error: error.message});
        }
    }
}

module.exports = commentController;