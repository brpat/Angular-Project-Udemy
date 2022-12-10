const multer = require("multer");
const checkAuth = require('../middleware/check-auth');

const Post = require('../models/post');

exports.createPost = (req, res, next) => {
    const url = req.protocol + "://" + req.get('host');
    const post = new Post({
        title: req.body.title,
        content: req.body.content, 
        imagePath: url + '/images/' + req.file.filename,
        creator: req.userData.userId
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
    }).catch(err=>{
        res.status(500).json({
            message:"Post Creation Failed"
        })
    });
    
  }


  exports.updatePost = (req, res, next) => {
    let imagePath = req.body.imagePath;
    if(req.file){
        const url = req.protocol + "://" + req.get('host');
        imagePath = url + '/images/' + req.file.filename;
    }
    const post = new Post({
        title: req.body.title,
        content: req.body.content, 
        imagePath: imagePath,
        creator: req.userData.userId
    });
    // have to $set instead of passing in post due to immutablity
    Post.updateOne({_id: req.params.id, creator:req.userData.userId}, { $set:
        { 
            title: req.body.title, 
            content: req.body.content,
            imagePath:imagePath
        }}).then(result =>{
            if (result.modifiedCount > 0) {
                res.status(200).send({result: 'Update Success!'});
            }else{
                res.status(403).send({result: 'Not Authorized!'});
            }
            
    }).catch(err =>{
        res.status(500).json({message: "Failed to Update Post!"});
    })

}

exports.getPosts = (req, res, next)=>{
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
    .catch(err =>{
        res.status(500).json({message: "Failed to Retrieve Posts!"});
    })
}

exports.getSinglePost = (req, res, next) => {
    Post.findById(req.params.id).then(post =>{
        if(post){
            res.status(200).json(post)
        }else{
            res.status(400).json({message:'Post not found'});
        }
    })
}


exports.deletePost = (req, res, next) => {
    const id = req.params.id;
    Post.deleteOne({_id:id, creator:req.userData.userId}).then(result => {
        if (result.deletedCount > 0) {
            res.status(200).send({result: 'Deleted Successfully!'});
        }else{
            res.status(403).send({result: 'Not Authorized!'});
        }
    });
}