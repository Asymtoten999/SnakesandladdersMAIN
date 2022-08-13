let turn = "red";
document.querySelector(".playerRed").style.marginLeft = "0vw";
document.querySelector(".playerRed").style.marginTop = "0vh";
document.querySelector(".playerBlue").style.marginLeft = "0vw";
document.querySelector(".playerBlue").style.marginTop = "0vh";

function marginLeft() {
  return Number(
    document.querySelector(`.${turn}.`).style.marginLeft.split("v")[0]
  );
}
function marginTop() {
  return Number(
    document.querySelector(`.${turn}.`).style.marginTop.split("v")[0]
  );
}
const socket = io();
let rollValue;
socket.on("data", (data) => {
  document.getElementById("rollOutput").value = data;
});

document.getElementById("diceRoll").onclick = function roll() {
  rollValue = Math.floor(Math.random() * 6) + 1;

  document.getElementById("rollOutput").value = rollValue;
  socket.emit("roll", rollValue);
};

function boxNumbers() {
  let boxes = document.querySelectorAll(".box");
  boxes.forEach((box, i) => {
    if (
      String(i).length == 1 ||
      (String(i).length == 2 && Number(String(i)[0])) % 2 == 0
    ) {
      box.innerHTML = `${100 - i}`;
    } else {
      box.innerHTML = String(
        Number(`${9 - Number(String(i)[0])}${String(i)[1]}`) + 1
      );
    }
  });
}

const roomName = document.getElementById("room-name");
const userList = document.getElementById("users");

// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

boxNumbers();

// Join chatroom
socket.emit("joinRoom", { username, room });

// Get room and users
socket.on("roomUsers", ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

// Add room name to DOM
function outputRoomName(room) {
  roomName.value = room;
}

// Add users to DOM
function outputUsers(users) {
  userList.innerHTML = "";
  users.forEach((user) => {
    const li = document.createElement("li");
    li.innerText = user.username;
    userList.appendChild(li);
  });
}
