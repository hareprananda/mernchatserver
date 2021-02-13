const mongoose = require("mongoose")
const {Schema} = mongoose;

const chatSchema = new Schema({
    contactId : {type : String, required: true},
    chat : {type:String,required:true},
    payload : {type:String}
    
});

const Chat = mongoose.model("Chat",chatSchema);
module.exports = Chat;