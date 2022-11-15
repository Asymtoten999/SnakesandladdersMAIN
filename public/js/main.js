let turn = "Blue";

var select = document.getElementById("lecSelect");

document.getElementById("activeToken").innerHTML = "Your opponents turn!";
//Set start position
document.getElementById("Red").style.marginLeft = "0vh";
document.getElementById("Red").style.marginTop = "0vh";
document.getElementById("Blue").style.marginLeft = "0vh";
document.getElementById("Blue").style.marginTop = "0vh";
let diceRoll = document.getElementById("diceRoll");
let startBut = document.getElementById("startBut");
let restartBut = document.getElementById("restartBut");
//Restart when game ends
restartBut.addEventListener("click", async (e) => {
  if ((clicked = true)) {
    window.location.reload();
  }
});

let stopEvent = false;
let playerNum = 0;

const socket = io();
let rollValue;

// Get your player number
socket.on("player-number", (num) => {
  if (num === -1) {
    document.getElementById("startBut").style.display = "none";
    document.getElementById("lecSelect").style.display = "none";
  } else {
    document.getElementById("foreground").style.display = "none";

    playerNum = parseInt(num);
    if (playerNum === 1) {
      document.getElementById("startBut").style.display = "none";
      document.getElementById("lecSelect").style.display = "none";
    }
  }
});

// Get selected lesson
socket.on("startData", (start, value) => {
  select.options[select.selectedIndex].value = value;
});

// Get rolled number
socket.on("rollData", (rollData) => {
  document.getElementById("rollOutput").value = rollData;
});

// Get movement infos
socket.on("moveData", (moveData, direction, turn) => {
  return new Promise(async (resolve, reject) => {
    if (direction == "up") {
      document.getElementById("Red").style.marginTop = moveData;
    } else if (direction == "right") {
      document.getElementById("Red").style.marginLeft = moveData;
    } else if (direction == "left") {
      document.getElementById("Red").style.marginLeft = moveData;
    }

    await new Promise((resolve) => setTimeout(resolve, 400));

    resolve();
  });
});
// Get winner info
socket.on("winData", (winValue) => {
  document.getElementById("loser").style.display = "inherit";
});

// Get snakes and ladders info
socket.on("SnLData", (froms, tos, turn, newLeft, newTop) => {
  let newNewLeft;
  let newNewTop;

  if (newLeft == null) {
  } else {
    document.getElementById("Red").style.marginLeft = newLeft;
    document.getElementById("Red").style.marginTop = newTop;
  }
});

// Get data and refresh if someone leaves
socket.on("refreshData", (refresh) => {
  window.location.reload();
});

// Get voci info
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
  var value = select.options[select.selectedIndex].value;

  socket.emit("startMes", start, value);
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
    document.getElementById("diceRoll").disabled = true;
    document.getElementById("diceRoll").style.backgroundColor = "lightgrey";

    document.getElementById("ans1").disabled = false;
    document.getElementById("ans2").disabled = false;
    document.getElementById("ans3").disabled = false;
    document.getElementById("ans1").style.backgroundColor = "lightskyblue";
    document.getElementById("ans2").style.backgroundColor = "lightskyblue";
    document.getElementById("ans3").style.backgroundColor = "lightskyblue";
    let rollValue = await roll();
    let isOutOfRange = checkRange(rollValue);
    await new Promise((resolve) => setTimeout(resolve, 400));
    if (!isOutOfRange) {
      await run(rollValue);
      await new Promise((resolve) => setTimeout(resolve, 400));
    }
    let wonBy = checkWin();
    if (wonBy == "none") {
      let buttonValue;
      socket.emit("buttonToggle", buttonValue);
      stopEvent = false;
    }
  }
});

function checkWin() {
  if (marginTop() == -72 && marginLeft() == 0) {
    document.getElementById("restartBut").style.display = "inherit";
    document.getElementById("winner").style.display = "inherit";
    let winValue;
    socket.emit("winner", winValue);

    return turn;
  } else {
    return "none";
  }
}

// Check if won
function checkRange(rollValue) {
  let isOutOfRange = false;
  if (
    marginTop() == -72 &&
    marginLeft() + Number((rollValue * -8).toFixed(1)) < 0
  ) {
    isOutOfRange = true;
    document.getElementById("diceRoll").disabled = false;
    document.getElementById("diceRoll").style.backgroundColor =
      "rgb(239, 235, 143)";
  }
  return isOutOfRange;
}

// Run every function
function run(rollValue) {
  return new Promise(async (resolve, reject) => {
    for (i = 1; i <= rollValue; i++) {
      let direction = getDirection();
      await move(direction);
    }

    checkLaddersAndSnakes();
    checkRange();
    checkWin();
    await new Promise((resolve) => setTimeout(resolve, 800));
    vociCheck();

    resolve();
  });
}

let moveBonus;

// Voci questioning function
function vociCheck() {
  var value = select.options[select.selectedIndex].value;
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
  // Vocab for the lessons
  if (value == "L1.U1") {
    var aWord = [
      `une entrée`,
      `et`,
      `Salut!`,
      `Ça va`,
      `bien`,
      `merci`,
      `Et toi?`,
      `super`,
      `A plus!`,
      `Bonjour!`,
      `je m'appelle`,
      `moi`,
      `Moi, c'est…`,
      `Au revoir!`,
      `oui`,
      `Bienvenue!`,
      `en`,
      `une adresse`,
      `un film`,
      `une banane`,
      `une orange`,
      `un croissant`,
      `une guitare`,
      `un parc`,
      `une salade`,
      `un bonbon`,
      `une famille`,
      `une tomate`,
      `un groupe`,
      `un bus`,
      `un café`,
      `un pull`,
      `un numéro`,
      `Qu'est-ce que c'est?`,
      `c'est …`,
      `un sac`,
      `de/d'`,
      `être `,
      `là`,
      `Pardon`,
      `monsieur`,
      `pour`,
      `un cours`,
      `un cours de guitare`,
      `alors`,
      `le mercredi`,
      `il y a`,
      `avec`,
      `le samedi`,
      `cool`,
      `aussi`,
      `d'accord!`,
      `euh ...`,
      `encore`,
      `une place`,
      `Comment?`,
      `Tu t'appelles comment?`,
      `C'est bon`,
      `dix`,
      `une minute`,
      `plus tard`,
      `une maison`,
      `à la maison`,
      `avoir`,
      `un problème`,
      `Tiens!`,
      `dans`,
      `un porte-monnaie/des porte-monnaies`,
      `un nom`,
      `l'âge `,
      `Tu as quel âge?`,
      `un an`,
      `J'ai 14 ans`,
      `un anniversaire`,
      `septembre`,
      `le 19 septembre`,
      `mais`,
      `bientôt`,
      `où `,
      `Tu habites où?`,
      `J'habite…`,
      `une rue`,
      `une boulangerie`,
      `un portable`,
      `un numéro de portable`,
      `une idée`,
      `madame …`,
      `mademoiselle …`,
      `non`,
      `une question`,
      `de … à`,
      `à`,
      `une histoire`,
      `Quelle histoire!`,
      `mon/ma/mes`,
      `Allô?`,
      `ton/ta/tes`,
      `les affaires`,
      `un rendez-vous`,
      `un père`,
      `Quoi?`,
      `qui`,
      `C'est qui?`,
      `avoir rendez-vous avec qn`,
      `ce sont`,
      `son/sa/ses`,
      `pourquoi`,
      `parfois`,
      `être dans la lune`,
      `…, non?`,
      `un fils`,
      `toujours`,
      `un copain/une copine`,
      `voilà`,
      `attends …`,
      `un chien`,
      `il s'appelle`,
      `avoir`,
      `le hip-hop`,
      `une guitare électrique`,
      `le rock`,
      `la musique`,
      `ensemble`,
      `sympa`,
      `une surprise`,
      `ça `,
      `une tarte`,
      `le chocolat`,
      `une tarte au chocolat`,
      `une spécialité`,
      `un prof/une prof`,
      `une fille`,
      `un téléphone`,
      `mars`,
      `mai`,
    ];
    var qWord = [
      `ein Eingang`,
      `und`,
      `Hallo!, Tschüss!`,
      `Wie geht's?`,
      `gut`,
      `danke`,
      `Und du?`,
      `super; toll`,
      `Bis später!`,
      `Guten Tag!`,
      `ich heisse`,
      `ich`,
      `ich bin`,
      `Auf Wiedersehen!`,
      `ja`,
      `Willkommen!`,
      `in`,
      `eine Adresse`,
      `ein Film`,
      `eine Banane`,
      `eine Orange`,
      `ein Croissant`,
      `eine Gitarre`,
      `ein Park`,
      `ein Salat`,
      `ein Bonbon`,
      `eine Familie`,
      `eine Tomate`,
      `eine Gruppe; eine Band`,
      `ein Bus`,
      `ein Kaffee; ein Café`,
      `ein Pulli`,
      `eine Nummer`,
      `Was ist das?`,
      `das ist …`,
      `eine Tasche`,
      `von`,
      `sein`,
      `da; hier`,
      `Entschuldigung`,
      `Herr …`,
      `für`,
      `ein Kurs; eine Unterrichtsstunde`,
      `ein Gitarrenkurs`,
      `also`,
      `mittwochs`,
      `es gibt`,
      `mit`,
      `samstags`,
      `cool`,
      `auch`,
      `einverstanden; o.k.`,
      `äh …`,
      `noch`,
      `ein Platz`,
      `Wie?`,
      `Wie heisst du?`,
      `Das ist o.k.`,
      `zehn`,
      `eine Minute`,
      `später`,
      `ein Haus`,
      `zu Hause; nach Hause`,
      `haben`,
      `ein Problem`,
      `Schau mal!; Na, sowas!`,
      `in`,
      `ein Geldbeutel/Geldbeutel`,
      `ein Name`,
      `das Alter`,
      `Wie alt bist du?`,
      `ein Jahr`,
      `Ich bin 14 Jahre alt`,
      `ein Geburtstag`,
      `September`,
      `am 19.September`,
      `aber`,
      `bald`,
      `wo`,
      `Wo wohnst du?`,
      `Ich wohne …`,
      `eine Strasse`,
      `eine Bäckerei`,
      `ein Handy; ein Mobiltelefon`,
      `eine Handynummer`,
      `eine Idee`,
      `Frau …`,
      `Anrede Für eine jüngere Frau`,
      `nein`,
      `eine Frage`,
      `von … bis`,
      `in`,
      `eine Geschichte`,
      `Was für eine Geschichte!`,
      `mein/meine`,
      `Hallo?`,
      `dein/deine`,
      `die Sachen`,
      `eine Verabredung; ein Treffen`,
      `ein Vater`,
      `Was?`,
      `wer`,
      `Wer ist das?`,
      `eine Verabredung mit jdm. haben; sich mit jdm. treffen`,
      `das sind`,
      `sein/seine`,
      `warum`,
      `manchmal`,
      `zerstreut sein`,
      `…, nicht wahr?; … oder?`,
      `ein Sohn`,
      `immer`,
      `ein Freund/eine Freundin`,
      `da ist; da sind`,
      `warte …`,
      `ein Hund`,
      `er heisst`,
      `haben`,
      `der Hip-Hop`,
      `eine E-Gitarre`,
      `die Rockmusik`,
      `die Musik`,
      `gemeinsam;zusammen`,
      `nett`,
      `eine Überraschung`,
      `das`,
      `ein Kuchen`,
      `die Schokolade`,
      `ein Schokoladenkuchen`,
      `eine Spezialität; eine Besonderheit`,
      `ein Lehrer; eine Lehrerin`,
      `ein Mädchen`,
      `ein Telefon`,
      `März`,
      `Mai`,
    ];
  } else {
    var qWord = [
      "French L2.1",
      "French L2.2",
      "French L2.3",
      "French L2.4",
      "French L2.5",
    ];
    var aWord = [
      "German L2.1",
      "German L2.2",
      "German L2.3",
      "German L2.4",
      "German L2.5",
    ];
  }

  var ansBut = ["box1", "box2", "box3"];

  // Word and box picking
  qWordValue = qWord[Math.floor(Math.random() * qWord.length)];
  document.getElementById("voci").innerHTML = qWordValue;
  vociIndex = qWord.indexOf(qWordValue);

  aWordValue = aWord[vociIndex];
  console.log(aWordValue);

  let ansButValue;

  ansButValue = ansBut[Math.floor(Math.random() * ansBut.length)];
  console.log(ansButValue);

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
        return new Promise(async (resolve, reject) => {
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
  ansButValue = null;
}

let newLeft;
let newTop;

// Check if on a snake or ladder
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

// Player movement
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

// Movement direction
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

// Dice roll
function roll() {
  return new Promise(async (resolve, reject) => {
    rollValue = Math.floor(Math.random() * 6) + 1;
    document.getElementById("rollOutput").value = rollValue;

    socket.emit("roll", rollValue);
    resolve(rollValue);
  });
}

// Box numbers in correct order
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

// Join room
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
