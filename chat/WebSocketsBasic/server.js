const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("New client connected");

  // Handle new user connection
  socket.on("new user", (username) => {
    socket.username = username;
    io.emit("message", `${username} has joined the chat`);
  });

  // Handle incoming messages
  socket.on("message", (message) => {
    io.emit("message", `${socket.username}: ${message}`);
  });

  socket.on("disconnect", () => {
    io.emit("message", `${socket.username} has left the chat`);
    console.log("Client disconnected");
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
