import myData from './data.js'

const testData = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`

const rowData = myData.split("\n")
// console.log('rowData: ', rowData)

let data = []
rowData.forEach((row) => {
    data.push([...row])
})

const findAllDotsCols = (first, second) => {
    let dotColsCtr = 0

    let from = first.column
    let to = second.column
    if (first.column > second.column) {
        from = second.column
        to = first.column
    }

    const transposedData = Array.from({ length: noCols }, (_, colIndex) => {
        return data.reduce((acc, row) => acc + row[colIndex], '').split('')
    })

    for (let i = from + 1; i < to; i++) {
        if (transposedData[i].every(element => element === '.')) {
            dotColsCtr++
        }
    }
    return dotColsCtr
}

const findAllDotsRows = (first, second) => {
    let dotRowsCtr = 0
    // console.log(first, second)
    for (let i = first.row + 1; i < second.row; i++) {
        if (data[i].every(element => element === '.')) {
            dotRowsCtr++
        }
    }
    return dotRowsCtr
}

const findSingleDistance = (first, second) => {
    const duplicatedRows = findAllDotsRows(first, second)
    const duplicatedCols = findAllDotsCols(first, second)
    // console.log('duplicatedRows: ', duplicatedRows)
    // console.log('duplicatedCols: ', duplicatedCols)
    return Math.abs(first.row - second.row) + 1000000 * duplicatedRows - duplicatedRows +
        Math.abs(first.column - second.column) + 1000000 * duplicatedCols - duplicatedCols
}

const findDistances = (pos) => {
    let totalDistance = 0
    for (let i = pos.row; i < noRows; i++) {
        for (let j = 0; j < noCols; j++) {
            if (i === pos.row && j <= pos.column) {
                continue
            }
            const currentElement = data[i][j]
            const newPos = { row: i, column: j }
            if (currentElement === '#') {
                const currentDistance = findSingleDistance(pos, newPos)
                // console.log('findSingleDistance: ', pos, newPos, currentDistance)
                totalDistance += currentDistance
            }
        }
    }
    return totalDistance
}

const noRows = data.length
const noCols = data[0].length

let totalSum = 0
for (let i = 0; i < noRows; i++) {
    for (let j = 0; j < noCols; j++) {
        const currentElement = data[i][j]
        const position = { row: i, column: j }
        if (currentElement === '#') {
            totalSum += findDistances(position)
        }
    }
}
// console.log('data: ', data)
console.log('RESULT: ', totalSum);
