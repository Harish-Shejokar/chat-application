const http = require("http");
const express = require("express");
const socketIO = require("socket.io");
const cors = require("cors");
require('dotenv').config() 

const app = express();

app.use(cors());
const server = http.createServer(app);



app.get("/", (req,res) => {
    res.send("hell its working")
})

const io = socketIO(server);

io.on("connection", async () => {
    console.log("new connecton")
})


const port = 4500 || process.env.PORT;

server.listen(port, () => console.log(`server running on PORT - ${port}`));