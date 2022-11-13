const express = require('express');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { routes } = require('../app');


const router = express.Router();

router.post('/signup', (req, res, next)=>{
    let user = null;
    bcrypt.hash(req.body.password, 10).then(hash =>{
        user = new User({
            email: req.body.email,
            password: hash
        })
        user.save().then(result=>{
            res.status(201).json({
                message:'User saved successfully',
                result:result
            });
        }).catch(err=>{
            res.status(500).json({
                error:err
            });
        });  
    });
});

router.post('/login', (req, res, next)=>{
    let fetchedUser = null;
    User.findOne({email:req.body.email})
    .then(user=>{
        console.log("USER:", user);
        if(!user){
            return res.status(401).json({
                message:'Authentication failed'
            })
        }
        console.log("++++", user);
        fetchedUser = user;
        return bcrypt.compare(req.body.password, user.password);
    })
    .then(result=>{
        if(!result){
            return res.status(401).json({
                message:'Authentication failed'
            })
        }
        const token = jwt.sign(
            {email:fetchedUser.email, userId:fetchedUser._id},
             'longsigningsecret',
              {expiresIn:'1h'}
            );
        //will auto return
        res.status(200).json({
            token:token
        })
    })
    .catch(err=>{
        return res.status(401).json({
            message:'Authentication failed',
            err:err
        })
    });
});

module.exports = router;