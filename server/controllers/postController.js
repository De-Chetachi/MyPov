
const { mongoose } = require('mongoose');
const Post = require('../models/postModel');
const User = require('../models/userModel');
const verify = require('../util/verify');
const { ObjectId } = require('mongodb');
const path = require('path');
const fs = require('fs');

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
            const { title, text } = req.body;
            if (!title) return res.status(400).json({error: 'Title is required'});
            if (!text) return res.status(400).json({error: 'Text is required'}); 
            const author = await User.findById(userId);
            const post = new Post({ title, text, author});
            if (req.file) {
                const dirname = path.dirname(__dirname);
                const filepath = path.join(dirname + '/uploads/postImage/' + title);
                const img = {
                    data: fs.readFileSync(filepath),
                    contentType: 'image/png',
                }
                post.image = img;
            }
            post.save();
            res.status(201).json({post});         
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }

    static async updatePost(req, res) {
        try {
            const userId = await verify(req, res);
            const { id } = req.params;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(404).json({ error: `id: ${id} is not valid` });
            }
            const update = req.body;
            let post = await Post.findById(id);
            if (!post)
            { 
                return res.status(404).json({error: `No post with id: ${id}`});
            }

            if (!(post.author.equals(userId))) {
                return res.status(401).json({error: `unauthorized to edit this post`});
            }
            post = await Post.findByIdAndUpdate(id, update, { new: true });
            res.status(200).json(post);
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }

    static async deletePost(req, res) {
        try {
            const userId = await verify(req, res);
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
            const userId = await verify(req, res);
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
            post.save();
            res.status(200).json({ message: `${user.username} liked: ${post}` })
        } catch(error) {
            res.status(400).json({error: error.message});
        }
    }
}

module.exports = postController;