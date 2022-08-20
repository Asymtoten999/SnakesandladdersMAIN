let turn = "Blue";

document.getElementById("activeToken").innerHTML = "Your opponents turn!";
document.getElementById("Red").style.marginLeft = "0vh";
document.getElementById("Red").style.marginTop = "0vh";
document.getElementById("Blue").style.marginLeft = "0vh";
document.getElementById("Blue").style.marginTop = "0vh";
let diceRoll = document.getElementById("diceRoll");
let startBut = document.getElementById("startBut");

let stopEvent = false;
let playerNum = 0;

const socket = io();
let rollValue;

// Get your player number
socket.on("player-number", (num) => {
  console.log(num);
  if (num === -1) {
    document.getElementById("startBut").style.display = "none";
    document.getElementById("lecSelect").style.display = "none";
  } else {
    document.getElementById("foreground").style.display = "none";

    playerNum = parseInt(num);
    if (playerNum === 1) {
      document.getElementById("startBut").style.display = "none";
      document.getElementById("lecSelect").style.display = "none";
      console.log(playerNum);
    }
  }
  console.log(num);
});

socket.on("startData", (startData) => {});

socket.on("rollData", (rollData) => {
  document.getElementById("rollOutput").value = rollData;
});
socket.on("buttonData", (buttonData) => {});

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

socket.on(
  "vociData1",
  (
    direction,
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
    function marginLeft() {
      return Number(
        document.getElementById("Red").style.marginLeft.split("v")[0]
      );
    }

    function marginTop() {
      return Number(
        document.getElementById("Red").style.marginTop.split("v")[0]
      );
    }

    console.log("GOT IT");
    document.getElementById("voci").style.display = "inherit";
    document.getElementById("ans1").style.display = "inherit";
    document.getElementById("ans2").style.display = "inherit";
    document.getElementById("ans3").style.display = "inherit";
    document.getElementById("voci").innerHTML = qWordValue;
    document.getElementById("ans1").disabled = true;
    document.getElementById("ans2").disabled = true;
    document.getElementById("ans3").disabled = true;

    if (ansButValue == "box1") {
      document.getElementById("ans1").innerHTML = aWordValue;
      socket.on("1.1Data", async (ansButValue) => {
        document.getElementById("ans1").style.backgroundColor = "green";
        document.getElementById("ans2").style.backgroundColor = "red";
        document.getElementById("ans3").style.backgroundColor = "red";
        document.getElementById("grade").style.color = "green";
        document.getElementById("grade").style.display = "inherit";
        document.getElementById("grade").innerHTML = "Correct!";
        await new Promise((resolve) => setTimeout(resolve, 3000));

        document.getElementById("voci").style.display = "none";
        document.getElementById("ans1").style.display = "none";
        document.getElementById("ans2").style.display = "none";
        document.getElementById("ans3").style.display = "none";
        document.getElementById("grade").style.display = "none";
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return new Promise(async (resolve, reject) => {
          if (direction == "up") {
            document.getElementById("Red").style.marginTop =
              String(marginTop() - 8) + "vh";
          } else if (direction == "right") {
            document.getElementById("Red").style.marginLeft =
              String(marginLeft() + 8) + "vh";
          } else if (direction == "left") {
            document.getElementById("Red").style.marginLeft =
              String(marginLeft() - 8) + "vh";
          }
          await new Promise((resolve) => setTimeout(resolve, 400));
          resolve();
          document.getElementById("ans1").disabled = "false";
          document.getElementById("ans2").disabled = "false";
          document.getElementById("ans3").disabled = "false";
          document.getElementById("ans1").style.backgroundColor =
            "lightskyblue";
          document.getElementById("ans2").style.backgroundColor =
            "lightskyblue";
          document.getElementById("ans3").style.backgroundColor =
            "lightskyblue";
          document.getElementById("diceRoll").disabled = false;
          document.getElementById("diceRoll").style.backgroundColor =
            "rgb(239, 235, 143)";
          document.getElementById("activeToken").innerHTML = "Your turn!";
          document.getElementById("activeToken").style.color = "blue";
        });
      });
      socket.on("1.2Data", async (ansButValue) => {
        console.log(moveBonus);
        document.getElementById("ans1").style.backgroundColor = "green";
        document.getElementById("ans2").style.backgroundColor = "red";
        document.getElementById("ans3").style.backgroundColor = "red";
        document.getElementById("grade").style.color = "red";
        document.getElementById("grade").style.display = "inherit";
        document.getElementById("grade").innerHTML = "Wrong!";
        await new Promise((resolve) => setTimeout(resolve, 3000));

        document.getElementById("voci").style.display = "none";
        document.getElementById("ans1").style.display = "none";
        document.getElementById("ans2").style.display = "none";
        document.getElementById("ans3").style.display = "none";
        document.getElementById("grade").style.display = "none";
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return new Promise(async (resolve, reject) => {
          if (direction == "up") {
            document.getElementById("Red").style.marginTop =
              String(marginTop() + 8) + "vh";
          } else if (direction == "right") {
            document.getElementById("Red").style.marginLeft =
              String(marginLeft() - 8) + "vh";
          } else if (direction == "left") {
            document.getElementById("Red").style.marginLeft =
              String(marginLeft() + 8) + "vh";
          }
          await new Promise((resolve) => setTimeout(resolve, 400));
          resolve();
          document.getElementById("ans1").disabled = "false";
          document.getElementById("ans2").disabled = "false";
          document.getElementById("ans3").disabled = "false";
          document.getElementById("ans1").style.backgroundColor =
            "lightskyblue";
          document.getElementById("ans2").style.backgroundColor =
            "lightskyblue";
          document.getElementById("ans3").style.backgroundColor =
            "lightskyblue";
          document.getElementById("diceRoll").disabled = false;
          document.getElementById("diceRoll").style.backgroundColor =
            "rgb(239, 235, 143)";
          document.getElementById("activeToken").innerHTML = "Your turn!";
          document.getElementById("activeToken").style.color = "blue";
        });
      });
      socket.on("1.3Data", async (ansButValue) => {
        console.log(moveBonus);
        document.getElementById("ans1").style.backgroundColor = "green";
        document.getElementById("ans2").style.backgroundColor = "red";
        document.getElementById("ans3").style.backgroundColor = "red";
        document.getElementById("grade").style.color = "red";
        document.getElementById("grade").style.display = "inherit";
        document.getElementById("grade").innerHTML = "Wrong!";
        await new Promise((resolve) => setTimeout(resolve, 3000));

        document.getElementById("voci").style.display = "none";
        document.getElementById("ans1").style.display = "none";
        document.getElementById("ans2").style.display = "none";
        document.getElementById("ans3").style.display = "none";
        document.getElementById("grade").style.display = "none";
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return new Promise(async (resolve, reject) => {
          if (direction == "up") {
            document.getElementById("Red").style.marginTop =
              String(marginTop() + 8) + "vh";
          } else if (direction == "right") {
            document.getElementById("Red").style.marginLeft =
              String(marginLeft() - 8) + "vh";
          } else if (direction == "left") {
            document.getElementById("Red").style.marginLeft =
              String(marginLeft() + 8) + "vh";
          }
          await new Promise((resolve) => setTimeout(resolve, 400));
          resolve();
          document.getElementById("ans1").disabled = "false";
          document.getElementById("ans2").disabled = "false";
          document.getElementById("ans3").disabled = "false";
          document.getElementById("ans1").style.backgroundColor =
            "lightskyblue";
          document.getElementById("ans2").style.backgroundColor =
            "lightskyblue";
          document.getElementById("ans3").style.backgroundColor =
            "lightskyblue";
          document.getElementById("diceRoll").disabled = false;
          document.getElementById("diceRoll").style.backgroundColor =
            "rgb(239, 235, 143)";
          document.getElementById("activeToken").innerHTML = "Your turn!";
          document.getElementById("activeToken").style.color = "blue";
        });
      });

      if (ansButValue2 == "box2") {
        document.getElementById("ans2").innerHTML = aWordValue1;

        document.getElementById("ans3").innerHTML = aWordValue2;
      } else if (ansButValue2 == "box3") {
        document.getElementById("ans3").innerHTML = aWordValue1;

        document.getElementById("ans2").innerHTML = aWordValue2;
      }
    } else if (ansButValue == "box2") {
      document.getElementById("ans2").innerHTML = aWordValue;
      socket.on("2.1Data", async (ansButValue) => {
        console.log(moveBonus);
        document.getElementById("ans1").style.backgroundColor = "red";
        document.getElementById("ans2").style.backgroundColor = "green";
        document.getElementById("ans3").style.backgroundColor = "red";
        document.getElementById("grade").style.color = "red";
        document.getElementById("grade").style.display = "inherit";
        document.getElementById("grade").innerHTML = "Wrong!";
        await new Promise((resolve) => setTimeout(resolve, 3000));

        document.getElementById("voci").style.display = "none";
        document.getElementById("ans1").style.display = "none";
        document.getElementById("ans2").style.display = "none";
        document.getElementById("ans3").style.display = "none";
        document.getElementById("grade").style.display = "none";
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return new Promise(async (resolve, reject) => {
          if (direction == "up") {
            document.getElementById("Red").style.marginTop =
              String(marginTop() + 8) + "vh";
          } else if (direction == "right") {
            document.getElementById("Red").style.marginLeft =
              String(marginLeft() - 8) + "vh";
          } else if (direction == "left") {
            document.getElementById("Red").style.marginLeft =
              String(marginLeft() + 8) + "vh";
          }
          await new Promise((resolve) => setTimeout(resolve, 400));
          resolve();
          document.getElementById("ans1").disabled = "false";
          document.getElementById("ans2").disabled = "false";
          document.getElementById("ans3").disabled = "false";
          document.getElementById("ans1").style.backgroundColor =
            "lightskyblue";
          document.getElementById("ans2").style.backgroundColor =
            "lightskyblue";
          document.getElementById("ans3").style.backgroundColor =
            "lightskyblue";
          document.getElementById("diceRoll").disabled = false;
          document.getElementById("diceRoll").style.backgroundColor =
            "rgb(239, 235, 143)";
          document.getElementById("activeToken").innerHTML = "Your turn!";
          document.getElementById("activeToken").style.color = "blue";
        });
      });
      socket.on("2.2Data", async (ansButValue) => {
        console.log(moveBonus);
        document.getElementById("ans1").style.backgroundColor = "red";
        document.getElementById("ans2").style.backgroundColor = "green";
        document.getElementById("ans3").style.backgroundColor = "red";
        document.getElementById("grade").style.color = "green";
        document.getElementById("grade").style.display = "inherit";
        document.getElementById("grade").innerHTML = "Correct!";
        await new Promise((resolve) => setTimeout(resolve, 3000));

        document.getElementById("voci").style.display = "none";
        document.getElementById("ans1").style.display = "none";
        document.getElementById("ans2").style.display = "none";
        document.getElementById("ans3").style.display = "none";
        document.getElementById("grade").style.display = "none";
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return new Promise(async (resolve, reject) => {
          if (direction == "up") {
            document.getElementById("Red").style.marginTop =
              String(marginTop() - 8) + "vh";
          } else if (direction == "right") {
            document.getElementById("Red").style.marginLeft =
              String(marginLeft() + 8) + "vh";
          } else if (direction == "left") {
            document.getElementById("Red").style.marginLeft =
              String(marginLeft() - 8) + "vh";
          }
          await new Promise((resolve) => setTimeout(resolve, 400));
          resolve();
          document.getElementById("ans1").disabled = "false";
          document.getElementById("ans2").disabled = "false";
          document.getElementById("ans3").disabled = "false";
          document.getElementById("ans1").style.backgroundColor =
            "lightskyblue";
          document.getElementById("ans2").style.backgroundColor =
            "lightskyblue";
          document.getElementById("ans3").style.backgroundColor =
            "lightskyblue";
          document.getElementById("diceRoll").disabled = false;
          document.getElementById("diceRoll").style.backgroundColor =
            "rgb(239, 235, 143)";
          document.getElementById("activeToken").innerHTML = "Your turn!";
          document.getElementById("activeToken").style.color = "blue";
        });
      });
      socket.on("2.3Data", async (ansButValue) => {
        console.log(moveBonus);
        document.getElementById("ans1").style.backgroundColor = "red";
        document.getElementById("ans2").style.backgroundColor = "green";
        document.getElementById("ans3").style.backgroundColor = "red";
        document.getElementById("grade").style.color = "red";
        document.getElementById("grade").style.display = "inherit";
        document.getElementById("grade").innerHTML = "Wrong!";
        await new Promise((resolve) => setTimeout(resolve, 3000));

        document.getElementById("voci").style.display = "none";
        document.getElementById("ans1").style.display = "none";
        document.getElementById("ans2").style.display = "none";
        document.getElementById("ans3").style.display = "none";
        document.getElementById("grade").style.display = "none";
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return new Promise(async (resolve, reject) => {
          if (direction == "up") {
            document.getElementById("Red").style.marginTop =
              String(marginTop() + 8) + "vh";
          } else if (direction == "right") {
            document.getElementById("Red").style.marginLeft =
              String(marginLeft() - 8) + "vh";
          } else if (direction == "left") {
            document.getElementById("Red").style.marginLeft =
              String(marginLeft() + 8) + "vh";
          }
          await new Promise((resolve) => setTimeout(resolve, 400));
          resolve();
          document.getElementById("ans1").disabled = "false";
          document.getElementById("ans2").disabled = "false";
          document.getElementById("ans3").disabled = "false";
          document.getElementById("ans1").style.backgroundColor =
            "lightskyblue";
          document.getElementById("ans2").style.backgroundColor =
            "lightskyblue";
          document.getElementById("ans3").style.backgroundColor =
            "lightskyblue";
          document.getElementById("diceRoll").disabled = false;
          document.getElementById("diceRoll").style.backgroundColor =
            "rgb(239, 235, 143)";
          document.getElementById("activeToken").innerHTML = "Your turn!";
          document.getElementById("activeToken").style.color = "blue";
        });
      });

      if (ansButValue2 == "box1") {
        document.getElementById("ans1").innerHTML = aWordValue1;

        document.getElementById("ans3").innerHTML = aWordValue2;
      } else if (ansButValue2 == "box3") {
        document.getElementById("ans3").innerHTML = aWordValue1;

        document.getElementById("ans1").innerHTML = aWordValue2;
      }
    } else if (ansButValue == "box3") {
      document.getElementById("ans3").innerHTML = aWordValue;
      socket.on("3.1Data", async (ansButValue) => {
        console.log(moveBonus);
        document.getElementById("ans1").style.backgroundColor = "red";
        document.getElementById("ans2").style.backgroundColor = "red";
        document.getElementById("ans3").style.backgroundColor = "green";
        document.getElementById("grade").style.color = "red";
        document.getElementById("grade").style.display = "inherit";
        document.getElementById("grade").innerHTML = "Wrong!";
        await new Promise((resolve) => setTimeout(resolve, 3000));

        document.getElementById("voci").style.display = "none";
        document.getElementById("ans1").style.display = "none";
        document.getElementById("ans2").style.display = "none";
        document.getElementById("ans3").style.display = "none";
        document.getElementById("grade").style.display = "none";
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return new Promise(async (resolve, reject) => {
          if (direction == "up") {
            document.getElementById("Red").style.marginTop =
              String(marginTop() + 8) + "vh";
          } else if (direction == "right") {
            document.getElementById("Red").style.marginLeft =
              String(marginLeft() - 8) + "vh";
          } else if (direction == "left") {
            document.getElementById("Red").style.marginLeft =
              String(marginLeft() + 8) + "vh";
          }
          await new Promise((resolve) => setTimeout(resolve, 400));
          resolve();
          document.getElementById("ans1").disabled = "false";
          document.getElementById("ans2").disabled = "false";
          document.getElementById("ans3").disabled = "false";
          document.getElementById("ans1").style.backgroundColor =
            "lightskyblue";
          document.getElementById("ans2").style.backgroundColor =
            "lightskyblue";
          document.getElementById("ans3").style.backgroundColor =
            "lightskyblue";
          document.getElementById("diceRoll").disabled = false;
          document.getElementById("diceRoll").style.backgroundColor =
            "rgb(239, 235, 143)";
          document.getElementById("activeToken").innerHTML = "Your turn!";
          document.getElementById("activeToken").style.color = "blue";
        });
      });
      socket.on("3.2Data", async (ansButValue) => {
        console.log(moveBonus);
        document.getElementById("ans1").style.backgroundColor = "red";
        document.getElementById("ans2").style.backgroundColor = "red";
        document.getElementById("ans3").style.backgroundColor = "green";
        document.getElementById("grade").style.color = "red";
        document.getElementById("grade").style.display = "inherit";
        document.getElementById("grade").innerHTML = "Wrong!";
        await new Promise((resolve) => setTimeout(resolve, 3000));

        document.getElementById("voci").style.display = "none";
        document.getElementById("ans1").style.display = "none";
        document.getElementById("ans2").style.display = "none";
        document.getElementById("ans3").style.display = "none";
        document.getElementById("grade").style.display = "none";
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return new Promise(async (resolve, reject) => {
          if (direction == "up") {
            document.getElementById("Red").style.marginTop =
              String(marginTop() + 8) + "vh";
          } else if (direction == "right") {
            document.getElementById("Red").style.marginLeft =
              String(marginLeft() - 8) + "vh";
          } else if (direction == "left") {
            document.getElementById("Red").style.marginLeft =
              String(marginLeft() + 8) + "vh";
          }
          await new Promise((resolve) => setTimeout(resolve, 400));
          resolve();
          document.getElementById("ans1").disabled = "false";
          document.getElementById("ans2").disabled = "false";
          document.getElementById("ans3").disabled = "false";
          document.getElementById("ans1").style.backgroundColor =
            "lightskyblue";
          document.getElementById("ans2").style.backgroundColor =
            "lightskyblue";
          document.getElementById("ans3").style.backgroundColor =
            "lightskyblue";
          document.getElementById("diceRoll").disabled = false;
          document.getElementById("diceRoll").style.backgroundColor =
            "rgb(239, 235, 143)";
          document.getElementById("activeToken").innerHTML = "Your turn!";
          document.getElementById("activeToken").style.color = "blue";
        });
      });
      socket.on("3.3Data", async (ansButValue) => {
        document.getElementById("ans1").style.backgroundColor = "red";
        document.getElementById("ans2").style.backgroundColor = "red";
        document.getElementById("ans3").style.backgroundColor = "green";
        document.getElementById("grade").style.color = "green";
        document.getElementById("grade").style.display = "inherit";
        document.getElementById("grade").innerHTML = "Correct!";
        await new Promise((resolve) => setTimeout(resolve, 3000));

        document.getElementById("voci").style.display = "none";
        document.getElementById("ans1").style.display = "none";
        document.getElementById("ans2").style.display = "none";
        document.getElementById("ans3").style.display = "none";
        document.getElementById("grade").style.display = "none";
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return new Promise(async (resolve, reject) => {
          if (direction == "up") {
            document.getElementById("Red").style.marginTop =
              String(marginTop() - 8) + "vh";
          } else if (direction == "right") {
            document.getElementById("Red").style.marginLeft =
              String(marginLeft() + 8) + "vh";
          } else if (direction == "left") {
            document.getElementById("Red  ").style.marginLeft =
              String(marginLeft() - 8) + "vh";
          }
          await new Promise((resolve) => setTimeout(resolve, 400));
          resolve();
          document.getElementById("ans1").disabled = "false";
          document.getElementById("ans2").disabled = "false";
          document.getElementById("ans3").disabled = "false";
          document.getElementById("ans1").style.backgroundColor =
            "lightskyblue";
          document.getElementById("ans2").style.backgroundColor =
            "lightskyblue";
          document.getElementById("ans3").style.backgroundColor =
            "lightskyblue";
          document.getElementById("diceRoll").disabled = false;
          document.getElementById("diceRoll").style.backgroundColor =
            "rgb(239, 235, 143)";
          document.getElementById("activeToken").innerHTML = "Your turn!";
          document.getElementById("activeToken").style.color = "blue";
        });
      });

      if (ansButValue2 == "box1") {
        document.getElementById("ans1").innerHTML = aWordValue1;

        document.getElementById("ans2").innerHTML = aWordValue2;
      } else if (ansButValue2 == "box2") {
        document.getElementById("ans2").innerHTML = aWordValue1;

        document.getElementById("ans1").innerHTML = aWordValue2;
      }
    }
  }
);

let start;
startBut.addEventListener("click", function () {
  socket.emit("startMes", start);
  startBut.style.display = "none";
  document.getElementById("lecSelect").style.display = "none";
  document.getElementById("diceRoll").disabled = false;
  document.getElementById("diceRoll").style.backgroundColor =
    "rgb(239, 235, 143)";
  document.getElementById("activeToken").innerHTML = "Your turn!";
  document.getElementById("activeToken").style.color = "blue";
});

diceRoll.addEventListener("click", async (e) => {
  if ((clicked = true) && !stopEvent) {
    stopEvent = true;

    document.getElementById("ans1").disabled = false;
    document.getElementById("ans2").disabled = false;
    document.getElementById("ans3").disabled = false;
    document.getElementById("ans1").style.backgroundColor = "lightskyblue";
    document.getElementById("ans2").style.backgroundColor = "lightskyblue";
    document.getElementById("ans3").style.backgroundColor = "lightskyblue";
    let rollValue = await roll();
    await new Promise((resolve) => setTimeout(resolve, 400));
    await run(rollValue);
    await new Promise((resolve) => setTimeout(resolve, 400));
    changeTurn();

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
    await new Promise((resolve) => setTimeout(resolve, 800));
    vociCheck();

    resolve();
  });
}

let moveBonus;

function vociCheck() {
  document.getElementById("voci").style.display = "inherit";
  document.getElementById("ans1").style.display = "inherit";
  document.getElementById("ans2").style.display = "inherit";
  document.getElementById("ans3").style.display = "inherit";
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

  var qWord = ["French 1", "French 2", "French 3", "French 4", "French 5"];
  var ansBut = ["box1", "box2", "box3"];
  var aWord = ["German 1", "German 2", "German 3", "German 4", "German 5"];

  qWordValue = qWord[Math.floor(Math.random() * qWord.length)];
  document.getElementById("voci").innerHTML = qWordValue;
  vociIndex = qWord.indexOf(qWordValue);

  aWordValue = aWord[vociIndex];
  console.log(aWordValue);

  ansButValue = ansBut[Math.floor(Math.random() * ansBut.length)];

  if (ansButValue == "box1") {
    document.getElementById("ans1").innerHTML = aWordValue;
    document
      .getElementById("ans1")
      .addEventListener("click", async function () {
        socket.emit("1.1", ansButValue);
        document.getElementById("ans1").style.backgroundColor = "green";
        document.getElementById("ans2").style.backgroundColor = "red";
        document.getElementById("ans3").style.backgroundColor = "red";
        document.getElementById("ans1").disabled = true;
        document.getElementById("ans2").disabled = true;
        document.getElementById("ans3").disabled = true;
        document.getElementById("grade").style.color = "green";
        document.getElementById("grade").style.display = "inherit";
        document.getElementById("grade").innerHTML = "Correct!";
        await new Promise((resolve) => setTimeout(resolve, 3000));
        document.getElementById("voci").style.display = "none";
        document.getElementById("ans1").style.display = "none";
        document.getElementById("ans2").style.display = "none";
        document.getElementById("ans3").style.display = "none";
        document.getElementById("grade").style.display = "none";
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return new Promise(async (resolve, reject) => {
          if (direction == "up") {
            moveBonus = document.getElementById("Blue").style.marginTop =
              String(marginTop() - 8) + "vh";
          } else if (direction == "right") {
            moveBonus = document.getElementById("Blue").style.marginLeft =
              String(marginLeft() + 8) + "vh";
          } else if (direction == "left") {
            moveBonus = document.getElementById("Blue").style.marginLeft =
              String(marginLeft() - 8) + "vh";
          }
          console.log(moveBonus);
          socket.emit("1.1Margin", moveBonus);

          await new Promise((resolve) => setTimeout(resolve, 400));
          resolve();
          document.getElementById("ans1").disabled = true;
          document.getElementById("ans2").disabled = true;
          document.getElementById("ans3").disabled = true;
          document.getElementById("ans1").style.backgroundColor =
            "lightskyblue";
          document.getElementById("ans2").style.backgroundColor =
            "lightskyblue";
          document.getElementById("ans3").style.backgroundColor =
            "lightskyblue";
          document.getElementById("diceRoll").disabled = true;
          if ((document.getElementById("diceRoll").disabled = true)) {
            document.getElementById("diceRoll").style.backgroundColor =
              "lightgrey";
            document.getElementById("activeToken").innerHTML =
              "Your opponents turn!";
            document.getElementById("activeToken").style.color = "red";
          }
        });
      });
    document
      .getElementById("ans2")
      .addEventListener("click", async function () {
        socket.emit("1.2", ansButValue);
        document.getElementById("ans1").style.backgroundColor = "green";
        document.getElementById("ans2").style.backgroundColor = "red";
        document.getElementById("ans3").style.backgroundColor = "red";
        document.getElementById("ans1").disabled = true;
        document.getElementById("ans2").disabled = true;
        document.getElementById("ans3").disabled = true;
        document.getElementById("grade").style.color = "red";
        document.getElementById("grade").style.display = "inherit";
        document.getElementById("grade").innerHTML = "Wrong!";
        await new Promise((resolve) => setTimeout(resolve, 3000));
        document.getElementById("voci").style.display = "none";
        document.getElementById("ans1").style.display = "none";
        document.getElementById("ans2").style.display = "none";
        document.getElementById("ans3").style.display = "none";
        document.getElementById("grade").style.display = "none";
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log(document.getElementById("Blue").style.marginLeft);

        return new Promise(async (resolve, reject) => {
          if (direction == "up") {
            moveBonus = document.getElementById("Blue").style.marginTop =
              String(marginTop() + 8) + "vh";
          } else if (direction == "right") {
            moveBonus = document.getElementById("Blue").style.marginLeft =
              String(marginLeft() - 8) + "vh";
          } else if (direction == "left") {
            moveBonus = document.getElementById("Blue").style.marginLeft =
              String(marginLeft() + 8) + "vh";
          }
          console.log(moveBonus);
          socket.emit("1.2Margin", moveBonus);

          await new Promise((resolve) => setTimeout(resolve, 400));
          resolve();
          document.getElementById("ans1").disabled = true;
          document.getElementById("ans2").disabled = true;
          document.getElementById("ans3").disabled = true;
          document.getElementById("ans1").style.backgroundColor =
            "lightskyblue";
          document.getElementById("ans2").style.backgroundColor =
            "lightskyblue";
          document.getElementById("ans3").style.backgroundColor =
            "lightskyblue";
          document.getElementById("diceRoll").disabled = true;
          if ((document.getElementById("diceRoll").disabled = true)) {
            document.getElementById("diceRoll").style.backgroundColor =
              "lightgrey";
            document.getElementById("activeToken").innerHTML =
              "Your opponents turn!";
            document.getElementById("activeToken").style.color = "red";
          }
        });
      });
    document
      .getElementById("ans3")
      .addEventListener("click", async function () {
        socket.emit("1.3", ansButValue);
        document.getElementById("ans1").style.backgroundColor = "green";
        document.getElementById("ans2").style.backgroundColor = "red";
        document.getElementById("ans3").style.backgroundColor = "red";
        document.getElementById("ans1").disabled = true;
        document.getElementById("ans2").disabled = true;
        document.getElementById("ans3").disabled = true;
        document.getElementById("grade").style.color = "red";
        document.getElementById("grade").style.display = "inherit";
        document.getElementById("grade").innerHTML = "Wrong!";
        await new Promise((resolve) => setTimeout(resolve, 3000));
        document.getElementById("voci").style.display = "none";
        document.getElementById("ans1").style.display = "none";
        document.getElementById("ans2").style.display = "none";
        document.getElementById("ans3").style.display = "none";
        document.getElementById("grade").style.display = "none";
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log(document.getElementById("Blue").style.marginLeft);
        return new Promise(async (resolve, reject) => {
          if (direction == "up") {
            moveBonus = document.getElementById("Blue").style.marginTop =
              String(marginTop() + 8) + "vh";
          } else if (direction == "right") {
            moveBonus = document.getElementById("Blue").style.marginLeft =
              String(marginLeft() - 8) + "vh";
          } else if (direction == "left") {
            moveBonus = document.getElementById("Blue").style.marginLeft =
              String(marginLeft() + 8) + "vh";
          }
          console.log(moveBonus);
          socket.emit("1.3Margin", moveBonus);

          await new Promise((resolve) => setTimeout(resolve, 400));
          resolve();
          document.getElementById("ans1").disabled = true;
          document.getElementById("ans2").disabled = true;
          document.getElementById("ans3").disabled = true;
          document.getElementById("ans1").style.backgroundColor =
            "lightskyblue";
          document.getElementById("ans2").style.backgroundColor =
            "lightskyblue";
          document.getElementById("ans3").style.backgroundColor =
            "lightskyblue";
          document.getElementById("diceRoll").disabled = true;
          if ((document.getElementById("diceRoll").disabled = true)) {
            document.getElementById("diceRoll").style.backgroundColor =
              "lightgrey";
            document.getElementById("activeToken").innerHTML =
              "Your opponents turn!";
            document.getElementById("activeToken").style.color = "red";
          }
        });
      });
    for (var i = 0; i < aWord.length; i++) {
      if (aWord[i] === aWordValue) {
        aWord.splice(i, 1);
      }
    }
    aWordValue1 = aWord[Math.floor(Math.random() * aWord.length)];
    var ansBut2 = ["box2", "box3"];
    ansButValue2 = ansBut2[Math.floor(Math.random() * ansBut2.length)];
    if (ansButValue2 == "box2") {
      document.getElementById("ans2").innerHTML = aWordValue1;

      for (var i = 0; i < aWord.length; i++) {
        if (aWord[i] === aWordValue1) {
          aWord.splice(i, 1);
        }
      }
      aWordValue2 = aWord[Math.floor(Math.random() * aWord.length)];
      document.getElementById("ans3").innerHTML = aWordValue2;
    } else if (ansButValue2 == "box3") {
      document.getElementById("ans3").innerHTML = aWordValue1;

      for (var i = 0; i < aWord.length; i++) {
        if (aWord[i] === aWordValue1) {
          aWord.splice(i, 1);
        }
      }
      aWordValue2 = aWord[Math.floor(Math.random() * aWord.length)];
      document.getElementById("ans2").innerHTML = aWordValue2;
    }
  } else if (ansButValue == "box2") {
    document.getElementById("ans2").innerHTML = aWordValue;
    document
      .getElementById("ans1")
      .addEventListener("click", async function () {
        socket.emit("2.1", ansButValue);
        document.getElementById("ans1").style.backgroundColor = "red";
        document.getElementById("ans2").style.backgroundColor = "green";
        document.getElementById("ans3").style.backgroundColor = "red";
        document.getElementById("ans1").disabled = true;
        document.getElementById("ans2").disabled = true;
        document.getElementById("ans3").disabled = true;
        document.getElementById("grade").style.color = "red";
        document.getElementById("grade").style.display = "inherit";
        document.getElementById("grade").innerHTML = "Wrong!";
        await new Promise((resolve) => setTimeout(resolve, 3000));
        document.getElementById("voci").style.display = "none";
        document.getElementById("ans1").style.display = "none";
        document.getElementById("ans2").style.display = "none";
        document.getElementById("ans3").style.display = "none";
        document.getElementById("grade").style.display = "none";
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return new Promise(async (resolve, reject) => {
          if (direction == "up") {
            moveBonus = document.getElementById("Blue").style.marginTop =
              String(marginTop() + 8) + "vh";
          } else if (direction == "right") {
            moveBonus = document.getElementById("Blue").style.marginLeft =
              String(marginLeft() - 8) + "vh";
          } else if (direction == "left") {
            moveBonus = document.getElementById("Blue").style.marginLeft =
              String(marginLeft() + 8) + "vh";
          }
          console.log(moveBonus);
          socket.emit("2.1Margin", moveBonus);

          await new Promise((resolve) => setTimeout(resolve, 400));
          resolve();
          document.getElementById("ans1").disabled = true;
          document.getElementById("ans2").disabled = true;
          document.getElementById("ans3").disabled = true;
          document.getElementById("ans1").style.backgroundColor =
            "lightskyblue";
          document.getElementById("ans2").style.backgroundColor =
            "lightskyblue";
          document.getElementById("ans3").style.backgroundColor =
            "lightskyblue";
          document.getElementById("diceRoll").disabled = true;
          if ((document.getElementById("diceRoll").disabled = true)) {
            document.getElementById("diceRoll").style.backgroundColor =
              "lightgrey";
            document.getElementById("activeToken").innerHTML =
              "Your opponents turn!";
            document.getElementById("activeToken").style.color = "red";
          }
        });
      });
    document
      .getElementById("ans2")
      .addEventListener("click", async function () {
        socket.emit("2.2", ansButValue);
        document.getElementById("ans1").style.backgroundColor = "red";
        document.getElementById("ans2").style.backgroundColor = "green";
        document.getElementById("ans3").style.backgroundColor = "red";
        document.getElementById("ans1").disabled = true;
        document.getElementById("ans2").disabled = true;
        document.getElementById("ans3").disabled = true;
        document.getElementById("grade").style.color = "green";
        document.getElementById("grade").style.display = "inherit";
        document.getElementById("grade").innerHTML = "Correct!";
        await new Promise((resolve) => setTimeout(resolve, 3000));
        document.getElementById("voci").style.display = "none";
        document.getElementById("ans1").style.display = "none";
        document.getElementById("ans2").style.display = "none";
        document.getElementById("ans3").style.display = "none";
        document.getElementById("grade").style.display = "none";
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return new Promise(async (resolve, reject) => {
          if (direction == "up") {
            moveBonus = document.getElementById("Blue").style.marginTop =
              String(marginTop() - 8) + "vh";
          } else if (direction == "right") {
            moveBonus = document.getElementById("Blue").style.marginLeft =
              String(marginLeft() + 8) + "vh";
          } else if (direction == "left") {
            moveBonus = document.getElementById("Blue").style.marginLeft =
              String(marginLeft() - 8) + "vh";
          }
          console.log(moveBonus);
          socket.emit("2.2Margin", moveBonus);

          await new Promise((resolve) => setTimeout(resolve, 400));
          resolve();
          document.getElementById("ans1").disabled = true;
          document.getElementById("ans2").disabled = true;
          document.getElementById("ans3").disabled = true;
          document.getElementById("ans1").style.backgroundColor =
            "lightskyblue";
          document.getElementById("ans2").style.backgroundColor =
            "lightskyblue";
          document.getElementById("ans3").style.backgroundColor =
            "lightskyblue";
          document.getElementById("diceRoll").disabled = true;
          if ((document.getElementById("diceRoll").disabled = true)) {
            document.getElementById("diceRoll").style.backgroundColor =
              "lightgrey";
            document.getElementById("activeToken").innerHTML =
              "Your opponents turn!";
            document.getElementById("activeToken").style.color = "red";
          }
        });
      });
    document
      .getElementById("ans3")
      .addEventListener("click", async function () {
        socket.emit("2.3", ansButValue);
        document.getElementById("ans1").style.backgroundColor = "red";
        document.getElementById("ans2").style.backgroundColor = "green";
        document.getElementById("ans3").style.backgroundColor = "red";
        document.getElementById("ans1").disabled = true;
        document.getElementById("ans2").disabled = true;
        document.getElementById("ans3").disabled = true;
        document.getElementById("grade").style.color = "red";
        document.getElementById("grade").style.display = "inherit";
        document.getElementById("grade").innerHTML = "Wrong!";
        await new Promise((resolve) => setTimeout(resolve, 3000));
        document.getElementById("voci").style.display = "none";
        document.getElementById("ans1").style.display = "none";
        document.getElementById("ans2").style.display = "none";
        document.getElementById("ans3").style.display = "none";
        document.getElementById("grade").style.display = "none";
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log(document.getElementById("Blue").style.marginLeft);
        return new Promise(async (resolve, reject) => {
          if (direction == "up") {
            moveBonus = document.getElementById("Blue").style.marginTop =
              String(marginTop() + 8) + "vh";
          } else if (direction == "right") {
            moveBonus = document.getElementById("Blue").style.marginLeft =
              String(marginLeft() - 8) + "vh";
          } else if (direction == "left") {
            moveBonus = document.getElementById("Blue").style.marginLeft =
              String(marginLeft() + 8) + "vh";
          }
          console.log(moveBonus);
          socket.emit("2.3Margin", moveBonus);

          await new Promise((resolve) => setTimeout(resolve, 400));
          resolve();
          document.getElementById("ans1").disabled = true;
          document.getElementById("ans2").disabled = true;
          document.getElementById("ans3").disabled = true;
          document.getElementById("ans1").style.backgroundColor =
            "lightskyblue";
          document.getElementById("ans2").style.backgroundColor =
            "lightskyblue";
          document.getElementById("ans3").style.backgroundColor =
            "lightskyblue";
          document.getElementById("diceRoll").disabled = true;
          if ((document.getElementById("diceRoll").disabled = true)) {
            document.getElementById("diceRoll").style.backgroundColor =
              "lightgrey";
            document.getElementById("activeToken").innerHTML =
              "Your opponents turn!";
            document.getElementById("activeToken").style.color = "red";
          }
        });
      });
    for (var i = 0; i < aWord.length; i++) {
      if (aWord[i] === aWordValue) {
        aWord.splice(i, 1);
      }
    }
    aWordValue1 = aWord[Math.floor(Math.random() * aWord.length)];
    var ansBut2 = ["box1", "box3"];
    ansButValue2 = ansBut2[Math.floor(Math.random() * ansBut2.length)];
    if (ansButValue2 == "box1") {
      document.getElementById("ans1").innerHTML = aWordValue1;

      for (var i = 0; i < aWord.length; i++) {
        if (aWord[i] === aWordValue1) {
          aWord.splice(i, 1);
        }
      }
      aWordValue2 = aWord[Math.floor(Math.random() * aWord.length)];
      document.getElementById("ans3").innerHTML = aWordValue2;
    } else if (ansButValue2 == "box3") {
      document.getElementById("ans3").innerHTML = aWordValue1;

      for (var i = 0; i < aWord.length; i++) {
        if (aWord[i] === aWordValue1) {
          aWord.splice(i, 1);
        }
      }
      aWordValue2 = aWord[Math.floor(Math.random() * aWord.length)];
      document.getElementById("ans1").innerHTML = aWordValue2;
    }
  } else if (ansButValue == "box3") {
    document.getElementById("ans3").innerHTML = aWordValue;
    document
      .getElementById("ans1")
      .addEventListener("click", async function () {
        socket.emit("3.1", ansButValue);
        document.getElementById("ans1").style.backgroundColor = "red";
        document.getElementById("ans2").style.backgroundColor = "red";
        document.getElementById("ans3").style.backgroundColor = "green";
        document.getElementById("ans1").disabled = true;
        document.getElementById("ans2").disabled = true;
        document.getElementById("ans3").disabled = true;
        document.getElementById("grade").style.color = "red";
        document.getElementById("grade").style.display = "inherit";
        document.getElementById("grade").innerHTML = "Wrong!";
        await new Promise((resolve) => setTimeout(resolve, 3000));
        document.getElementById("voci").style.display = "none";
        document.getElementById("ans1").style.display = "none";
        document.getElementById("ans2").style.display = "none";
        document.getElementById("ans3").style.display = "none";
        document.getElementById("grade").style.display = "none";
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log(document.getElementById("Blue").style.marginLeft);
        return new Promise(async (resolve, reject) => {
          if (direction == "up") {
            moveBonus = document.getElementById("Blue").style.marginTop =
              String(marginTop() + 8) + "vh";
          } else if (direction == "right") {
            moveBonus = document.getElementById("Blue").style.marginLeft =
              String(marginLeft() - 8) + "vh";
          } else if (direction == "left") {
            moveBonus = document.getElementById("Blue").style.marginLeft =
              String(marginLeft() + 8) + "vh";
          }
          console.log(moveBonus);
          socket.emit("3.1Margin", moveBonus);

          await new Promise((resolve) => setTimeout(resolve, 400));
          resolve();
          document.getElementById("ans1").disabled = true;
          document.getElementById("ans2").disabled = true;
          document.getElementById("ans3").disabled = true;
          document.getElementById("ans1").style.backgroundColor =
            "lightskyblue";
          document.getElementById("ans2").style.backgroundColor =
            "lightskyblue";
          document.getElementById("ans3").style.backgroundColor =
            "lightskyblue";
          document.getElementById("diceRoll").disabled = true;
          if ((document.getElementById("diceRoll").disabled = true)) {
            document.getElementById("diceRoll").style.backgroundColor =
              "lightgrey";
            document.getElementById("activeToken").innerHTML =
              "Your opponents turn!";
            document.getElementById("activeToken").style.color = "red";
          }
        });
      });
    document
      .getElementById("ans2")
      .addEventListener("click", async function () {
        socket.emit("3.2", ansButValue);
        document.getElementById("ans1").style.backgroundColor = "red";
        document.getElementById("ans2").style.backgroundColor = "red";
        document.getElementById("ans3").style.backgroundColor = "green";
        document.getElementById("ans1").disabled = true;
        document.getElementById("ans2").disabled = true;
        document.getElementById("ans3").disabled = true;
        document.getElementById("grade").style.color = "red";
        document.getElementById("grade").style.display = "inherit";
        document.getElementById("grade").innerHTML = "Wrong!";
        await new Promise((resolve) => setTimeout(resolve, 3000));
        document.getElementById("voci").style.display = "none";
        document.getElementById("ans1").style.display = "none";
        document.getElementById("ans2").style.display = "none";
        document.getElementById("ans3").style.display = "none";
        document.getElementById("grade").style.display = "none";
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return new Promise(async (resolve, reject) => {
          if (direction == "up") {
            moveBonus = document.getElementById("Blue").style.marginTop =
              String(marginTop() + 8) + "vh";
          } else if (direction == "right") {
            moveBonus = document.getElementById("Blue").style.marginLeft =
              String(marginLeft() - 8) + "vh";
          } else if (direction == "left") {
            moveBonus = document.getElementById("Blue").style.marginLeft =
              String(marginLeft() + 8) + "vh";
          }
          console.log(moveBonus);
          socket.emit("3.2Margin", moveBonus);

          await new Promise((resolve) => setTimeout(resolve, 400));
          resolve();
          document.getElementById("ans1").disabled = true;
          document.getElementById("ans2").disabled = true;
          document.getElementById("ans3").disabled = true;
          document.getElementById("ans1").style.backgroundColor =
            "lightskyblue";
          document.getElementById("ans2").style.backgroundColor =
            "lightskyblue";
          document.getElementById("ans3").style.backgroundColor =
            "lightskyblue";
          document.getElementById("diceRoll").disabled = true;
          if ((document.getElementById("diceRoll").disabled = true)) {
            document.getElementById("diceRoll").style.backgroundColor =
              "lightgrey";
            document.getElementById("activeToken").innerHTML =
              "Your opponents turn!";
            document.getElementById("activeToken").style.color = "red";
          }
        });
      });
    document
      .getElementById("ans3")
      .addEventListener("click", async function () {
        socket.emit("3.3", ansButValue);
        document.getElementById("ans1").style.backgroundColor = "red";
        document.getElementById("ans2").style.backgroundColor = "red";
        document.getElementById("ans3").style.backgroundColor = "green";
        document.getElementById("ans1").disabled = true;
        document.getElementById("ans2").disabled = true;
        document.getElementById("ans3").disabled = true;
        document.getElementById("grade").style.color = "green";
        document.getElementById("grade").style.display = "inherit";
        document.getElementById("grade").innerHTML = "Correct!";
        await new Promise((resolve) => setTimeout(resolve, 3000));
        document.getElementById("voci").style.display = "none";
        document.getElementById("ans1").style.display = "none";
        document.getElementById("ans2").style.display = "none";
        document.getElementById("ans3").style.display = "none";
        document.getElementById("grade").style.display = "none";
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return new Promise(async (resolve, reject) => {
          if (direction == "up") {
            moveBonus = document.getElementById("Blue").style.marginTop =
              String(marginTop() - 8) + "vh";
          } else if (direction == "right") {
            moveBonus = document.getElementById("Blue").style.marginLeft =
              String(marginLeft() + 8) + "vh";
          } else if (direction == "left") {
            moveBonus = document.getElementById("Blue").style.marginLeft =
              String(marginLeft() - 8) + "vh";
          }
          console.log(moveBonus);
          socket.emit("3.3Margin", moveBonus);

          await new Promise((resolve) => setTimeout(resolve, 400));
          resolve();
          document.getElementById("ans1").disabled = true;
          document.getElementById("ans2").disabled = true;
          document.getElementById("ans3").disabled = true;
          document.getElementById("ans1").style.backgroundColor =
            "lightskyblue";
          document.getElementById("ans2").style.backgroundColor =
            "lightskyblue";
          document.getElementById("ans3").style.backgroundColor =
            "lightskyblue";
          document.getElementById("diceRoll").disabled = true;
          if ((document.getElementById("diceRoll").disabled = true)) {
            document.getElementById("diceRoll").style.backgroundColor =
              "lightgrey";
            document.getElementById("activeToken").innerHTML =
              "Your opponents turn!";
            document.getElementById("activeToken").style.color = "red";
          }
        });
      });
    for (var i = 0; i < aWord.length; i++) {
      if (aWord[i] === aWordValue) {
        aWord.splice(i, 1);
      }
    }
    aWordValue1 = aWord[Math.floor(Math.random() * aWord.length)];
    var ansBut2 = ["box1", "box2"];
    ansButValue2 = ansBut2[Math.floor(Math.random() * ansBut2.length)];
    if (ansButValue2 == "box1") {
      document.getElementById("ans1").innerHTML = aWordValue1;

      for (var i = 0; i < aWord.length; i++) {
        if (aWord[i] === aWordValue1) {
          aWord.splice(i, 1);
        }
      }
      aWordValue2 = aWord[Math.floor(Math.random() * aWord.length)];
      document.getElementById("ans2").innerHTML = aWordValue2;
    } else if (ansButValue2 == "box2") {
      document.getElementById("ans2").innerHTML = aWordValue1;

      for (var i = 0; i < aWord.length; i++) {
        if (aWord[i] === aWordValue1) {
          aWord.splice(i, 1);
        }
      }
      aWordValue2 = aWord[Math.floor(Math.random() * aWord.length)];
      document.getElementById("ans1").innerHTML = aWordValue2;
    }
  }

  socket.emit(
    "vociCheck1",
    direction,
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
