const fs = require("fs");
const fileName = "./input.txt";

const fileData = fs.readFileSync(fileName, "utf-8");

let map = {};
let characterAppear = 0;
const window = 4;
const windowStart = true;
const arr = [];
for (let i = 0; i < fileData.length -3; i++) {
  // const windowLength = i +4 >
  console.log
	for (let j = i; j < i + 4 ; j++) {
		const ch = fileData.charAt(j);
    map[ch] = true;
	}
  console.log(map);
  Object.keys(map).length == 4 ? characterAppear = i  + window: null;
  map = {}
  if(characterAppear > 0)break;
}
console.log(characterAppear);
