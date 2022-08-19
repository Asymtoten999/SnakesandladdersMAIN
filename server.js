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

const connections = [null, null];

// Run when client connects
io.on("connection", (socket) => {
  console.log("A new Ws has connected...");

  // Find an available player number
  let playerIndex = -1;
  for (const i in connections) {
    if (connections[i] === null) {
      playerIndex = i;
      break;
    }
  }
  if (playerIndex === -1) {
  } else {
    socket.on("joinRoom", ({ username, room }) => {
      const user = userJoin(socket.id, username, room);

      socket.join(user.room);

      // Send users and room info

      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    });

    // Tell the connecting client what player number they are
    socket.emit("player-number", playerIndex);

    console.log(`Player ${playerIndex} has connected`);

    // Ignore player 3
    if (playerIndex === -1) return;

    connections[playerIndex] = false;

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
    });

    socket.on("order", (moveValue) => {
      const user = getCurrentUser(socket.id);

      socket.to(user.room).emit("orderData", moveValue);
    });

    socket.on("buttonToggle", (buttonValue) => {
      const user = getCurrentUser(socket.id);

      socket.to(user.room).emit("buttonData", buttonValue);
    });

    socket.on("SnL", (froms, tos, turn, newLeft, newTop) => {
      const user = getCurrentUser(socket.id);

      socket.to(user.room).emit("SnLData", froms, tos, turn, newLeft, newTop);
    });

    socket.on("startMes", (start) => {
      const user = getCurrentUser(socket.id);

      socket.to(user.room).emit("startData", start);
    });

    // Runs when client disconnects
    socket.on("disconnect", () => {
      const user = userLeave(socket.id);
      console.log("A Ws has disconnected...");
      console.log(`Player ${playerIndex} disconnected`);
      connections[playerIndex] = null;

      // Send users and room info
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    });
  }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
