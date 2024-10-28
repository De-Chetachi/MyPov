const express = require('express');
const postController = require('../controllers/postController');
const userController = require('../controllers/userController');
const commentController = require('../controllers/commentController');


const router = express.Router();
// GET post by id
router.get('/posts/:id', postController.getPost);
// GET all posts
router.get('/posts', postController.getPosts);
//require authentication
//create a new post
router.post('/posts', postController.createPost);
//update an existing post
router.patch('/posts/:id', postController.updatePost);
//delete a post by id
router.delete('/posts/:id', postController.deletePost);
//doesnt
//signup a new user
router.post('/signup', userController.register);
//login a new user
router.post('/login', userController.login);

//log out from a session
//router.get('/logout', userController.logout);
//get all comments on a postt
router.get('/posts/:id/comments', commentController.comments);
//get a a particular comment by id
router.get('/posts/comments/:id', commentController.comment);
//requires authorization
//comment on a post
router.post('/posts/:id/comments', commentController.addComment);
//delete a comment
router.delete('/posts/comments/:id', commentController.deleteComment);
//update a comment
router.patch('/posts/comments/:id', commentController.updateComment);
// like a post
router.post('/posts/:id/like', postController.like);

module.exports = router;
