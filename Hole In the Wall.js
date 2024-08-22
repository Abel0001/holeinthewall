/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Hole In the Wall
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const player = "p"
const filled = "w"
const regen = "r"
var roundCounter = 0;
var powerUps
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
.....444444.....
....4......4....
...4............
...4........4...
...4.......444..
...4......4.4.4.
...4........4...
...4........4...
....4......4....
.....444444.....
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

function generateLevel() {
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

    if (Math.floor(Math.random() * 20 > difficulty)) {
      addSprite(i % 5, Math.floor(i / 5), filled)
      if (powerUpCount < 2) {
        if (Math.floor(Math.random() * 6) == 1) {
          powerUpCount++;
          switch (Math.floor(Math.random() * 1)) {
            case 0:
              addSprite(i % 5, Math.floor(i / 5), regen)
              
              break;
          }
        }
      }


    }

  }
  checkLevel(true)

}

var playerPos = Math.floor(Math.random() * 30);
console.log(playerPos)


var difficulty = 1 + roundCounter;

generateLevel();

addText("3", {
  x: 10,
  y: 4,
  color: color`5`
})


setPushables({
  [player]: []
})
onInput("d", () => {
  getFirst(player).x += 1
})

onInput("a", () => {
  getFirst(player).x -= 1
})

onInput("w", () => {
  getFirst(player).y -= 1
})

onInput("s", () => {
  getFirst(player).y += 1
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
    return;
  }
  clearText()
  addText("hello", {
    x: 10,
    y: 4,
    color: color`3`
  })
  setTimeout(() => {
    generateLevel()
  }, 550)
}


afterInput(() => {

})