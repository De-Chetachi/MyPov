const express = require('express');
const postController = require('../controllers/postController');
const userController = require('../controllers/userController');
const commentController = require('../controllers/commentController');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  });

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter: fileFilter
});

const router = express.Router();
// GET post by id
router.get('/posts/:id', postController.getPost);
// GET all posts
router.get('/posts', postController.getPosts);
//require authentication
//create a new post
router.post('/posts', upload.single("image"), postController.createPost);
//update an existing post
router.patch('/posts/:id', postController.updatePost);
//delete a post by id
router.delete('/posts/:id', postController.deletePost);
//doesnt
//signup a new user
router.post('/signup', upload.single("image"), userController.register);
//login a new user
router.post('/login', userController.login);

router.patch('/updateUser', upload.single("image"), userController.updateUser);

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
