const fs = require("fs");
const readFile = fs.readFileSync("input.txt", "utf8");

const input = readFile.split("\n");

function part1() {
	const maxCubes = {
		red: 12,
		green: 13,
		blue: 14,
	};
	let totalPossible = 0;
	input.forEach((line) => {
		const [game, subSetsText] = line.split(":");
		const gameId = game.split(" ")[1];
		let possible = true;
		for (let subSet of subSetsText.split(";")) {
			for (let subSetMin of subSet.split(",")) {
				const [count, color] = subSetMin.trim().split(" ");

				if (count > maxCubes[color]) {
					possible = false;
				}
			}
		}

		if (possible) {
			totalPossible += Number(gameId);
		}
	});
	console.log("totalPossible", totalPossible);
}

function part2() {
	const powerOfSet = [];
	input.forEach((line) => {
		const [game, subSetsText] = line.split(":");
		const gameId = game.split(" ")[1];

		const minimumPossible = {};
		for (let subSet of subSetsText.split(";")) {
			for (let subSetMin of subSet.split(",")) {
				const [count, color] = subSetMin.trim().split(" ");
				if (!minimumPossible[color]) {
					minimumPossible[color] = Number(count);
				} else if (minimumPossible[color] < Number(count)) {
					minimumPossible[color] = Number(count);
				}
			}
		}
		powerOfSet.push(
			Object.values(minimumPossible).reduce((acc, curr) => acc * curr, 1)
		);
	});
	const total = powerOfSet.reduce((acc, curr) => acc + curr, 0);
	console.log(" Total", total);
}

part1();
part2();
