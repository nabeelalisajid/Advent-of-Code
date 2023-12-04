const fs = require("fs");
const readFile = fs.readFileSync("input.txt", "utf8");

const input = readFile.split("\n");

function part1() {
	const points = [];
	input.forEach((line, index) => {
		const numbers = line.split(":")[1];
		let [winningNumbers, myNumbers] = numbers.split("|");
		winningNumbers = winningNumbers
			.trim()
			.split(" ")
			.filter((a) => a != "");

		myNumbers = myNumbers
			.trim()
			.split(" ")
			.filter((a) => a != "");

		const diff = difference(winningNumbers, myNumbers);

		if (diff.length > 0) {
			points.push(Math.pow(2, diff.length - 1));
		}
	});
	const totalPoints = points.reduce((acc, curr) => acc + curr, 0);
	console.log("Part 1 ==> ", totalPoints);
}
function difference(array1, array2) {
	const set2 = new Set(array2);
	return array1.filter((element) => set2.has(element));
}

function part2() {
	const scratchCards = {};
	const points = input.map((line, index) => {
		const [card, numbers] = line.split(":");

		const cardNumber = card.split(" ")[1];

		let [winningNumbers, myNumbers] = numbers.split("|");

		winningNumbers = winningNumbers
			.trim()
			.split(" ")
			.filter((a) => a != "");

		myNumbers = myNumbers
			.trim()
			.split(" ")
			.filter((a) => a != "");

		const diff = difference(winningNumbers, myNumbers);

		const currentScratchCard = scratchCards[index + 1]
			? scratchCards[index + 1]
			: 1;
		if (diff.length > 0) {
			for (let i = 1; i <= diff.length; i++) {
				if (scratchCards[index + 1 + i]) {
					scratchCards[index + 1 + i] += currentScratchCard;
				} else {
					scratchCards[index + 1 + i] = currentScratchCard + 1;
				}
			}
		}
		return currentScratchCard;
	});

	const totalPoints = points.reduce((acc, curr) => acc + curr, 0);
	console.log("Part 2 ==>", totalPoints);
}
part1();
part2();
