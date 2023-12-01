const fs = require("fs");
const fileName = "./input.txt";
const fileData = fs.readFileSync(fileName, "utf-8").split("\n");

let pair = 0;
fileData.forEach((num) => {
	const [first, second] = num.split(",");
	const [firstRangeStart, firstRangeEnd] = first.split("-");
	const [secondRangeStart, secondRangeEnd] = second.split("-");

	if (
		Number(firstRangeStart) >= Number(secondRangeStart) &&
		Number(firstRangeStart) <= Number(secondRangeEnd)
	) {
		// pair 1
		console.log(num);
		pair++;
	} else if (
		Number(firstRangeEnd) >= Number(secondRangeStart) &&
		Number(firstRangeEnd) <= Number(secondRangeEnd)
	) {
		//
		console.log(num);
		pair++;
	}else if (
		Number(secondRangeStart) >= Number(firstRangeStart) &&
		Number(secondRangeStart) <= Number(firstRangeEnd)
	) {
		// pair 1
		console.log(num);
		pair++;
	} else if (
		Number(secondRangeEnd) >= Number(firstRangeStart) &&
		Number(secondRangeEnd) <= Number(firstRangeEnd)
	) {
		//
		console.log(num);
		pair++;
	}
});
console.log(pair);
