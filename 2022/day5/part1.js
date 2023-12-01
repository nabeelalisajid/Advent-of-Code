const fs = require("fs");
const fileName = "./input.txt";
const fileData = fs.readFileSync(fileName, "utf-8").split("\n\n");
console.log(fileData.length);
const [stacks, moves] = fileData;
let maxStack = 0;
function formatStacks(stacks) {
	const actualStacks = {};
	console.log(stacks);
	const stackColumn = stacks.split("\n").map((line) => {
		return [...line].filter((value, ind) => ind % 4 === 1);
	});

	const totalStacks = stackColumn[stackColumn.length - 1];
	totalStacks.forEach((n) => {
		const index = Number(n);
		actualStacks[index] = [];
	});
	stackColumn.forEach((stackData, index) => {
		if (index !== stackColumn.length - 1) {
			stackData.forEach((dt, index) => {
				// console
				if (dt.trim().length >= 1) {
					actualStacks[index + 1].push(dt);
				}
			});
		}
	});
  for(let key in actualStacks) {
    actualStacks[key] = actualStacks[key].reverse();
  }
	return actualStacks;
}


function calculateMoves(moves) {
	// console.log(moves);
	const moveInstructions = [
		...moves.matchAll(/move (\d+) from (\d+) to (\d+)/g),
	];
	// console.log(moveInstructions);
	const detailInstructions = moveInstructions.map((mo) => {
		const [general, total, origin, desitination, ...res] = mo;
		return { total, origin, desitination };
	});
	return detailInstructions;
}
function firstFirst(stacks) {
  let word = ''
  for(let key in stacks) {
    word = `${word}${stacks[key].pop()}`;
  }
  return word;
}
const stacksWithData = formatStacks(stacks);
const instructions = calculateMoves(moves);
console.log(stacksWithData)
instructions.forEach((intruction) => {
	const { total, origin, desitination } = intruction;
	if (stacksWithData[origin]) {
		for (let i = 0; i < Number(total); i++) {
			if (stacksWithData[origin].length) {
				const moveNumber = stacksWithData[origin].pop();
				stacksWithData[desitination].push(moveNumber);
			}
		}
	}
});
console.log(firstFirst(stacksWithData));
