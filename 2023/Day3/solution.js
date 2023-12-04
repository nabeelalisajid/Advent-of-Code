const fs = require("fs");
const readFile = fs.readFileSync("input.txt", "utf8");

const input = readFile.split("\n");

function isANumber(number) {
	return !isNaN(+number);
}
let n = 0;

function part1() {
	const partNumbersMap = [];
	input.forEach((line, index) => {
		const numbers = line
			.replace(/[^\w\s.]/g, ".")
			.split(".")
			.filter((t) => isANumber(t))
			.filter((t) => t !== "");
		let tempLine = line;
		for (let number of numbers) {
			const startIndex = tempLine.indexOf(number);
			tempLine = tempLine.replace(number, "x".repeat(number.length));
			partNumbersMap.push({
				number: Number(number),
				row: index,
				colStart: startIndex,
				colEnd: startIndex + number.length - 1,
			});
		}
	});

	const engineSchematic = Array(input.length);
	for (let i = 0; i < input.length; i++) {
		engineSchematic[i] = input[i].split("");
	}
	const numbers = [];
	const FIRST_ROW = 0;
	const LAST_ROW = engineSchematic.length - 1;
	const FIRST_COLUMN = 0;
	const LAST_COLUMN = engineSchematic[1].length - 1;
	for (let partNumber of partNumbersMap) {
		const { row, colStart, colEnd, number } = partNumber;
		n = number;

		let symbolExists = false;
		let counter = colStart;
		while (counter <= colEnd) {
			if (
				isNumberAdjacent(
					engineSchematic,
					row,
					counter,
					FIRST_ROW,
					LAST_ROW,
					FIRST_COLUMN,
					LAST_COLUMN
				)
			) {
				symbolExists = true;
				break;
			}
			counter++;
		}
		if (symbolExists) {
			numbers.push(Number(number));
		}
	}
	fs.writeFileSync("test.json", JSON.stringify(numbers));
	const sum = numbers.reduce((acc, curr) => acc + curr, 0);
	console.log("sum", sum);
}

function isNumberAdjacent(
	arr,
	row,
	column,
	FIRST_ROW,
	LAST_ROW,
	FIRST_COLUMN,
	LAST_COLUMN
) {
	const ifSymbolPresentBySides = checkSide(
		arr,
		row,
		column,
		FIRST_ROW,
		LAST_ROW,
		FIRST_COLUMN,
		LAST_COLUMN
	);
	const ifSymbolpresentByDiagonal = checkDiagonal(
		arr,
		row,
		column,
		FIRST_ROW,
		LAST_ROW,
		FIRST_COLUMN,
		LAST_COLUMN
	);
	return ifSymbolPresentBySides || ifSymbolpresentByDiagonal;
}

function checkDiagonal(
	arr,
	row,
	column,
	FIRST_ROW,
	END_ROW,
	FIRST_COLUMN,
	END_COLUMN
) {
	let symbolExists = false;
	if (row != FIRST_ROW && column !== FIRST_COLUMN) {
		// check top left

		if (isSymbol(arr[row - 1][column - 1])) {
			return true;
		}
	}
	if (row != FIRST_ROW && column !== END_COLUMN) {
		if (isSymbol(arr[row - 1][column + 1])) {
			return true;
		}
		// check top right
	}
	if (row !== END_ROW && column !== FIRST_COLUMN) {
		// check bottom left

		if (isSymbol(arr[row + 1][column - 1])) {
			return true;
		}
	}
	if (row !== END_ROW && column !== END_COLUMN) {
		// check right

		if (isSymbol(arr[row + 1][column + 1])) {
			return true;
		}
	}
	return symbolExists;
}
function checkSide(
	arr,
	row,
	column,
	FIRST_ROW,
	END_ROW,
	FIRST_COLUMN,
	END_COLUMN
) {
	let symbolExists = false;
	if (row != FIRST_ROW) {
		// check top
		if (isSymbol(arr[row - 1][column])) {
			return true;
		}
	}
	if (row != END_ROW) {
		if (isSymbol(arr[row + 1][column])) {
			return true;
		}
		// check bottom
	}
	if (column !== FIRST_COLUMN) {
		// check left

		if (isSymbol(arr[row][column - 1])) {
			return true;
		}
	}
	if (column !== END_COLUMN) {
		// check right

		if (isSymbol(arr[row][column + 1])) {
			return true;
		}
	}
	return symbolExists;
}

function isSymbol(ch) {
	return /[^\w\s.]/.test(ch);
}
part1();
