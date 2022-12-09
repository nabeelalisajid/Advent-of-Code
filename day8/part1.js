const fs = require("fs");
const fileName = "./input.txt";
const columns = fs
	.readFileSync(fileName, "utf-8")
	.split("\n")
	.map((i) => i.split("").map(Number));

const DUPLICATED_EDGES_COUNT = 4;
let treeCount = 0;
for (let rowIndex = 1; rowIndex < columns.length - 1; rowIndex++) {
	for (
		let columnIndex = 1;
		columnIndex < columns[rowIndex].length - 1;
		columnIndex++
	) {
		if (checkIfTreeIsVisible(rowIndex, columnIndex)) {
			treeCount++;
		}
	}
}
const edges = 2 * (columns.length + columns[0].length) - DUPLICATED_EDGES_COUNT;
console.log(treeCount + edges);


function checkIfTreeIsVisible(columnIndex, rowIndex) {
	const row = columns[columnIndex];
	const tree = row[rowIndex];
	const treePlaceX = rowIndex;
	const treePlaceY = columnIndex;
	const column = [];
	let canSeeTop = true;
	let canSeeBottom = true;
	let canSeeRight = true;
	let canSeeLeft = true;
	for (let i = 0; i < columns.length; i++) {
		column.push(columns[i][treePlaceX]);
	}

	const topEdge = column[0];
	const bottomEdge = column[column.length - 1];
	const leftEdge = row[0];
	const rightEdge = row[row.length - 1];

	if (topEdge >= tree) {
		canSeeTop = false;
	}
	for (let i = 1; i < treePlaceY; i++) {
		if (column[i] >= tree) {
			canSeeTop = false;
		}
	}

	if (bottomEdge >= tree) {
		canSeeBottom = false;
	}
	for (let i = treePlaceY + 1; i < column.length - 1; i++) {
		if (column[i] >= tree) {
			canSeeBottom = false;
		}
	}

	if (leftEdge >= tree) {
		canSeeLeft = false;
	}
	for (let i = 1; i < treePlaceX; i++) {
		if (row[i] >= tree) {
			canSeeLeft = false;
		}
	}
	if (rightEdge >= tree) {
		canSeeRight = false;
	}
	for (let i = treePlaceX + 1; i < row.length - 1; i++) {
		if (row[i] >= tree) {
			canSeeRight = false;
		}
	}
	console.log(
		"Row",
		row,
		"Column",
		column,
		"Tree Place Y",
		treePlaceY + 1,
		"Tree Place X",
		treePlaceX + 1,
		"Tree",
		tree,
		canSeeTop,
		canSeeBottom,
		canSeeRight,
		canSeeLeft
	);
	return canSeeTop || canSeeBottom || canSeeRight || canSeeLeft;
}
