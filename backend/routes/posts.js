const express = require('express');
const router = express.Router();

const Post = require('../models/post');
const multer = require("multer");
const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/file');

const PostController = require('../controllers/posts');


router.get('/:id', PostController.getSinglePost);

router.delete('/:id',checkAuth, PostController.deletePost);

router.post("", checkAuth,extractFile, PostController.createPost);

router.put("/:id",checkAuth,extractFile, PostController.updatePost);

router.get('', PostController.getPosts);


module.exports = router;