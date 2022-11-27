const jwt = require('jsonwebtoken');

module.exports = (req,res, next)=>{
    try{    
        // "Bearer Token"
        const token = req.headers.authorization.split(" ")[1]
        const decodedToken = jwt.verify(token, 'longsigningsecret');
        req.userData = {email:decodedToken.email, userId:decodedToken.userId}
        next();
    }catch(err){
        res.status(403).json({
            message:"Authorization Failed"
        })
    }
}