const express = require("express");
const app = express();
const http = require("http");
const bodyParser = require("body-parser");
const server = http.createServer(app);
const socketio = require("socket.io");
const ChatController = require("./app/controller/ChatController");

ChatController(server);

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


require("dotenv").config();

require('./app/database/connection');


app.use(require("./app/middleware/MasterMiddleware"))
app.use("/api",require("./route/api"));





const PORT = process.env.PORT || 5005;

server.listen(PORT,() => console.log("server start at "+PORT));