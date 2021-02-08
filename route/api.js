const router = require("express").Router();
const Auth = require("../app/controller/AuthenticateController");


router.post("/register",(new Auth).register);
router.post("/login",(new Auth).login);

module.exports = router;