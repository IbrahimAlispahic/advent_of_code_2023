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

const differByOnePosition = (arr1, arr2) => {
    let differenceCount = 0

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            differenceCount++
            if (differenceCount > 1) {
                return false // More than one difference
            }
        }
    }

    return differenceCount === 1 // True if there's exactly one difference, false otherwise
}

const checkForMirror = (pattern, index, noRows, smugeFound) => {
    let leftIndex = index - 1
    let rightIndex = index + 2
    while (leftIndex >= 0 && rightIndex < noRows) {
        // console.log('leftIndex: ', leftIndex)
        // console.log('rightIndex: ', rightIndex)
        // console.log('pattern[leftIndex]: ', pattern[leftIndex])
        // console.log('pattern[rightIndex]: ', pattern[rightIndex])
        if (pattern[leftIndex] !== pattern[rightIndex]) {
            const differByOnePos = differByOnePosition(pattern[leftIndex], pattern[rightIndex])
            if(!differByOnePos || smugeFound) {
                return false
            } else {
                smugeFound = true
            }
        }
        leftIndex--
        rightIndex++
    }
    if(smugeFound) {
        return true
    }
    return false
}

const findMirror = (pattern) => {
    const noRows = pattern.length
    for (let i = 0; i < noRows - 1; i++) {
        const differByOnePos = differByOnePosition(pattern[i], pattern[i + 1])
        if (pattern[i] === pattern[i + 1] || differByOnePos) {
            const isMirror = checkForMirror(pattern, i, noRows, differByOnePos)
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
    // console.log('leftIndex found: ', leftIndex)

}

// console.log('patterns: ', patterns)
console.log('RESULT: ', totalSum)
