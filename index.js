require('dotenv').config() 
const http = require("http");
const express = require("express");
const {Server} = require("socket.io");
const cors = require("cors");
const mysql = require("./config/mysql");

const app = express();
mysql();

// app.use(cors());
// const server = http.createServer(app);

const allUsers = {};

app.get("/", (req,res) => {
    res.send("hello.. its working")
})


const io = new Server(6001, {
    origin: 'http://localhost:3000',
    cors:true
})

//chat-name space
const chatNameSpace = io.of("/chat");
   chatNameSpace.on("connection", (socket) => {
})

//default namespace
io.on("connect", (socket) => {
    
    const totalUserCount = (totalUsers) => {
        io.emit("totalUsers", { totalUsers });
    }

    const userSocketId = socket.id;
    socket.on("joined",({user})=>{
        allUsers[socket.id] = user; 
        console.log("new connecton", userSocketId)
        socket.broadcast.emit("userJoined", {user:`${allUsers[socket.id]}`, message:`joined-Chat`, id:userSocketId});
        io.emit("totalUsers", { totalUsers:Object.keys(allUsers).length });
    })

    socket.on("disconnect", () => {
        socket.broadcast.emit("leave", { user: "", message: `${allUsers[socket.id]} leave the chat` });
        totalUserCount(Object.keys(allUsers).length)
    })

    socket.on("message", ({message,id}) => {
        io.emit("sendMessage", {user : allUsers[id], message, id, singleTick:true});
    })

    console.log("============SocketIO Connected================");
})

const port = process.env.PORT || 4500;

// server.listen(port, ()=> console.log(`http server listen on port - ${port}`))