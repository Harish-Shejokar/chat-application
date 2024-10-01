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
    res.send("hello.. its working")
})


const io = new Server(6001, {
    origin: 'http://localhost:3000',
    cors:true
})

io.on("connect",  (socket) => {
    console.log("new connecton", socket.id)
    socket.on("joined",({user})=>{
        console.log(`${user} has joined`);
        allUsers[socket.id] = user; 
        socket.broadcast.emit("userJoined", {user:`${allUsers[socket.id]}`, message:`joined-Chat`, id:allUsers[socket.id]});
    })

    socket.on("disconnect", () => {
        socket.broadcast.emit("leave",{user:"", message:`${allUsers[socket.id]} leave the chat`});
    })

    socket.on("message", ({message,id}) => {
        io.emit("sendMessage", {user : allUsers[id], message});
    })

})

const port = process.env.PORT || 4500;

// server.listen(port, ()=> console.log(`http server listen on port - ${port}`))