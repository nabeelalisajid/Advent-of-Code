const fs = require("fs");
const fileName = "./input.txt";

const MY_ROCK = "X";
const MY_PAPER = "Y";
const MY_SCISSOR = "Z";

const DRAW = "Y";
const LOSE = "X";
const WIN = "Z";
// A Y
// B X
// C Z
const OPPONENT_ROCK = "A";
const OPPONENT_PAPER = "B";
const OPPONENT_SCISSOR = "C";

const SCORE = {
	X: 1,
	Y: 2,
	Z: 3,
};
const DRAW_SCORE = 0;
const WINNING = 6;
let myScore = 0;

const LOSING_COMBINATION = {
	[`${OPPONENT_ROCK}`]: MY_SCISSOR,
	[`${OPPONENT_SCISSOR}`]: MY_PAPER,
	[`${OPPONENT_PAPER}`]: MY_ROCK,
};

const WINNING_COMBINATION = {
	[`${OPPONENT_SCISSOR}`]: MY_ROCK,
	[`${OPPONENT_PAPER}`]: MY_SCISSOR,
	[`${OPPONENT_ROCK}`]: MY_PAPER,
};

const DRAW_COMBINATION = {
	[`${OPPONENT_ROCK}`]: MY_ROCK,
	[`${OPPONENT_SCISSOR}`]: MY_SCISSOR,
	[`${OPPONENT_PAPER}`]: MY_PAPER,
};
// console.log(WINNING_COMBINATION, DRAW_COMBINATION)
const fileData = fs.readFileSync(fileName, "utf-8").split("\n");

fileData.forEach((battle) => {
	const [OPPONENT_PICK, MY_PICK] = battle.split(" ");
	let currentSCORE = 0;
	// Rock beat Scissors
	// Scissors defeats Paper,
	// Paper defeat Rock
	// console.log(OPPONENT_PICK, MY_PICK)
	switch (MY_PICK) {
		case DRAW:
			const drawPick = DRAW_COMBINATION[OPPONENT_PICK];
			currentSCORE = SCORE[drawPick];
			myScore += currentSCORE + 3;
			break;
		case WIN:
			const winPick = WINNING_COMBINATION[OPPONENT_PICK];
			currentSCORE = SCORE[winPick];
			myScore += currentSCORE + 6;
			break;
		case LOSE:
			const losePick = LOSING_COMBINATION[OPPONENT_PICK];
			currentSCORE = SCORE[losePick];
			myScore += currentSCORE;
			break;
	}
});
console.log(myScore);
