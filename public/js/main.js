let turn = "Blue";

document.getElementById("activeToken").innerHTML = "Your turn";
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
    if (turn == "Blue") {
      document.getElementById("activeToken").innerHTML = "Red's turn";
    } else if (turn == "Red") {
      document.getElementById("activeToken").innerHTML = "Blue's turn";
    }
    resolve();
  });
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
    let buttonValue;
    socket.emit("buttonToggle", buttonValue);
    stopEvent = false;
  }
});

function changeTurn() {
  if (turn == "Blue") {
    document.getElementById("activeToken").innerHTML = "Your turn";
    turn = "Blue";
  } else if (turn == "Red") {
    document.getElementById("activeToken").innerHTML = "Your opponents turn";
    turn = "Blue";
  }
}

function run(rollValue) {
  return new Promise(async (resolve, reject) => {
    for (i = 1; i <= rollValue; i++) {
      let direction = getDirection();
      await move(direction);
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
