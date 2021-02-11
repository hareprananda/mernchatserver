const jwt = require("jsonwebtoken");
const authenticateToken = (req,res,next)=>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401) // if there isn't any token

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if(err){
            
            if (err) return res.sendStatus(403)
        }
        
        req.user = user
        next() // pass the execution off to whatever request the client intended
    })
}
const generateToken = (payload) => {
    
    return jwt.sign(payload,process.env.TOKEN_SECRET,{expiresIn : '7200s'});
}
module.exports = {authenticateToken,generateToken};