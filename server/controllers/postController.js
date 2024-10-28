
const { mongoose } = require('mongoose');
const Post = require('../models/postModel');
const User = require('../models/userModel');
const verify = require('../util/verify');
const { ObjectId } = require('mongodb');

class postController {
    static async getPosts(req, res) {
        const posts = await Post.find({}).sort({ createdAt: -1 });
        res.status(200).json(posts);
    }

    static async getPost(req, res) {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: `No post with id: ${id}`});
        }
        const post = await Post.findById(id);
        if (!post)
        { 
            return res.status(404).json({error: `No post with id: ${id}`});
        }
        res.status(200).json(post);
    }

    static async createPost(req, res, next) {
        try {
            const userId = await verify(req, res, next);
            const { title, text, } = req.body;
            console.log({"user": userId})
            const author = await User.findById(userId);
            const post = await Post.create({ title, text, author });
            res.status(201).json({post});         
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }

    static async updatePost(req, res) {
        try {
            const userId = verify(req, res);
            const { id } = req.params;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(404).json({ error: `id: ${id} is not valid` });
            }
            const update = req.body;
            console.log(update);
            const post = await Post.findByIdAndUpdate(id, update, { new: true });
            if (!post)
            { 
                return res.status(404).json({error: `No post with id: ${id}`});
            }

            if (!(post.author.equals(userId))) {
                return res.status(401).json({error: `unauthorized to edit this post`});
            }
            res.status(200).json(post);
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }

    static async deletePost(req, res) {
        try {
            const userId = verify(req, res);
            const { id } = req.params;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(404).json({ error: `No post with id ${id}` });
            }
            const post = await Post.findById(id);
            if (!post) {
                return res.status(404).json({ error: `No post with id ${id}` });
            }
            if (!(post.author.equals(userId))) {
                return res.status(401).json({error: `unauthorized to delete this post`});
            }
            await Post.findByIdAndDelete(id);
            res.status(200).json({ deleted: post })
        } catch(error) {
            res.status(400).json({error: error.message});
        }
    }

    static async like(req, res) {
        try{
            const userId = verify(req, res);
            const user = await User.findById(userId);
            const { id }  = req.params;
            if (!mongoose.Types.ObjectId.isValid(id)){
               return res.status(404).json({error: `No post with id: ${id}`});
            }
            const post = await Post.findById(id);
            if (!post)
            { 
               return res.status(404).json({error: `No post with id: ${id}`});
            }
            post.like(user);
            res.status(200).json({ liked: post })
        } catch(error) {
            res.status(400).json({error: error.message});
        }
    }
}

module.exports = postController;