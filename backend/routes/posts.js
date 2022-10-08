const express = require('express');

const router = express.Router();
const Post = require('../models/post');

router.get('/:id', (req, res, next) => {
    Post.findById(req.params.id).then(post =>{
        if(post){
            res.status(200).json(post)
        }else{
            res.status(400).json({message:'Post not found'});
        }
    })
});

router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    Post.deleteOne({_id:id}).then(result => {
        console.log("Successfully deleted post");
        res.status(200).json({message: "post deleted"});
    });
});

router.post("", (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save().then(createdPost => {
        res.status(201).json({
            message: "Post saved successfully",
            postId: createdPost._id
        });
    });
    
  });

router.put("/:id", (req, res, next) => {
    Post.updateOne({_id: req.params.id}, { $set:
        { 
            title: req.body.title, 
            content: req.body.content
        }}).then(result =>{
        console.log(result);
        res.status(200).send({result: 'Update Success'});
    })

});


router.use('', (req, res, next)=>{
    // const posts = [
    //     {
    //         id: '1234567',
    //         title:'Title',
    //         content:'Content'
    //     },
    //     {
    //         id: '12345678',
    //         title:'Title2',
    //         content:'Content2'
    //     }
    // ];
    Post.find().then(documents=>{
        // will return automatically
        res.status(200).json({message: '', posts: documents});
    }).catch(err=>{
        console.error("Error fetching posts");
    });
});

module.exports = router;