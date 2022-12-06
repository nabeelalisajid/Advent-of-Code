const fs = require("fs");
const fileName = './input.txt';

const MY_ROCK = 'X';
const MY_PAPER = 'Y';
const MY_SCISSOR = 'Z';

const OPPONENT_ROCK = 'A';
const OPPONENT_PAPER = 'B';
const OPPONENT_SCISSOR = 'C';

const SCORE = {
  'X': 1,
  'Y': 2,
  'Z': 3
};
const DRAW = 0;
const WINNING = 6;
let myScore = 0;

const WINNING_COMBINATION = {
	[`${MY_ROCK}${OPPONENT_SCISSOR}`]: true,
	[`${MY_SCISSOR}${OPPONENT_PAPER}`]: true,
	[`${MY_PAPER}${OPPONENT_ROCK}`]: true,
};

const DRAW_COMBINATION = {
	[`${MY_ROCK}${OPPONENT_ROCK}`]: true,
	[`${MY_SCISSOR}${OPPONENT_SCISSOR}`]: true,
	[`${MY_PAPER}${OPPONENT_PAPER}`]: true,
};
// console.log(WINNING_COMBINATION, DRAW_COMBINATION)
const fileData = fs.readFileSync(fileName, 'utf-8').split("\n")

fileData.forEach(battle => {
  const [OPPONENT_PICK, MY_PICK] = battle.split(' ');
  let currentSCORE = SCORE[MY_PICK];
  // Rock beat Scissors
  // Scissors defeats Paper,
  // Paper defeat Rock
  // console.log(OPPONENT_PICK, MY_PICK)
  const ourBattle = `${MY_PICK}${OPPONENT_PICK}`;
  if(DRAW_COMBINATION[ourBattle]) {
    // draw
    myScore += currentSCORE + 3;
  } else if (WINNING_COMBINATION[ourBattle]) {
    // won
    myScore += currentSCORE + 6;
  } else {
    myScore += currentSCORE;
  }
})
console.log(myScore)