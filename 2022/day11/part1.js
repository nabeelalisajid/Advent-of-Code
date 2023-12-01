const fs = require("fs");
const data = fs.readFileSync("./input.txt", "utf-8").split("\n\n");
// console.log(data);
const itemsInspected = {};
const monkeys = {};
const OPERATORS = {
	ADD: "+",
	SUBTRACT: "-",
	MULTIPLY: "*",
	DIVIDE: "/",
};
function performOperation(monkey, value) {
	// let
	let worryLevel = 0;
	let operationByValue = Number(monkey.operationBy);
	if (monkey.operationBy == "old") {
		operationByValue = value;
	}
	// console.log(value, monkey.operation, operationByValue, monkey.divisibleBy);
	switch (monkey.operation) {
		case OPERATORS.ADD:
			worryLevel = value + operationByValue;
			break;
		case OPERATORS.MULTIPLY:
			worryLevel = value * operationByValue;
			break;
		case OPERATORS.SUBTRACT:
			worryLevel = value - operationByValue;
			break;
		case OPERATORS.DIVIDE:
			worryLevel = value / operationByValue;
			break;
	}
	let tempworryLevel = Number((worryLevel / 3).toString().split(".")[0]);
	console.log(worryLevel, tempworryLevel, monkey.operation);
	if (tempworryLevel % monkey.divisibleBy == 0) {
		// true
		console.log("I am divisibleby", monkey.divisibleBy);
		const monkeyToThrow = `monkey_${monkey.inCaseOfTrue}`;
		monkeys[monkeyToThrow].items.push(tempworryLevel);
	} else {
		// false
		// console.log(worryLevel, monkey.divisibleBy);

		// console.log(`monkey_${monkey.incaseOfFalse}`, Object.keys(monkeys));
		const monkeyToThrow = `monkey_${monkey.incaseOfFalse}`;
		// console.log(monkeyToThrow)
		monkeys[monkeyToThrow].items.push(tempworryLevel);
	}
}
function formatMonkeyInformaiton() {
	data.forEach((monkeyInfo) => {
		let [monkeyName, startingItems, operation, Test, testTrue, testFalse] =
			monkeyInfo.split("\n").map((r) => r.trim());
		const [name, number] = monkeyName.split(" ");
		const startingItemsValues = startingItems
			.split("Starting items: ")
			.join("")
			.trim("")
			.split(",")
			.map((i) => Number(i));
		//const moveInstructions = [
		// ...moves.matchAll(/move (\d+) from (\d+) to (\d+)/g),
		// ];
		operation = operation.trim();
		const [operationToDo, by] = operation
			.split("Operation: new = old ")
			.join("")
			.trim()
			.split(" ");
		const testToPerformBy = Test.split("Test: divisible by ").join("").trim();
		// console.log(testToPerformBy);

		const throwToInCaseOfTrue = testTrue
			.trim()
			.split("If true: throw to monkey ")
			.join("")
			.trim();
		const throwToInCaseOfFalse = testFalse
			.trim()
			.split("If false: throw to monkey ")
			.join("")
			.trim();
		// const afterOperativeValues =
		monkeyNumber = number.replace(":", "");
		const monkeyNameKey = `${name.toLowerCase()}_${monkeyNumber}`;
		// console.log(monkeyNameKey, startingItemsValues);
		monkeys[monkeyNameKey] = {
			items: startingItemsValues,
			operation: operationToDo,
			operationBy: by,
			divisibleBy: Number(testToPerformBy),
			inCaseOfTrue: throwToInCaseOfTrue,
			incaseOfFalse: throwToInCaseOfFalse,
		};
		itemsInspected[monkeyNameKey] = 0;
	});
}

// console.log(monkeys);
formatMonkeyInformaiton();
for (let i = 0; i < 20; i++) {
	for (let key in monkeys) {
		const monkey = monkeys[key];
		for (let value of monkey.items) {
			performOperation(monkey, Number(value));
		}
		itemsInspected[key] = itemsInspected[key] + monkey.items.length;
		monkeys[key].items = [];
		console.log("Round1, ", key);
		console.log(monkeys);
	}
	// break;
}
const valuesInspected = Object.values(itemsInspected).sort((a, b) => {
	return b - a;
});
console.log(valuesInspected[0] * valuesInspected[1]);
