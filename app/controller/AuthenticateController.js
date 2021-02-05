
const User = require("../database/models/User.model");
const bcrypt = require("bcrypt")
class AuthenticateController {

    constructor(){
        this.saltRounds = 10;
    }
    register = async(req,res) =>{
        
        
        
        //bcrypt hash nanti dipindahkan ke client
        bcrypt.hash(req.body.password, this.saltRounds).then(function(hash) {
            req.body.password = hash;
            let newUser =new User(req.body);
            
            newUser.save().then(() => {
                res.json("user added")
            }).catch(err => {
                console.log(err)
                if(err.code == 11000){
                    res.status(400).json({"Error":"Duplicate Field"})
                }
                res.status(400).json({"Error":"Oops something gone wrong"})
            })

        });
        
    }
    login = (req,res)=>{

    }
    logOut = (req,res)=>{

    }
    forgotPassword = (req,res)=>{

    }



}

module.exports = AuthenticateController;