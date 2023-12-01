const fs = require("fs");
const fileName = "./input.txt";
const fileData = fs.readFileSync(fileName, "utf-8").split("\n");
const commonItemsType = [];
for(let i = 0; i < fileData.length - 2; i = i + 3) {
  const groupLine1 = fileData[i];
  const groupLine2 = fileData[i+1];
  const groupLine3 = fileData[i+2];

  const groupLine2Map = {};
  const groupLine3Map = {};
  for(let j = 0; j < groupLine2.length; j++) {
    groupLine2Map[groupLine2.charAt(j)] = true;
  }
  for(let j = 0; j < groupLine3.length; j++) {
    groupLine3Map[groupLine3.charAt(j)] = true;
  }
  // console.log(i, i+1, i+2)
  for(let j = 0; j< groupLine1.length; j++) {
    // if()
    const charCode = groupLine1.charAt(j);

    if(groupLine2Map[charCode] && groupLine3Map[charCode]) {
      console.log("Chart found",charCode, groupLine2Map, groupLine3Map)
      commonItemsType.push(charCode);
      delete groupLine2Map[charCode]
      delete groupLine3Map[charCode]
    }
  }
}
let priority = 0;
console.log(commonItemsType)
commonItemsType.forEach((item) => {
	const charCode = item.charCodeAt(0);
	if (charCode >= 97 && charCode <= 122) {
		// letter is small;
		priority += charCode - 96;
	} else {
		// let is big;
		const localPriority = charCode - 64;
		priority += localPriority + 26;
	}
});
console.log(priority);
