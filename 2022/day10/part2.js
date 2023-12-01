const fs = require("fs");

const instructions = fs.readFileSync("./input.txt", "utf-8").split("\n");

const commands = {
	NOOP: "noop",
	ADDX: "addx",
};
const cycleValues = [0, 40, 80, 120, 160, 200, 240];
let X = 1;
let currentCycle = 1;
let currentCommand = 0;
const signalStrength = {};
let currentCPR = new Array(40).fill(".");
let repeat = false;
console.log(currentCycle <= 240);
while (currentCycle <= 240) {
	// console.log(currentCycle);
	// console.log
	drawPIXEL(currentCycle, X);
	const command = instructions[currentCommand];
	const [instruction, value] = command.split(" ");
	console.log("X", X, "Cycle", currentCycle, instructions[currentCommand]);

	if (instruction == commands.NOOP) {
		currentCommand++;
		currentCycle++;
	} else {
		if (repeat) {
			// console.log(value, instruction);
			X = X + Number(value);
			repeat = false;
			currentCycle++;
			currentCommand++;
		} else {
			// do nothing. set the repeat to true and increment the cycle
			currentCycle++;
			repeat = true;
		}
	}
}
// console.log(signalStrength);
function drawPIXEL(cycle, x) {
	// let

	if (
		(cycle % 40) - 1 == x ||
		(cycle % 40) - 1 == x - 1 ||
		(cycle % 40) - 1 == x + 1
	) {
		console.log(cycle, x);
		currentCPR[(cycle % 40) - 1] = "#";
	}
	if (cycleValues.includes(cycle)) {
		// console.log(x, cycle);

		// let strength = cycle * x;
		signalStrength[cycle] = currentCPR;
		currentCPR = new Array(40).fill(".");
	}
}

// const sum = Object.values(signalStrength).reduce((accm, value) => {
// 	return accm + value;
// }, 0);
let cpr = "";
Object.values(signalStrength).forEach((c) => {
	// console.log(c.length);
	console.log(c.join(""));
	// cpr = cpr + "\n";
});
// console.log(cpr);
// console.log(currentCPR.length);
