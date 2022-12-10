const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.createUser = (req, res, next)=>{
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
                message:"Username already exists!"
            });
        });  
    });
}

exports.userLogin = (req, res, next)=>{
    let fetchedUser = null;
    User.findOne({email:req.body.email})
    .then(user=>{
        if(!user){
            return res.status(401).json({
                message:'Authentication failed'
            })
        }
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
             process.env.JWT_KEY,
              {expiresIn:'1h'}
            );
        //console.log("Logged In Successfully", user.fetchedUser._id);
        //will auto return
        res.status(200).json({
            token: token,
            expiresIn: 12000,
            userId: fetchedUser._id
        });
    })
    .catch(err=>{
        return res.status(401).json({
            message:'Invalid Authentication Credentials'
        });
    });
}

