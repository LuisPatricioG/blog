const express = require('express');

const {login,
        CreateAuthor, 
        ListAuthors,
        ListDeactivatedAuthors,
        getSingleAuthor, 
        updateAuthor, 
        deleteAuthor, 
        reactivateAuthor} = require('../controllers/authorController');

const {createPost,
        listPosts,
        listDeletedPosts,
        updatePost,
        getSinglePost,
        deletePost,
        postsUser,
        uploadImage} = require ('../controllers/postController');

const {verifyToken} = require('../middlewares/isAuthenticaded');

const {multerUpload} = require('../middlewares/multerUpload');


const router = express.Router();

//Authors routes

router.post('/login',login);
router.get('/authors',ListAuthors);
// router.get('/authors/deactivated',ListDeactivatedAuthors);
router.post('/authors',CreateAuthor);
router.patch('/authors', reactivateAuthor);
router.get('/authors/:id', getSingleAuthor);
router.patch('/authors/:id', updateAuthor);
router.delete('/authors/:id', deleteAuthor);

//Posts routes

router.get('/posts', listPosts);
router.post('/posts', verifyToken, createPost);
router.get('/posts/deleted', listDeletedPosts);
router.get('/posts/:id', getSinglePost);
router.patch('/posts/:id', verifyToken, updatePost);
router.delete('/posts/:id', verifyToken, deletePost);
router.get('/me/posts', verifyToken, postsUser)
router.post('/posts/upload', multerUpload, uploadImage);

module.exports = router;