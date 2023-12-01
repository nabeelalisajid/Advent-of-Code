const fs = require("fs");
const fileName = "./input.txt";
const fileData = fs.readFileSync(fileName, "utf-8").split("\n");
  const commonItemsType = [];
fileData.forEach((rucksack) => {

	const compartmentOne = rucksack.substring(0, rucksack.length / 2);
	const compartmentTwo = rucksack.substring(
		rucksack.length / 2,
		rucksack.length
	);
	const compartmentTwoMap = {};
const a = 1;
const z = 26;
const A = 27;
const Z = 52;

	for (let i = 0; i < compartmentTwo.length; i++) {
		compartmentTwoMap[compartmentTwo.charAt(i)] = true;
	}
  // console.log(compartmentTwoMap);
  for(let i = 0; i< compartmentOne.length; i++) {
    const itemType = compartmentOne.charAt(i);
    if(compartmentTwoMap[itemType]) {
      console.log(itemType, compartmentTwoMap)
      commonItemsType.push(itemType);
      delete compartmentTwoMap[itemType]
    }
  }
});
console.log(commonItemsType);
let priority = 0;
commonItemsType.forEach(item => {
  const charCode = item.charCodeAt(0);
  if(charCode >= 97 && charCode <= 122) {
    // letter is small;
    priority += charCode - 96;
  } else {
    // let is big;
    const localPriority = charCode - 64;
    priority += localPriority+26;
  }
})
console.log(priority)