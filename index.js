require('dotenv').config() 
const http = require("http");
const express = require("express");
const {Server} = require("socket.io");
const cors = require("cors");

const app = express();

// app.use(cors());
// const server = http.createServer(app);

const allUsers = [{}];

app.get("/", (req,res) => {
    res.send("hell its working")
})

const io = new Server(6001, {
    origin: 'http://localhost:3000',
    cors:true
})

io.on("connection",  (socket) => {
    console.log("new connecton", socket.id)
    socket.on("joined",({user})=>{
        console.log(`${user} has joined`);
        allUsers[socket.id] = user; 
        socket.broadcast.emit("userJoined", {user:"Admin", message:`${allUsers[socket.id]} has joined`});
    })
})

const port = process.env.PORT || 4500;
