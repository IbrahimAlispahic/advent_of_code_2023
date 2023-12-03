import myData from './data.js'

const testData = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`

const rowData = myData.split("\n")
// console.log('rowData: ', rowData);

const populateMatrix = (rowData) => {
    let matrix = []
    rowData.forEach((row) => {
        let rowElements = []
        for (let i = 0; i < row.length; i++) {
            rowElements.push(row[i])
        }
        matrix.push(rowElements)
    });
    return matrix
}

const checkIfNumber = (element) => {
    return (element >= '0' && element <= '9')
}

const isSybol = (element) => {
    return !checkIfNumber(element) && element !== '.'
}

const checkIfHasAdjecentSybol = (matrix, row, col) => {
    return ((row > 0 && isSybol(matrix[row - 1][col])) ||
        (row < rowNum - 1 && isSybol(matrix[row + 1][col])) ||
        (col > 0 && isSybol(matrix[row][col - 1])) ||
        (col < colNum - 1 && isSybol(matrix[row][col + 1]))||
        (row > 0 && col > 0 && isSybol(matrix[row - 1][col - 1])) ||
        (row > 0 && col < colNum - 1 && isSybol(matrix[row - 1][col + 1])) ||
        (row < rowNum - 1 && col > 0 && isSybol(matrix[row + 1][col - 1])) ||
        (row < rowNum - 1 && col < colNum - 1 && isSybol(matrix[row + 1][col + 1])))
}


let matrix = populateMatrix(rowData)
// console.log('matrix: ', matrix);
const rowNum = matrix.length
const colNum = matrix[0].length


let totalSum = 0
let currentNumber = {
    value: '',
    hasAdjecentSybol: false
}

for (let row = 0; row < rowNum; row++) {
    for (let col = 0; col < colNum; col++) {
        let currentElement = matrix[row][col]
        if (checkIfNumber(currentElement)) {
            if (checkIfHasAdjecentSybol(matrix, row, col)) {
                currentNumber.hasAdjecentSybol = true
            }
            currentNumber.value += currentElement
        } else {
            if (currentNumber.hasAdjecentSybol) {
                totalSum += Number(currentNumber.value)
            }
            currentNumber = {
                value: '',
                hasAdjecentSybol: false
            }
        }
        // console.log('currentNumber: ', currentNumber);
    }
}


console.log('RESULT: ', totalSum);
