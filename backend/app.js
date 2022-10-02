const express = require('express');
const app = express();

const mongoose = require('mongoose');
const Post = require('./models/post');

const bodyParser = require('body-parser');

mongoose.connect("mongodb+srv://admin7:ub10WKUszh4v@meanudemyproject.n8scu5d.mongodb.net/node-angular-course?retryWrites=true&w=majority")
.then(()=>{
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error(err);
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req,res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    next();
});

app.delete('/api/posts/:id', (req, res, next) => {
    const id = req.params.id;
    Post.deleteOne({_id:id}).then(result => {
        console.log("Successfully deleted post");
        res.status(200).json({message: "post deleted"});
    });
});

app.post("/api/posts", (req, res, next) => {
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


app.use('/api/posts', (req, res, next)=>{
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


module.exports = app;