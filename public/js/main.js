let turn = "Blue";

document.getElementById("activeToken").innerHTML = "Your turn!";
document.getElementById("Red").style.marginLeft = "0vh";
document.getElementById("Red").style.marginTop = "0vh";
document.getElementById("Blue").style.marginLeft = "0vh";
document.getElementById("Blue").style.marginTop = "0vh";
let diceRoll = document.getElementById("diceRoll");
let stopEvent = false;

const socket = io();
let rollValue;

socket.on("rollData", (rollData) => {
  document.getElementById("rollOutput").value = rollData;
});
socket.on("buttonData", (buttonData) => {
  document.getElementById("diceRoll").disabled = false;
  document.getElementById("diceRoll").style.backgroundColor =
    "rgb(239, 235, 143)";
  document.getElementById("activeToken").innerHTML = "Your turn!";
  document.getElementById("activeToken").style.color = "blue";
});

socket.on("moveData", (moveData, direction, turn) => {
  turn = "Red";

  return new Promise(async (resolve, reject) => {
    if (direction == "up") {
      document.getElementById(`${turn}`).style.marginTop = moveData;
    } else if (direction == "right") {
      document.getElementById(`${turn}`).style.marginLeft = moveData;
    } else if (direction == "left") {
      document.getElementById(`${turn}`).style.marginLeft = moveData;
    }

    await new Promise((resolve) => setTimeout(resolve, 400));

    resolve();
  });
});

socket.on("SnLData", (froms, tos, turn, newLeft, newTop) => {
  let newNewLeft;
  let newNewTop;

  if (newLeft == null) {
  } else {
    console.log(newLeft, newTop);
    document.getElementById("Red").style.marginLeft = newLeft;
    document.getElementById("Red").style.marginTop = newTop;
  }
});

diceRoll.addEventListener("click", async (e) => {
  if ((clicked = true) && !stopEvent) {
    stopEvent = true;

    let rollValue = await roll();
    await new Promise((resolve) => setTimeout(resolve, 400));
    await run(rollValue);
    await new Promise((resolve) => setTimeout(resolve, 400));
    changeTurn();

    document.getElementById("diceRoll").disabled = true;
    if ((document.getElementById("diceRoll").disabled = true)) {
      document.getElementById("diceRoll").style.backgroundColor = "lightgrey";
      document.getElementById("activeToken").innerHTML = "Your opponents turn!";
      document.getElementById("activeToken").style.color = "red";
    }

    let buttonValue;
    socket.emit("buttonToggle", buttonValue);
    stopEvent = false;
  }
});

function changeTurn() {
  if (turn == "Blue") {
    turn = "Blue";
  } else if (turn == "Red") {
    turn = "Blue";
  }
}

function run(rollValue) {
  return new Promise(async (resolve, reject) => {
    for (i = 1; i <= rollValue; i++) {
      let direction = getDirection();
      await move(direction);
    }
    checkLaddersAndSnakes();

    resolve();
  });
}
let newLeft;
let newTop;
function checkLaddersAndSnakes() {
  return new Promise(async (resolve, reject) => {
    let froms = [
      [24, 0],
      [64, 0],
      [56, -16],
      [0, -24],
      [16, -48],
      [72, -56],
      [24, -8],
      [8, -24],
      [40, -48],
      [8, -72],
      [40, -72],
      [64, -64],
    ];
    let tos = [
      [48, -8],
      [72, -24],
      [24, -64],
      [8, -40],
      [0, -64],
      [72, -72],
      [48, 0],
      [16, -8],
      [16, -32],
      [16, -56],
      [40, -56],
      [40, -16],
    ];
    for (let i = 0; i < tos.length; i++) {
      if (marginLeft() == froms[i][0] && marginTop() == froms[i][1]) {
        newLeft = document.getElementById(
          `${turn}`
        ).style.marginLeft = `${tos[i][0]}vh`;
        newTop = document.getElementById(
          `${turn}`
        ).style.marginTop = `${tos[i][1]}vh`;
        socket.emit("SnL", froms, tos, turn, newLeft, newTop);
        await new Promise((resolve) => setTimeout(resolve, 400));
        break;
      }
    }

    resolve();
  });
}

let moveValue;

function move(direction) {
  return new Promise(async (resolve, reject) => {
    if (direction == "up") {
      moveValue = document.getElementById(`${turn}`).style.marginTop =
        String(marginTop() - 8) + "vh";
    } else if (direction == "right") {
      moveValue = document.getElementById(`${turn}`).style.marginLeft =
        String(marginLeft() + 8) + "vh";
    } else if (direction == "left") {
      moveValue = document.getElementById(`${turn}`).style.marginLeft =
        String(marginLeft() - 8) + "vh";
    }
    await new Promise((resolve) => setTimeout(resolve, 400));
    resolve();
    socket.emit("move", moveValue, direction, turn);
    socket.emit("order", moveValue);
  });
}

function getDirection() {
  let direction;
  if (
    (marginLeft() == 72 && ((marginTop() * 10) % (-16 * 10)) / 10 == 0) ||
    (marginLeft() == 0 && ((marginTop() * 10) % (-16 * 10)) / 10 != 0)
  ) {
    direction = "up";
  } else if (((marginTop() * 10) % (-16 * 10)) / 10 == 0) {
    direction = "right";
  } else {
    direction = "left";
  }

  return direction;
}

function marginLeft() {
  return Number(
    document.getElementById(`${turn}`).style.marginLeft.split("v")[0]
  );
}

function marginTop() {
  return Number(
    document.getElementById(`${turn}`).style.marginTop.split("v")[0]
  );
}

function roll() {
  return new Promise(async (resolve, reject) => {
    rollValue = Math.floor(Math.random() * 6) + 1;
    document.getElementById("rollOutput").value = rollValue;

    socket.emit("roll", rollValue);
    resolve(rollValue);
  });
}

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
