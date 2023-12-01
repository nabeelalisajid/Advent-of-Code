const fs = require("fs");
const fileName = "./input.txt";
const fileData = fs.readFileSync(fileName, "utf-8").split("$ cd");

const LIST = '$ ls';
const DIRECTORY = 'dir'
const MOVEOUT = '..'
const commands = {
	cd: {
		x: "in",
		"..": "out",
		"/": "switches",
	},
	ls: {},
};
const directoryStructure = {
  '/home': 0
}
const currentDirectory = []
const commandsExecuted = [];
for (let item of fileData) {
	commandsExecuted.push(item.split("\n").filter((d) => d.length > 1));
}
commandsExecuted.forEach(command => {
  // console.log(command)
  if(command.length > 1) {
    const changedDirectory = command[0].trim();
    if(changedDirectory == '/') {
      currentDirectory.push('/home');
    } else {
      // if(changedDirectory == '..')
      currentDirectory.push(changedDirectory);
    }
    console.log(currentDirectory);
    // let current
    for(let i = 1; i< command.length;i++) {
      if(command[i] == LIST) {
        // next are content of directory
      } else {
        const [type, name] = command[i].split(' ');
        if(type == DIRECTORY) {
          // const nestedDirectries = {}
          // for(let subDirectory of currentDirectory) {
          //   if(!directoryStructure[subDirectory]) {
          //     directoryStructure[subDirectory] = {}
          //   }
          //   nestedDirectries = di;
          // }
          const homePath = currentDirectory.join("/");
          const currentPath = `${homePath}/${name}`
          if(!directoryStructure[currentPath]) {
            directoryStructure[currentPath]  = 0;
          }
          // console.log(currentPath);
          // directoryStructure[];
        } else {
          const [size, name] = command[i].split(' ');
          // console.log(size);
          let pathName = ''
          for(let parentDirectory of currentDirectory) {
            pathName = pathName.length > 1 ? `${pathName}/` : ''
            pathName = `${pathName}${parentDirectory}`;
            console.log(pathName, directoryStructure[pathName]);
            if (directoryStructure.hasOwnProperty(pathName)) {
							const sizePresent = directoryStructure[pathName];
							// console.log("sizePresent", sizePresent);
							directoryStructure[pathName] = sizePresent + Number(size);
						}
            console.log(directoryStructure);
          }
        }
      }

    }

  } else {
    // movedOut
    currentDirectory.pop();
  }
  // move out;
})

const atMost = 100000;
let lastCloset = 0;
let currentvalue = 0
const values = Object.values(directoryStructure);
values.forEach(value => {
  if(value <= atMost) {
    // lastCloset = value;
    currentvalue += value;
  }
})
console.log(currentvalue, lastCloset)