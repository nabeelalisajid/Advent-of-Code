const fs = require("fs");
const readFile = fs.readFileSync("input.txt", "utf8");

const input = readFile.split("\n");

function isANumber(number) {
	return !isNaN(+number);
}

function part1() {
	const numbers = [];
	input.forEach((text) => {
		const numbersFound = {};
		for (let i = 0; i < text.length; i++) {
			if (isANumber(text[i])) {
				numbersFound[i] = Number(text[i]);
			}
		}
		const values = Object.values(numbersFound);
		const firstNumber = values[0].toString();
		const lastNumber = values[values.length - 1].toString();
		numbers.push(firstNumber + lastNumber);
	});

	const totalSum = numbers.reduce((acc, curr) => acc + Number(curr), 0);
	console.log("part1 ==>", totalSum);
}

function part2() {
	const numbers = [];
	const numbersToText = {
		one: 1,
		two: 2,
		three: 3,
		four: 4,
		five: 5,
		six: 6,
		seven: 7,
		eight: 8,
		nine: 9,
	};
	const numbersToTextArr = Object.keys(numbersToText);
	input.forEach((text) => {
		let numbersFound = {};

		for (let stNum of numbersToTextArr) {
			let matches = [...text.matchAll(stNum)];

			matches.forEach((match) => {
				numbersFound[match.index] = Number(numbersToText[stNum]);
			});
		}
		for (let i = 0; i < text.length; i++) {
			if (isANumber(text[i])) {
				numbersFound[i] = Number(text[i]);
			}
		}

		const values = Object.values(numbersFound);
		const firstNumber = values[0].toString();
		const lastNumber = values[values.length - 1].toString();
		numbers.push(firstNumber + lastNumber);
	});
	const totalSum = numbers.reduce((acc, curr) => acc + Number(curr), 0);
	console.log("part2 ==>", totalSum);
}
part1();
part2();
