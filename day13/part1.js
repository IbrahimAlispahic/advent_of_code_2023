import myData from './data.js'

const testData = `#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#

.#.##.#.#
.##..##..
.#.##.#..
#......##
#......##
.#.##.#..
.##..##.#

#..#....#
###..##..
.##.#####
.##.#####
###..##..
#..#....#
#..##...#`

const rowData = myData.split("\n\n")
// console.log('rowData: ', rowData)

let totalSum = 0
let patterns = []
rowData.forEach((row) => {
    patterns.push(row.split("\n"))
})

const checkForMirror = (pattern, index, noRows) => {
    let leftIndex = index
    let rightIndex = index + 1
    while (leftIndex >= 0 && rightIndex < noRows) {
        // console.log('leftIndex: ', leftIndex)
        // console.log('rightIndex: ', rightIndex)
        // console.log('pattern[leftIndex]: ', pattern[leftIndex])
        // console.log('pattern[rightIndex]: ', pattern[rightIndex])

        if (pattern[leftIndex] !== pattern[rightIndex]) {
            return false
        }
        leftIndex--
        rightIndex++
    }
    return true
}

const findMirror = (pattern) => {
    const noRows = pattern.length
    for (let i = 0; i < noRows; i++) {
        if (pattern[i] === pattern[i + 1]) {
            const isMirror = checkForMirror(pattern, i, noRows)
            if (isMirror) {
                return i + 1
            }
        }
    }
    return -1
}

const transpose = (pattern) => {
    const noCols = pattern[0].length
    return Array.from({ length: noCols }, (_, colIndex) => {
        return pattern.reduce((acc, row) => acc + row[colIndex], '')
    })
}

for (const pattern of patterns) {
    // console.log('pattern: ', pattern)
    // search rows for mirror
    let leftIndex = findMirror(pattern)
    // if no mirror in rows, search columns
    if (leftIndex === -1) {
        const transposedPattern = transpose(pattern)
        // console.log('transposedPattern: ', transposedPattern)
        leftIndex = findMirror(transposedPattern)
        totalSum += leftIndex
    } else {
        totalSum += (leftIndex * 100)
    }
    // console.log('leftIndex: ', leftIndex)

}

// console.log('patterns: ', patterns)
console.log('RESULT: ', totalSum)
