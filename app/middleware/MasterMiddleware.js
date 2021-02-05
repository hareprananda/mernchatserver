const express = require("express");
const app = express();

app.use("/api",(req,res,next) => {

   
    next();

})
module.exports = app;