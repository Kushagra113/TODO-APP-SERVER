const jwt = require('jsonwebtoken');

module.exports.isSigned = (req,res,next)=>{
    jwt.verify(req.headers.authorization,process.env.jwtSecret,(err,result)=>{
        if(err){
            res.json({accessToken:"Access Token Not Valid"});
        }
        else{
            next();
        }
    });
}