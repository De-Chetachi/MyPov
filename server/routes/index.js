const express = require('express');
const postController = require('../controllers/postController');
const userController = require('../controllers/userController');
const commentController = require('../controllers/commentController');
const multer = require('multer');


const storage = multer.memoryStorage();
const upload = multer({ storage }).single('image');

const router = express.Router();
// GET post by id
router.get('/posts/:id', postController.getPost);
//return a post object {title, body, image, author, createdAt, updatedAt, likes, likedBy}

// GET all posts
router.get('/posts', postController.getPosts);
// returns a list of post objects 
//require authentication

//returns posts by a user
router.get('/user/posts', postController.getPostsByUser);

//get post author
router.get('/posts/:id/author', postController.getAuthor);
// returns a user object {username, email, image, bio, createdAt, updatedAt}

//create a new post, for signed in users only
router.post('/posts', upload, postController.createPost);
//request body = {title, text, image->optional}
// returns a post object {title, body, image, author, createdAt, updatedAt, likes, likedBy}

//post an image
//router.post('/posts/uploadImage', upload, postController.postImages);

//update an existing post, only available to the author of the post
router.patch('/posts/:id', postController.updatePost);

//returns a post object {title, body, image, author, createdAt, updatedAt, likes, likedBy}


//delete a post by id
router.delete('/posts/:id', postController.deletePost);


//signup a new user
router.get('/users/:id', userController.getUser);
router.get("/isLoggedIn", userController.isLogged);
router.post('/signup', userController.register);
router.patch('/profilePicture', upload, userController.profilePicture);
//login a new user
router.post('/login', userController.login);

router.patch('/updateUser', upload, userController.updateUser);

//log out from a session
router.get('/logout', userController.logout);

//get a a particular comment by id
router.get('/posts/comments/:id', commentController.comment);
// returns a comment object {id, user, post, body, createdAt, updatedAt}

//get all comments on a post given the post id
router.get('/posts/:id/comments', commentController.comments);
// returns a list of comment objects {id, user, post, body, createdAt, updatedAt}

//requires authorization
//comment on a post, given the post id
router.post('/posts/:id/comments', commentController.addComment);
// request body = {body}
// returns a comment object {id, user, post, body, createdAt, updatedAt}

//delete a comment
router.delete('/posts/comments/:id', commentController.deleteComment);

//update a comment
router.patch('/posts/comments/:id', commentController.updateComment);
//returns a comment object {id, user, post, body, createdAt, updatedAt}

// like a post
router.post('/posts/:id/like', postController.like);
// check if a user has liked a post
router.get('/posts/:id/liked', postController.userLiked);
module.exports = router;
