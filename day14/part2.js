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

function rotate90Degrees(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    let rotatedMatrix = [];

    for (let col = 0; col < cols; col++) {
        let newRow = [];
        for (let row = rows - 1; row >= 0; row--) {
            newRow.push(matrix[row][col]);
        }
        rotatedMatrix.push(newRow);
    }

    return rotatedMatrix;
}


const roll = (data) => {
    const rowLen = rowData[0].length
    // available row indexes to move for each column
    let availableRowIndexes = new Array(rowLen).fill(-1)
    let moves = []
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
    return data
}

let data = []
rowData.forEach((row) => {
    data.push(row.split(''))
})


// Function to perform one complete cycle
const performOneCycle = (matrix) => {
    // Roll North
    matrix = roll(matrix)

    // Roll West
    matrix = rotate90Degrees(matrix)
    matrix = roll(matrix)

    // Roll South
    matrix = rotate90Degrees(matrix)
    matrix = roll(matrix)

    // Roll East
    matrix = rotate90Degrees(matrix)
    matrix = roll(matrix)

    matrix = rotate90Degrees(matrix)

    return matrix
}

const calculateTheLoad = (data) => {
    //calculate the load
    let totalSum = 0
    data.forEach((row, rowIndex) => {
        row.forEach((cell) => {
            if (cell === 'O') {
                totalSum += (data.length - rowIndex)
            }
        })
    })
    console.log('RESULT: ', totalSum)
    return totalSum
}

let cyclesNo = 0
while (cyclesNo++ < 10000) {
    // Perform the cycle
    data = performOneCycle(data)
    calculateTheLoad(data)
}
// console.log('data: ', data)

