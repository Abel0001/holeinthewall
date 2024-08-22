/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Hole In the Wall
@author: 
@tags: []
@addedOn: 2024-00-00
*/
let countdownTimeout;

const player = "p"
const filled = "w"
const regen = "r"
const extratime = "x"
const lowerdiff = "l"

const melody = tune`
454.54545454545456: C4^454.54545454545456 + E4~454.54545454545456,
454.54545454545456: C5~454.54545454545456 + E4~454.54545454545456 + E5^454.54545454545456 + G5-454.54545454545456 + C4~454.54545454545456,
454.54545454545456: E4~454.54545454545456 + C4~454.54545454545456,
454.54545454545456: D5~454.54545454545456 + E4~454.54545454545456 + C4~454.54545454545456 + G4-454.54545454545456 + B4/454.54545454545456,
454.54545454545456: E4~454.54545454545456 + C4~454.54545454545456,
454.54545454545456: C4~454.54545454545456 + A4~454.54545454545456 + C5~454.54545454545456,
454.54545454545456: C4~454.54545454545456 + E4~454.54545454545456,
454.54545454545456: E4~454.54545454545456 + B4~454.54545454545456 + G4~454.54545454545456,
454.54545454545456: C5~454.54545454545456 + F4~454.54545454545456,
454.54545454545456: E4~454.54545454545456,
454.54545454545456: E4^454.54545454545456 + G4-454.54545454545456 + C4~454.54545454545456 + B4-454.54545454545456,
454.54545454545456: E4^454.54545454545456 + C4~454.54545454545456,
454.54545454545456: E4^454.54545454545456 + C4~454.54545454545456 + C5~454.54545454545456 + A4~454.54545454545456,
454.54545454545456: C4~454.54545454545456,
454.54545454545456: C4~454.54545454545456 + G4/454.54545454545456 + B4/454.54545454545456,
454.54545454545456: C4~454.54545454545456,
454.54545454545456: B4~454.54545454545456 + G4~454.54545454545456 + E4~454.54545454545456,
454.54545454545456,
454.54545454545456: A4~454.54545454545456 + C5~454.54545454545456 + E5~454.54545454545456 + C4^454.54545454545456,
454.54545454545456: C4^454.54545454545456,
454.54545454545456: C5~454.54545454545456 + A4~454.54545454545456 + F4~454.54545454545456 + C4^454.54545454545456,
454.54545454545456: C4^454.54545454545456,
454.54545454545456: B4~454.54545454545456 + D5~454.54545454545456 + F5~454.54545454545456 + C4^454.54545454545456,
454.54545454545456: C4^454.54545454545456,
454.54545454545456: B4~454.54545454545456 + D5~454.54545454545456 + G4-454.54545454545456,
454.54545454545456,
454.54545454545456: G4~454.54545454545456 + E4/454.54545454545456,
454.54545454545456,
454.54545454545456: E4/454.54545454545456,
454.54545454545456: G4/454.54545454545456,
454.54545454545456: B4/454.54545454545456,
454.54545454545456: C4-454.54545454545456 + E4~454.54545454545456 + G4^454.54545454545456`

var roundCounter = 0;
var powerUps = []
var stopCountdown = false;
setLegend(
  [player, bitmap`
1111111111111111
1333333333333331
130..........031
13.0........0.31
13..0......0..31
13...0....0...31
13....0..0....31
13.....00.....31
13.....00.....31
13....0..0....31
13...0....0...31
13..0......0..31
13.0........0.31
130..........031
1333333333333331
1111111111111111`],
  [regen, bitmap`
................
................
................
.....000000.....
....0......0....
...0............
...0........0...
...0.......000..
...0......0.0.0.
...0........0...
...0........0...
....0......0....
.....000000.....
................
................
................`],
  [extratime, bitmap`
................
................
................
....00000000....
....0......0....
.....011110.....
......0110......
.......00.......
.......00.......
......0..0......
.....0....0.....
....01111110....
....00000000....
................
................
................`],
  [lowerdiff, bitmap`
................
................
................
................
.......00.......
.......00.......
.......00.......
.......00.......
....0..00..0....
....0..00..0....
.....0.00.0.....
......0000......
.......00.......
................
................
................`],
  [filled, bitmap`
1111111111111111
1CCCCCCCCCCCCCC1
1CCCCCCCCCCCCCC1
1CCCCCCCCCCCCCC1
1CCC99999999CCC1
1CCC99999999CCC1
1CCC99999999CCC1
1CCC99999999CCC1
1CCC99999999CCC1
1CCC99999999CCC1
1CCC99999999CCC1
1CCC99999999CCC1
1CCCCCCCCCCCCCC1
1CCCCCCCCCCCCCC1
1CCCCCCCCCCCCCC1
1111111111111111`]
)

setSolids([])
var level = map`
.....
.....
.....
.....
.....
.....`
function killCountdown() {
    stopCountdown = true;

    countDownValue = 0;

  if (countdownTimeout) {
    clearTimeout(countdownTimeout);
  }
}
function generateLevel() {
      killCountdown()
  clearText()
  var powerUpCount = 0;
  roundCounter++;
  difficulty += 1;
  level = map`
.....
.....
.....
.....
.....
.....`
  setMap(level)
  for (var i = 0; i < 30; i++) {
    if (playerPos == i) {

      addSprite(i % 5, Math.floor(i / 5), player)

      //continue;
    }
    //  if (i % 6 == 0) {
    //   level += "\n";
    //   continue;
    // }

    if (Math.floor(Math.random() * 13 > difficulty)) {
      addSprite(i % 5, Math.floor(i / 5), filled)
      if (powerUpCount < 2) {
        if (Math.floor(Math.random() * 6) == 1) {
          powerUpCount++;
          switch (Math.floor(Math.random() * 3)) {
            case 0:
              addSprite(i % 5, Math.floor(i / 5), regen)

              break;
            case 1:
              addSprite(i % 5, Math.floor(i / 5), extratime)

              break;
            case 2:
              addSprite(i % 5, Math.floor(i / 5), lowerdiff)

              break;
          }
        }
      }


    }

  }
  checkLevel(true)
  constructPowerUpString()
  stopCountdown = false
  startCountdown(8)
pickPowerUp()
}

var playerPos = Math.floor(Math.random() * 30);
console.log(playerPos)


var difficulty = 1 + roundCounter;

generateLevel();

var countDownValue;

function pickPowerUp() {
  if (powerUps.length < 3) {
    var pX = getFirst(player).x
    var pY = getFirst(player).y
    //Regen Level
    if (getTile(getFirst(player).x, getFirst(player).y).some(sprite => sprite.type == regen)) {
      clearTile(pX, pY)
      addSprite(pX, pY, player)
      addSprite(pX, pY, filled)
      powerUps += "r";
    }
    if (getTile(getFirst(player).x, getFirst(player).y).some(sprite => sprite.type == extratime)) {
      clearTile(pX, pY)
      addSprite(pX, pY, player)
      addSprite(pX, pY, filled)
      powerUps += "x";
    }
    if (getTile(getFirst(player).x, getFirst(player).y).some(sprite => sprite.type == lowerdiff)) {
      clearTile(pX, pY)
      addSprite(pX, pY, player)
      addSprite(pX, pY, filled)
      powerUps += "l";
    }
  }
  constructPowerUpString()
}
//First ability

function constructPowerUpString() {
  var string = "Powerups:"
  for (var i = 0; i < powerUps.length; i++) {
    string += powerUps[i] + " "
  }
  clearText();
  addText(string, {
    x: 3,
    y: 14,
    color: color`5`
  })
  if (countDownValue != 0 || stopCountdown == false) {
    addText(`Countdown: ` + countDownValue, {
      x: 4,
      y: 2,
      color: color`5`
    })
  }
}


function usePowerUps(aN) {
  if (aN > powerUps.length - 1) return;
  if (powerUps[aN] == "r") {

    generateLevel()
    difficulty -= 1;
    roundCounter -= 1;

  }
  if (powerUps[aN] == "l") {
    difficulty -= 4;

    generateLevel()

    roundCounter -= 1;

  }
  if (powerUps[aN] == "x") {
    
    let timeBefore = countDownValue;
    killCountdown()

  stopCountdown = false
  startCountdown(8 + countDownValue)
  }

  if (powerUps.length == 1) {
    powerUps = []
  }

  if (powerUps.length == 2) {
    if (aN == 0)
      powerUps = [powerUps[aN + 1]];
    if (aN == 1)
      powerUps = [powerUps[aN - 1]];
  }
  if (powerUps.length == 3) {
    if (aN == 0)
      powerUps = [powerUps[aN + 1], powerUps[aN + 2]];
    if (aN == 1)
      powerUps = [powerUps[aN - 1], powerUps[aN + 1]];
    if (aN == 2)
      powerUps = [powerUps[aN - 2], powerUps[aN - 1]];
  }

  constructPowerUpString()
}

onInput("j", () => {
  usePowerUps(0)
})
//Second ability

onInput("k", () => {
  usePowerUps(1)

})
//Third ability

onInput("l", () => {
  usePowerUps(2)

})
getFirst(player).x
getFirst(player).y
setPushables({
  [player]: []
})
onInput("d", () => {
  getFirst(player).x += 1
  pickPowerUp()
})

onInput("a", () => {
  getFirst(player).x -= 1
  pickPowerUp()
})

onInput("w", () => {
  getFirst(player).y -= 1
  pickPowerUp()
})

onInput("s", () => {
  getFirst(player).y += 1
  pickPowerUp()
})

onInput("i", () => {
  addSprite(getFirst(player).x, getFirst(player).y, filled)
  console.log("diffculty: " + difficulty)
  checkLevel(false);
})

function checkLevel(isGenerated) {
  var x = 0;
  var y = 0;
  for (var i = 0; i < 30; i++) {

    //console.log(getTile(i % 5,y = Math.floor(i / 5)).some(sprite => sprite.type == filled))
    if (!getTile(i % 5, y = Math.floor(i / 5)).some(sprite => sprite.type == filled)) return;
  }
  if (isGenerated) {
    generateLevel();
    roundCounter -= 1;
    difficulty -= 1;
    return;
  }
  clearText()
  addText("Good Job", {
    x: 10,
    y: 4,
    color: color`3`
  })
  setTimeout(() => {
    generateLevel()
  }, 550)
}
async function startCountdown(seconds) {
  for (let i = seconds; i > 0; i--) {
    if (stopCountdown) { killCountdown();
                        i = -4;
      break;}
    clearText()
    countDownValue = i;
    constructPowerUpString();
    addText(`Countdown: ${i}`, {
      x: 4,
      y: 2,
      color: color`5`
    })
    await new Promise(resolve => {
      countdownTimeout = setTimeout(resolve, 1000);
    });
  }

  if (!stopCountdown) {
    clearText()
    addText("Fail!\n Score: " + (roundCounter - 1), {
      x: 4,
      y: 2,
      color: color`5`
    });

    await new Promise(resolve => setTimeout(resolve, 3000))
    resetGame()
  }
}

function resetGame() {

  roundCounter = 0;
  powerUps = []
  difficulty = 1 + roundCounter;
  level = map`
.....
.....
.....
.....
.....
.....`
  generateLevel()
}




afterInput(() => {

})