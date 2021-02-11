const socketio = require("socket.io");
const CryptoJS = require("crypto-js");
function ChatController(server){
    const io = socketio(server,{
        cors : {
            origin : "*"
        }
    });

    io.on("connection",socket => {
        console.log("yuhu ada yang join");

        socket.on("sendMessage",(payload,callback)=> {

           
            callback("response dari server");
        })



        socket.on("disconnect",()=> {
            console.log(socket.id +" leave")
        })
    })
}


module.exports = ChatController;