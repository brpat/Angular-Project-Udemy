const express = require('express');
const router = express.Router();

const Post = require('../models/post');
const multer = require("multer");
const checkAuth = require('../middleware/check-auth');


const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg"
  };


//multer config 
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      const isValid = MIME_TYPE_MAP[file.mimetype];
      let error = new Error("Invalid mime type");
      if (isValid) {
        error = null;
      }
      callback(error, "backend/images");
    },
    filename: (req, file, callback) => {
      const name = file.originalname
        .toLowerCase()
        .split(" ")
        .join("-");
      const ext = MIME_TYPE_MAP[file.mimetype];
      callback(null, name + "-" + Date.now() + "." + ext);
    }
  });

router.get('/:id', (req, res, next) => {
    Post.findById(req.params.id).then(post =>{
        if(post){
            res.status(200).json(post)
        }else{
            res.status(400).json({message:'Post not found'});
        }
    })
});

router.delete('/:id',checkAuth, (req, res, next) => {
    const id = req.params.id;
    Post.deleteOne({_id:id}).then(result => {
        console.log("Successfully deleted post");
        res.status(200).json({message: "post deleted"});
    });
});

router.post("", checkAuth,multer({storage:storage}).single("image"), (req, res, next) => {
    const url = req.protocol + "://" + req.get('host');
    const post = new Post({
        title: req.body.title,
        content: req.body.content, 
        imagePath: url + '/images/' + req.file.filename
    });
    // return response as a post.
    post.save().then(createdPost => {
        res.status(201).json({
            message: "Post saved successfully",
            post:{
                // copy all attributes from createdPost and also add in _id
                // shortcut method
                ...createdPost,
                id:createdPost._id,
            }
        });
    });
    
  });

router.put("/:id",checkAuth,multer({storage:storage}).single("image"), (req, res, next) => {
    let imagePath = req.body.imagePath;
    if(req.file){
        const url = req.protocol + "://" + req.get('host');
        imagePath = url + '/images/' + req.file.filename;
    }
    const post = new Post({
        title: req.body.title,
        content: req.body.content, 
        imagePath: imagePath
    });
    // have to $set instead of passing in post due to immutablity
    Post.updateOne({_id: req.params.id}, { $set:
        { 
            title: req.body.title, 
            content: req.body.content,
            imagePath:imagePath
        }}).then(result =>{
        console.log(result);
        res.status(200).send({result: 'Update Success'});
    })

});


router.get('', (req, res, next)=>{
    const pageSize = req.query.pagesize;
    const currentPage = req.query.page;
    let fetchedPosts;
    const postQuery = Post.find(); 

    if(pageSize && currentPage){
        postQuery
        .skip(pageSize * (currentPage - 1))
        .limit(pageSize);
    }

    postQuery.then(documents=>{
        fetchedPosts = documents;
        return Post.count();
    }).then(count=>{
        // will return automatically
        res.status(200).json({message: '', posts: fetchedPosts, maxPosts:count});
    })
    .catch(err=>{
        console.error("Error fetching posts", err);
    });
});

module.exports = router;