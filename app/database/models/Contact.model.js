const mongoose = require("mongoose")
const {Schema} = mongoose;

const contactSchema = new Schema({
    selfId : {type:String,required:true},
    interlocutorsId : {type:String,required:true}
},{
    timestamps : true
});
const Contact = mongoose.model("contact",contactSchema);
module.exports = Contact;