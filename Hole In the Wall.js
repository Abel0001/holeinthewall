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
`
level = ``

var playerPos = Math.floor(Math.random() * 36);
i(playerPos)
var roundCounter = 0;


var difficulty = 3 + roundCounter;

for (var i = 0; i < 36; i++) {
  if (playerPos == i) {

    level += "p"

    continue;
  }
  if (i % 6 == 0) {
    level += "\n";
    continue;
  }

  if (Math.floor(Math.random() * 20 > difficulty)) {
    level += "w";
    continue;
  }

  level += "."

}

addText("3", {
  x: 10,
  y: 4,
  color: color`5`
})

setMap(level)

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

  checkLevel();
})

function checkLevel() {
  var x = 0;
  var y = 0;
  for (var i = 0; i < 30; i++) {
    x++;
    if (x > 4) {
      x = 0
      y++;
    }
    console.log(x + " " + y);

    if(!getTile(x,y).includes(filled)) return;
  }

  clearText()
  addText("hello", {
    x: 10,
    y: 4,
    color: color`3`
  })
}


afterInput(() => {

})