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

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, "public")));

const connections = [
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
];

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

    // Send game end info to all users in room
    socket.on("winner", (winValue) => {
      const user = getCurrentUser(socket.id);
      socket.to(user.room).emit("winData", winValue);
    });

    // Send diceroll to all users in room
    socket.on("roll", (rollValue) => {
      const user = getCurrentUser(socket.id);

      socket.to(user.room).emit("rollData", rollValue);
    });

    // Send move info to all users in room
    socket.on("move", (moveValue, direction, turn) => {
      const user = getCurrentUser(socket.id);

      socket.to(user.room).emit("moveData", moveValue, direction, turn);
    });

    // Send Snakes and ladders info to all users in room
    socket.on("SnL", (froms, tos, turn, newLeft, newTop) => {
      const user = getCurrentUser(socket.id);

      socket.to(user.room).emit("SnLData", froms, tos, turn, newLeft, newTop);
    });

    // Send lesson select to all users in room
    socket.on("startMes", (start, value) => {
      const user = getCurrentUser(socket.id);

      socket.to(user.room).emit("startData", start, value);
    });

    // Send voci infos to all users in room
    socket.on(
      "vociCheck1",
      (
        directon,
        qWord,
        ansBut,
        aWord,
        qWordValue,
        aWordValue,
        ansButValue,
        aWordValue1,
        aWordValue2,
        ansButValue2
      ) => {
        const user = getCurrentUser(socket.id);

        socket
          .to(user.room)
          .emit(
            "vociData1",
            directon,
            qWord,
            ansBut,
            aWord,
            qWordValue,
            aWordValue,
            ansButValue,
            aWordValue1,
            aWordValue2,
            ansButValue2
          );
      }
    );
    // Send answer on click of different box to all users in room
    socket.on("1.1", (ansButValue) => {
      const user = getCurrentUser(socket.id);

      socket.to(user.room).emit("1.1Data", ansButValue);
    });

    socket.on("1.2", (moveBonus) => {
      const user = getCurrentUser(socket.id);

      socket.to(user.room).emit("1.2Data", moveBonus);
    });

    socket.on("1.3", (moveBonus) => {
      const user = getCurrentUser(socket.id);

      socket.to(user.room).emit("1.3Data", moveBonus);
    });

    socket.on("2.1", (moveBonus) => {
      const user = getCurrentUser(socket.id);

      socket.to(user.room).emit("2.1Data", moveBonus);
    });

    socket.on("2.2", (moveBonus) => {
      const user = getCurrentUser(socket.id);

      socket.to(user.room).emit("2.2Data", moveBonus);
    });

    socket.on("2.3", (moveBonus) => {
      const user = getCurrentUser(socket.id);

      socket.to(user.room).emit("2.3Data", moveBonus);
    });

    socket.on("3.1", (moveBonus) => {
      const user = getCurrentUser(socket.id);

      socket.to(user.room).emit("3.1Data", moveBonus);
    });

    socket.on("3.2", (moveBonus) => {
      const user = getCurrentUser(socket.id);

      socket.to(user.room).emit("3.2Data", moveBonus);
    });

    socket.on("3.3", (moveBonus) => {
      const user = getCurrentUser(socket.id);

      socket.to(user.room).emit("3.3Data", moveBonus);
    });

    // Runs when client disconnects
    socket.on("disconnect", () => {
      const user = userLeave(socket.id);
      console.log("A Ws has disconnected...");
      console.log(`Player ${playerIndex} disconnected`);
      connections[playerIndex] = null;
      io.to(user.room).emit("refreshData", "refresh");

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
