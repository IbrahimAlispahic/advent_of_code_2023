import myData from './data.js'

const testData = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`


const mapper = (map) => {
    map = map.split("\n")
    let mapperArrays = []
    map.forEach(row => {
        mapperArrays.push(row.split(' ').map(element => Number(element)))
    })
    return mapperArrays
}

const calculateNextRow = (row) => {
    let nextRow = []
    for (let i = 1; i < row.length; i++) {
        nextRow.push(row[i] - row[i - 1])
    }
    return nextRow
}

const checkIfAllZeros = (row) => {
    return row.every(element => element === 0)
}

const extrapolateValue = (allRows) => {
    const lastRowLength = allRows[allRows.length - 1].length
    let lastRowLastElement = allRows[allRows.length - 1][lastRowLength - 1]
    for (let i = allRows.length - 2; i >= 0; i--) {
        const rowLength = allRows[i].length
        const lastElement = allRows[i][rowLength - 1]
        lastRowLastElement = lastElement + lastRowLastElement
    }
    return lastRowLastElement
}

const data = mapper(myData)


let totalSum = 0
let allRows = []
data.forEach((row, index) => {
    allRows.push(row)
    let nextRow = calculateNextRow(row)
    while (!checkIfAllZeros(nextRow)) {
        allRows.push(nextRow)
        nextRow = calculateNextRow(nextRow)
    }
    // console.log('all rows: ', allRows)
    const extrapolatedValue = extrapolateValue(allRows)
    // console.log('extrapolatedValue: ', extrapolatedValue)
    totalSum += extrapolatedValue
    allRows = []
})

console.log('RESULT: ', totalSum);
