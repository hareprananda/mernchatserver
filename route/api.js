const router = require("express").Router();
const Auth = require("../app/controller/AuthenticateController");
const passport = require("passport");

const initializePassport = require("../app/controller/Auth/passport-config");
const { generateToken, authenticateToken } = require("../app/controller/Auth/AuthenticateToken");

router.post("/register",(new Auth).register);
router.post("/login",(new Auth).login);
router.post('/createtoken',(req,res)=> {
    let token = generateToken({username:req.body.username}); // pada bagian ini masukkan detail dari user sebagai parameter
    return res.json(token);
    res.json(req.body.username)
});

router.get('/me',authenticateToken,(new Auth).me);
module.exports = router;