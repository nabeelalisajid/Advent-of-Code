package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func main() {
	data, err := os.ReadFile("./data.txt")
	check(err)
	// fmt.Print(string(data))
	lines := strings.Split(string(data), "\n\n")
	// fmt.Print(string(lines[0]))
	var maxNum int64 = 0

	for _, element := range lines {
		// fmt.Print(element)
		subLines := strings.Split(element, "\n")
		var tempSum int64 = 0
		for _, subLine := range subLines {
			i, _ := strconv.ParseInt(subLine, 10, 64)
			tempSum = tempSum + i
		}
		if tempSum > maxNum {
			maxNum = tempSum
		}
	}
	fmt.Print(maxNum)
}
