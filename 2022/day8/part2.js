const fs = require("fs");
const fileName = "./input.txt";
const columns = fs
	.readFileSync(fileName, "utf-8")
	.split("\n")
	.map((i) => i.split("").map(Number));

const DUPLICATED_EDGES_COUNT = 4;
let scenicScore = 0;
for (let rowIndex = 1; rowIndex < columns.length - 1; rowIndex++) {
	for (
		let columnIndex = 1;
		columnIndex < columns[rowIndex].length - 1;
		columnIndex++
	) {
		const tempScenicScore = checkIfTreeIsVisible(rowIndex, columnIndex);
		// if ( {
		// 	treeCount++;
		// }
		if (tempScenicScore > scenicScore) {
			scenicScore = tempScenicScore;
		}
	}
}
// const edges = 2 * (columns.length + columns[0].length) - DUPLICATED_EDGES_COUNT;
console.log(scenicScore);

function checkIfTreeIsVisible(columnIndex, rowIndex) {
	const row = columns[columnIndex];
	const tree = row[rowIndex];
	const treePlaceX = rowIndex;
	const treePlaceY = columnIndex;
	const column = [];
	let canSeeTop = 0;
	let canSeeBottom = 0;
	let canSeeRight = 0;
	let canSeeLeft = 0;
	for (let i = 0; i < columns.length; i++) {
		column.push(columns[i][treePlaceX]);
	}

	const topEdge = column[0];
	const bottomEdge = column[column.length - 1];
	const leftEdge = row[0];
	const rightEdge = row[row.length - 1];

	// if (topEdge <= tree) {
	// 	canSeeTop++;
	// }
	for (let i = treePlaceY - 1; i >= 0; i--) {
		if (column[i] < tree) {
			canSeeTop++;
		}
		if (column[i] >= tree) {
			canSeeTop++;
			break;
		}
	}

	for (let i = treePlaceY + 1; i < column.length; i++) {
		if (column[i] < tree) {
			canSeeBottom++;
		}
		if (column[i] >= tree) {
			canSeeBottom++;
			break;
		}
	}

	// if (leftEdge <= tree) {
	// 	canSeeLeft++;
	// }
	for (let i = treePlaceX - 1; i >= 0; i--) {
		if (row[i] < tree) {
			canSeeLeft++;
		}
		if (row[i] >= tree) {
			canSeeLeft++;
			break;
		}
	}
	for (let i = treePlaceX + 1; i < row.length; i++) {
		if (row[i] < tree) {
			canSeeRight++;
		}
		if (row[i] >= tree) {
			canSeeRight++;
			break;
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
		"Scenic Score",
		canSeeTop * canSeeBottom * canSeeRight * canSeeLeft
	);
	return canSeeTop * canSeeBottom * canSeeRight * canSeeLeft;
}
