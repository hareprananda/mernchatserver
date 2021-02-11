
const User = require("../database/models/User.model");
const bcrypt = require("bcrypt");
const { generateToken } = require("./Auth/AuthenticateToken");
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
                var {password:pword,createdAt,updatedAt,__v,...kembali} = newUser.toObject();
           
                let token = generateToken({"id":kembali["_id"]});
                return res.json({...kembali,token:token});
            }).catch(err => {
                console.log(err)
                if(err.code == 11000){
                    return res.status(400).json({"Error":"Duplicate Field"})
                }
                return res.status(400).json({"Error":"Oops something gone wrong"})
            })

        });
        
    }
    login = (req,res)=>{
        const {email,password,username} = req.body;
        const errorReturn = () => res.status(400).json({"Error":"Username or Password are wrong"});
        const user = User.findOne({$or:[{username:username},{email:email}]}).then((result) => {
            
            if(result) {
                var {password:pword,createdAt,updatedAt,__v,...kembali} = result.toObject();
                
                bcrypt.compare(password,pword,(error,rslt) => {
                    
                   
                    if(!rslt){
                        return errorReturn()
                    }

                    let token = generateToken({id:kembali["_id"]});
                    return res.json({...kembali,token:token});
                })
                
            }else{
                errorReturn();
            }
            
        }).catch(err => {console.log(err);errorReturn()});
        
    }
    me = (req,res) => {
        return res.json(req.user);
    }
    logOut = (req,res)=>{

    }
    forgotPassword = (req,res)=>{

    }



}

module.exports = AuthenticateController;