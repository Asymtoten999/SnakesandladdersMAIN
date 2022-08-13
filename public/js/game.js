

// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});


const socket = io();

boxNumbers();

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

let rollValue;

document.getElementById("diceRoll").onclick = function () {
  rollValue = Math.floor(Math.random() * 6) + 1;

  document.getElementById("rollOutput").value = rollValue;
};

const roomName = document.getElementById("room-name");
const userList = document.getElementById("users");
const rollBut = document.getElementById("diceRoll");



rollBut.addEventListener("click", (e) => {
  const rndNumber = rollOutput.value;

  socket.emit("rollNumber", rndNumber);
});

function outputNumber(message) {
  const div = document.createElement("div");
  div.classList.add("numberWrap");
  div.innerHTML = `<p class="realOutput">
${message}
  </p>`;
  document.querySelector(".NNWrap").appendChild(div)
}






// Join chatroom
socket.emit("joinRoom", { username, room });

// Get room and users
socket.on("roomUsers", ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});