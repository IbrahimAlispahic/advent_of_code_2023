import myData from './data.js'

const testData = `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`

const rowData = myData.split("\n")
// console.log('rowData: ', rowData)

const rowLen = rowData[0].length
// available row indexes to move for each column
let availableRowIndexes = new Array(rowLen).fill(-1)
let moves = []

let data = []
rowData.forEach((row) => {
    data.push(row.split(''))
})

// determining the moves
data.forEach((row, rowIndex) => {
    for (let i = 0; i < rowLen; i++) {
        // check available columns
        if (row[i] === '.' && availableRowIndexes[i] === -1) {
            availableRowIndexes[i] = rowIndex
        } else if (row[i] === 'O' && availableRowIndexes[i] !== -1) {
            moves.push({ from: rowIndex, to: availableRowIndexes[i], col: i })
            availableRowIndexes[i] += 1
        } else if (row[i] !== '.') {
            availableRowIndexes[i] = -1
        }
    }
})

// console.log(moves)
// do the moves
moves.forEach(move => {
    data[move.to][move.col] = 'O'
    data[move.from][move.col] = '.'
})

//calculate the load
let totalSum = 0
data.forEach((row, rowIndex) => {
    row.forEach((cell) => {
        if(cell === 'O') {
            totalSum += (data.length - rowIndex)
        }
    })
})

// console.log('data: ', data)
console.log('RESULT: ', totalSum)
