const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("./utils/users.js");
const { dir } = require("console");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, "public")));

// Run when client connects
io.on("connection", (socket) => {
  console.log("A new Ws has connected...");
  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    // Send users and room info
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  socket.on("roll", (rollValue) => {
    const user = getCurrentUser(socket.id);

    socket.to(user.room).emit("rollData", rollValue);
  });

  socket.on("turnValue", (turn) => {
    const user = getCurrentUser(socket.id);

    socket.to(user.room).emit("turnData", turn);
  });

  socket.on("move", (moveValue, direction, turn) => {
    const user = getCurrentUser(socket.id);

    socket.to(user.room).emit("moveData", moveValue, direction, turn);
    console.log(moveValue, direction, turn);
  });

  socket.on("directionValue", (direction) => {
    const user = getCurrentUser(socket.id);

    socket.to(user.room).emit("directionData", direction);
    console.log(direction);
  });

  // Runs when client disconnects
  socket.on("disconnect", () => {
    const user = userLeave(socket.id);
    console.log("A Ws has disconnected...");

    // Send users and room info
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
