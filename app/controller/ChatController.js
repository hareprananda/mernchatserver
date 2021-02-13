const socketio = require("socket.io");
const CryptoJS = require("crypto-js");
const jwtAuth = require("socketio-jwt-auth");
const User = require("../database/models/User.model");
require("dotenv").config();
const online = [];
function ChatController(server){
    const io = socketio(server,{
        cors : {
            origin : "*"
        }
    });

    io.use(jwtAuth.authenticate({
        secret : process.env.TOKEN_SECRET,
        succeedWithoutToken : true,
        algorithm : "HS256",
    },async function(payload,done){
        
        
        
        
        if(payload && payload.id){
            let user = await User.findOne({"_id":payload.id}).exec();
            return done(null,user);
        }else{
            return done(null, false, 'user does not exist');
        }

    }))
    // io.use(function(socket,next){
    //     var handshakeData = socket.request;
    //     console.log(handshakeData._query['payload'])
    //     next();
    // })



    io.on("connection",socket => {
        console.log("yuhu ada yang join");

        online.push({userId : socket.request.user._id, socketId:socket.id})

        socket.emit("success",{
            message : "Success logged in",
            user : socket.request.user
        });

        socket.on("sendMessage",(payload,callback)=> {

            console.log(payload);

            callback(`response dari server, pengirim adalah ${socket.request.user.username} socket id adalah ${socket.id} `);
        })



        socket.on("disconnect",()=> {
            let leftIndex = online.findIndex(value => value.socketId == socket.id);
            if(leftIndex !== (-1)){
                online.splice(leftIndex,1);
            }
            
            console.log(socket.id +" leave")
        })
    })
}


module.exports = ChatController;