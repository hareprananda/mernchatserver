
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
        const {email,password,username} = req.body;
        const errorReturn = () => res.status(400).json({"Error":"Username or Password are wrong"});
        const user = User.findOne({$or:[{username:username},{email:email}]}).then((result) => {
            if(result) {
                bcrypt.compare(password,result.password,(error,rslt) => {
                    error || !rslt ? errorReturn() : res.json(result);
                })
                
            }else{
                errorReturn();
            }
            
        }).catch(err => {console.log(err);errorReturn()});
        
    }
    logOut = (req,res)=>{

    }
    forgotPassword = (req,res)=>{

    }



}

module.exports = AuthenticateController;