package main

import (
	"fmt"
	"os"
	"sort"
	"strconv"
	"strings"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

type sum struct {
	a int64
}

func main() {
	data, err := os.ReadFile("./data.txt")
	check(err)
	// fmt.Print(string(data))
	lines := strings.Split(string(data), "\n\n")
	// fmt.Print(string(lines[0]))
	// const linesLenght = len(lines)
	var maxNum []int

	for _, element := range lines {
		// fmt.Print(element)
		subLines := strings.Split(element, "\n")
		var tempSum int64 = 0
		for _, subLine := range subLines {
			i, _ := strconv.ParseInt(subLine, 10, 64)
			tempSum = tempSum + i
		}
		maxNum = append(maxNum, int(tempSum))
	}
	sort.Sort(sort.Reverse(sort.IntSlice(maxNum)))
	var sum = maxNum[0] + maxNum[1] + maxNum[2]
	fmt.Print(sum)
}
