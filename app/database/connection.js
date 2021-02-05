const mongoose = require("mongoose");

const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser: true,useCreateIndex:true,useUnifiedTopology:true})
const connection = mongoose.connection;
connection.once("open",function(){
    console.log("Database connection estabslished successfully")
})
module.exports = mongoose;