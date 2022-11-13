const jwt = require('jsonwebtoken');

module.exports = (req,res, next)=>{
    try{    
        // "Bearer Token"
        const token = req.headers.authorization.split(" ")[1]
        jwt.verify(token, 'longsigningsecret');
        next();
    }catch(err){
        res.status(403).json({
            message:"Authorization Failed"
        })
    }

}