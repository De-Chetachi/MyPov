
const { mongoose } = require('mongoose');
const Post = require('../models/postModel');
const User = require('../models/userModel');
const verify = require('../util/verify');
const { ObjectId } = require('mongodb');
const path = require('path');
const fs = require('fs');
const uploadMiddleware = require('../middleware/uploadMiddleware');

class postController {
    static async getPosts(req, res) {
        const posts = await Post.find({}).populate('author').sort({ createdAt: -1 });
        res.status(200).json(posts);
    }

    static async getPostsByUser(req, res) {
        const userId  = await  verify(req, res);
        if (!userId) { 
            return res.status(401).json({ error: 'unauthorized' });
        }
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(404).json({ error: `No user with id: ${userId}` });
        }
        const posts = await Post.find({ author: userId }).populate('author').sort({ createdAt: -1 });
        if (!posts || posts.length === 0) {
            return res.status(200).json([]);
        }  

        res.status(200).json(posts);
    }

    static async postImages(req, res) {
        try {
            if (req.file) {
                const imgObject = await uploadMiddleware(req);
                const image = imgObject.url;
                return res.status(200).json({image});
            }
            return res.status(400).json({error: "no file"});
        } catch (err) {
            return res.status(400).json(err.message)
        }
        
    }

    static async getPost(req, res) {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: `No post with id: ${id}`});
        }
        const post = await Post.findById(id).populate('author');
        if (!post)
        { 
            return res.status(404).json({error: `No post with id: ${id}`});
        }
        res.status(200).json(post);
    }

    static async getAuthor(req, res) {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: `No post with id: ${id}`});
        }
        const post = await Post.findById(id);
        if (!post)
        { 
            return res.status(404).json({error: `No post with id: ${id}`});
        }

        const authorId = post.author;
        if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: `No post with id: ${id}`});
        }
        const author = await User.findById(authorId);
        if (!author) return res.status(404).json({ error: `no user with id: ${authorId}` });
        return res.status(200).json(author);
    }

    static async createPost(req, res) {
        try {
            const userId = await verify(req, res);
            const { title, text} = req.body;
            if (!title) return res.status(400).json({error: 'Title is required'});
            if (!text) return res.status(400).json({error: 'Text is required'}); 
            const author = await User.findById(userId);
            const post = new Post({ title, text, author});
            if (req.file) {
                const imgObject = await uploadMiddleware(req);
                post.image = imgObject.url;
            }
            await post.save();
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

    static async userLiked(req, res) {
        const userId = await verify(req, res);
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if (!post || !userId) {
            return res.status(400).json({ error: 'bad request' });
        }
        if (!post.likedBy.includes(userId)) {
            return res.status(200).json({ liked: false });
        }
        return res.status(200).json({ liked: true });    
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
            await post.like(user);
            await post.save();
            res.status(200).json({ message: `${user.username} liked: ${post}` })
        } catch(error) {
            res.status(400).json({error: error.message});
        }
    }
}

module.exports = postController;