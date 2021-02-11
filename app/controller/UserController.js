const AuthenticateController = require("./AuthenticateController");
const User = require("../database/models/User.model");
class UserController {

    constructor(){

    }
    async changeProfile(req,res){
        const {user} = req;
        //const temukan = await User.find({"_id":user["_id"]}).exec();
        await User.updateOne({"_id":user["_id"]},{$set : req.body }).exec();
        const find = await User.findOne({"_id" : user["_id"]}).exec();

        const {password,__v,createdAt,updatedAt,...rest} = find.toObject(); 
        return res.json(rest);
    }


    
}
module.exports = UserController;