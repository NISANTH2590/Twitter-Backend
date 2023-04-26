const express = require("express");
const app = express();
const { Server } = require("socket.io");
const http = require("http");
const server = http.createServer(app);
const io = new Server(server);
const port = 5000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/socket_frontend.html");
});

io.on("connection", (socket) => {
  socket.on("send name", (username) => {
    io.emit("send name", username);
  });

  socket.on("send message", (chat) => {
    io.emit("send message", chat);
  });
});

server.listen(port, () => {
  console.log(`Server is listening at the port: ${port}`);
});

// // Require the necessary modules
// const express = require("express");
// const http = require("http");
// const socketIO = require("socket.io");

// // Create an instance of the express app
// const app = express();

// // Create a server using the express app
// const server = http.createServer(app);

// // Create a new instance of Socket.io and pass in the server instance
// const io = socketIO(server);

// app.get("/", function (req, res) {
//   res.sendFile(__dirname + "/socket_frontend.html");
// });

// io.on("connection", function (socket) {
//   console.log("ohj");
//   socket.on("user_join", function (data) {
//     this.username = data;
//     socket.broadcast.emit("user_join", data);
//   });

//   socket.on("chat_message", function (data) {
//     data.username = this.username;
//     socket.broadcast.emit("chat_message", data);
//   });

//   socket.on("disconnect", function (data) {
//     socket.broadcast.emit("user_leave", this.username);
//   });
// });

// server.listen(3000, function () {
//   console.log("Listening on *:" + 3000);
// });
