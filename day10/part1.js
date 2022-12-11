const fs = require("fs");

const instructions = fs.readFileSync("./input.txt", "utf-8").split("\n");

const commands = {
	NOOP: "noop",
	ADDX: "addx",
};
const cycleValues = [20, 60, 100, 140, 180, 220];
let X = 1;
let currentCycle = 1;
let currentCommand = 0;
const signalStrength = {};
let repeat = false;
console.log(currentCycle <= 220);
while (currentCycle <= 220) {
	// console.log(currentCycle);
	// console.log
	calculateStrength(currentCycle, X);
	const command = instructions[currentCommand];
	const [instruction, value] = command.split(" ");
	console.log("X", X, "Cycle", currentCycle);

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
console.log(signalStrength);
function calculateStrength(cycle, x) {
	if (cycleValues.includes(cycle)) {
		console.log(x, cycle);

		let strength = cycle * x;
		signalStrength[cycle] = strength;
	}
}

const sum = Object.values(signalStrength).reduce((accm, value) => {
	return accm + value;
}, 0);
console.log(sum);
