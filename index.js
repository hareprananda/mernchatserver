const express = require("express");
const app = express();
const http = require("http");
const bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const server = http.createServer(app);
require("dotenv").config();

require('./app/database/connection');


app.use(require("./app/middleware/MasterMiddleware"))
app.use("/api",require("./route/api"));





const PORT = process.env.PORT || 5005;

server.listen(PORT,() => console.log("server start at "+PORT));