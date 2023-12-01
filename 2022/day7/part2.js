const fs = require("fs");
const fileName = "./input.txt";
const fileData = fs.readFileSync(fileName, "utf-8").split("$ cd");

const LIST = "$ ls";
const DIRECTORY = "dir";
const HOME = '/';
const directoryStructure = {
	"/home": 0,
};
const currentDirectory = [];
const commandsExecuted = [];
for (let item of fileData) {
	commandsExecuted.push(item.split("\n").filter((d) => d.length > 1));
}
commandsExecuted.forEach((command) => {
	if (command.length > 1) {
		const changedDirectory = command[0].trim();
		if (changedDirectory == HOME) {
			currentDirectory.push("/home");
		} else {
			currentDirectory.push(changedDirectory);
		}

		for (let i = 1; i < command.length; i++) {
			if (command[i] == LIST) {
			} else {
				const [type, name] = command[i].split(" ");
				if (type == DIRECTORY) {
					const homePath = currentDirectory.join("/");
					const currentPath = `${homePath}/${name}`;
					if (!directoryStructure[currentPath]) {
						directoryStructure[currentPath] = 0;
					}
				} else {
					const [size, name] = command[i].split(" ");

					let pathName = "";
					for (let parentDirectory of currentDirectory) {
						pathName = pathName.length > 1 ? `${pathName}/` : "";
						pathName = `${pathName}${parentDirectory}`;
						if (directoryStructure.hasOwnProperty(pathName)) {
							const sizePresent = directoryStructure[pathName];
							directoryStructure[pathName] = sizePresent + Number(size);
						}
					}
				}
			}
		}
	} else {
		// movedOut
		currentDirectory.pop();
	}
	// move out;
});
const totalSize = 70000000
const sizeNeeded = 30000000; //23542809;
let lastCloset = Number.MAX_VALUE;
let currentvalue = 0;
const unUsedSpace = totalSize - directoryStructure["/home"];
const spaceRequired = sizeNeeded - unUsedSpace;
const value = Object.values(directoryStructure)
	.filter((v) => v >= spaceRequired)
	.sort((a, b) => a - b)[0];
console.log(value)