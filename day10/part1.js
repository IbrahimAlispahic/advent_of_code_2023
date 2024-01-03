import myData from './data.js'

const testData = `7-F7-
.FJ|7
SJLL7
|F--J
LJ.LJ`

const rowData = myData.split("\n")
// console.log('rowData: ', rowData);

function findElementIndex(arrayOfArrays, targetElement) {
    for (let i = 0; i < arrayOfArrays.length; i++) {
        const innerArray = arrayOfArrays[i]
        for (let j = 0; j < innerArray.length; j++) {
            if (innerArray[j] === targetElement) {
                return { row: i, column: j }
            }
        }
    }
    return -1; // Element not found
}

let data = []
rowData.forEach((row) => {
    data.push(row.split(''))
})

// | is a vertical pipe connecting north and south.
// - is a horizontal pipe connecting east and west.
// L is a 90-degree bend connecting north and east.
// J is a 90-degree bend connecting north and west.
// 7 is a 90-degree bend connecting south and west.
// F is a 90-degree bend connecting south and east.
// . is ground; there is no pipe in this tile.
// S is the starting position of the animal; there is a pipe on this tile,
// but your sketch doesn't show what shape the pipe has.
const toSouth = ['|L', '|J', '||', 'F|', 'FL', '7J', '7L', 'FJ', '7|', 'S|', '|S', 'SL', 'SJ']
const toEast = ['L-', '-J', 'F-', 'FJ', 'F7', 'L7', 'LJ', '--', 'S-', '-S', '-7', 'SJ', 'S7']
const toWest = ['--', 'J-', '7-', 'JL', '7L', '7F', 'JF', 'S-', '-S', '-L', '-F', 'SF', 'SL']
const toNorth = ['||', 'L|', 'J|', '|F', '|7', 'LF', 'L7', 'J7', 'JF', 'S|', '|S', 'SF', 'S7']


const findNextConnection = (currentIndex, prevIndex) => {
    const noRows = data.length
    const noCols = data[0].length
    let combination = ''
    // check east
    if (currentIndex.column < noCols - 1 &&
        !(prevIndex.row === currentIndex.row && prevIndex.column === currentIndex.column + 1)) {

        combination = data[currentIndex.row][currentIndex.column] +
            data[currentIndex.row][currentIndex.column + 1]
        // console.log('in east combination: ', combination)
        if (toEast.includes(combination)) {
            return { row: currentIndex.row, column: currentIndex.column + 1 }
        }
    }
    // check west
    if (currentIndex.column > 0 &&
        !(prevIndex.row === currentIndex.row && prevIndex.column === currentIndex.column - 1)) {
        combination = data[currentIndex.row][currentIndex.column] +
            data[currentIndex.row][currentIndex.column - 1]
        // console.log('in west combination: ', combination)
        if (toWest.includes(combination)) {
            return { row: currentIndex.row, column: currentIndex.column - 1 }
        }
    }
    // check north
    if (currentIndex.row > 0 &&
        !(prevIndex.row === currentIndex.row - 1 && prevIndex.column === currentIndex.column)) {
        combination = data[currentIndex.row][currentIndex.column] +
            data[currentIndex.row - 1][currentIndex.column]
        // console.log('in north combination: ', combination)
        if (toNorth.includes(combination)) {
            return { row: currentIndex.row - 1, column: currentIndex.column }
        }
    }
    // check south
    if (currentIndex.row < noRows - 1 &&
        !(prevIndex.row === currentIndex.row + 1 && prevIndex.column === currentIndex.column)) {
        combination = data[currentIndex.row][currentIndex.column] +
            data[currentIndex.row + 1][currentIndex.column]
        // console.log('in south combination: ', combination)
        if (toSouth.includes(combination)) {
            return { row: currentIndex.row + 1, column: currentIndex.column }
        }
    }
    return -1
}

const sIndex = findElementIndex(data, 'S')

let currentIndex = sIndex
let prevIndex = currentIndex
let loopFound = false
let loopSize = 0
while (!loopFound) {
    const newIndex = findNextConnection(currentIndex, prevIndex)
    // console.log('newIndex: ', newIndex)
    if ((newIndex.row === sIndex.row && newIndex.column === sIndex.column) || newIndex === -1) {
        loopFound = true
    }
    prevIndex = currentIndex
    currentIndex = newIndex
    loopSize++
    // console.log('LOOP SIZE: ', loopSize)
}
const result = Math.ceil((loopSize - 1) / 2)

console.log('RESULT: ', result)
