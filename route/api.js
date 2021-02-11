const router = require("express").Router();
const Auth = require("../app/controller/AuthenticateController");

const { generateToken, authenticateToken } = require("../app/controller/Auth/AuthenticateToken");
const UserController = require("../app/controller/UserController");
const ChatController = require("../app/controller/ChatController");

router.post("/register",(new Auth).register);
router.post("/login",(new Auth).login);
router.post('/createtoken',(req,res)=> {
    let token = generateToken({username:req.body.username}); // pada bagian ini masukkan detail dari user sebagai parameter
    return res.json(token);
    res.json(req.body.username)
});

router.get('/me',authenticateToken,(new Auth).me);
router.put("/changeprofile",authenticateToken,(new UserController).changeProfile);

// router.post("/chat",authenticateToken,(new ChatController).sendChat);
module.exports = router;