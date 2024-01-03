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
    let lastRowFirstElement = allRows[allRows.length - 1][0]
    for (let i = allRows.length - 2; i >= 0; i--) {
        const firstElement = allRows[i][0]
        lastRowFirstElement = firstElement - lastRowFirstElement
    }
    return lastRowFirstElement
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
    const extrapolatedValue = extrapolateValue(allRows)
    totalSum += extrapolatedValue
    allRows = []
})

console.log('RESULT: ', totalSum);
