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

const checkIfSymbol = (element) => {
    return element === '*'
}

const checkIfHasAdjecentSybol = (matrix, row, col) => {
    if (row > 0 && checkIfSymbol(matrix[row - 1][col])) {
        return [row - 1, col]
    } else if (row < rowNum - 1 && checkIfSymbol(matrix[row + 1][col])) {
        return [row + 1, col]
    } else if (col > 0 && checkIfSymbol(matrix[row][col - 1])) {
        return [row, col - 1]
    } else if (col < colNum - 1 && checkIfSymbol(matrix[row][col + 1])) {
        return [row, col + 1]
    } else if (row > 0 && col > 0 && checkIfSymbol(matrix[row - 1][col - 1])) {
        return [row - 1, col - 1]
    } else if (row > 0 && col < colNum - 1 && checkIfSymbol(matrix[row - 1][col + 1])) {
        return [row - 1, col + 1]
    } else if (row < rowNum - 1 && col > 0 && checkIfSymbol(matrix[row + 1][col - 1])) {
        return [row + 1, col - 1]
    } else if (row < rowNum - 1 && col < colNum - 1 && checkIfSymbol(matrix[row + 1][col + 1])) {
        return [row + 1, col + 1]
    } else {
        return [-1, -1]
    }
}


let matrix = populateMatrix(rowData)
// console.log('matrix: ', matrix);
const rowNum = matrix.length
const colNum = matrix[0].length


let totalSum = 0
let currentNumber = {
    value: '',
    hasAdjecentSybol: false,
    symbolRow: -1,
    symbolCol: -1
}
let symbols = []

for (let row = 0; row < rowNum; row++) {
    for (let col = 0; col < colNum; col++) {
        let currentElement = matrix[row][col]
        if (checkIfNumber(currentElement)) {
            const symbolPos = checkIfHasAdjecentSybol(matrix, row, col)
            if (symbolPos[0] !== -1) {
                currentNumber.hasAdjecentSybol = true
                currentNumber.symbolRow = symbolPos[0]
                currentNumber.symbolCol = symbolPos[1]
            }
            currentNumber.value += currentElement
        } else {
            if (currentNumber.hasAdjecentSybol) {
                const symbolPos = String(currentNumber.symbolRow) + String(currentNumber.symbolCol)
                const numberIndex = symbols.map(symbol => symbol.position).indexOf(symbolPos)
                if (numberIndex !== -1) {
                    totalSum += Number(currentNumber.value) * Number(symbols[numberIndex].number.value)
                }
                symbols.push({
                    number: currentNumber,
                    position: symbolPos
                })
            }
            currentNumber = {
                value: '',
                hasAdjecentSybol: false,
                sybolPosition: []
            }
        }
    }
}


console.log('RESULT: ', totalSum);
