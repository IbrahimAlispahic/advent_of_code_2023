import { realSequence, realData } from './data.js'

const testSequence = `LR`
const testData = `11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`

const rowData = realData.split("\n")
const sequence = [...realSequence]

// console.log('rowData: ', rowData)

let positions = []
rowData.forEach((row) => {
    const position = {
        name: row.split(' = ')[0],
        leftMove: row.split(' = ')[1].split(', ')[0].split('(')[1],
        rightMove: row.split(' = ')[1].split(', ')[1].split(')')[0]
    }
    positions.push(position)
})

// console.log('positions: ', positions)
// console.log('sequence: ', sequence)

const getCycleCount = (position) => {
    let sequenceIndex = 0
    let moveCtr = 0
    let currentPosition = position
    while (!currentPosition.name.endsWith('Z')) {
        currentPosition = positions
            .find(position =>
                sequence[sequenceIndex] === 'L' ?
                    position.name === currentPosition.leftMove :
                    position.name === currentPosition.rightMove)

        moveCtr++
        sequenceIndex = (sequenceIndex + 1) % sequence.length
    }
    return moveCtr
}

// Function to find the GCD (Greatest Common Divisor) of two numbers
function findGCD(a, b) {
    return b === 0 ? a : findGCD(b, a % b);
}

// Function to find the LCM (Least Common Multiple) of two numbers
function findLCM(a, b) {
    return (a * b) / findGCD(a, b);
}

const calculateLCM = (cycleCounters) => {
    let lcm = cycleCounters[0]

    for (let i = 1; i < cycleCounters.length; i++) {
        lcm = findLCM(lcm, cycleCounters[i])
    }
    return lcm
}

let currentPositions = positions.filter(position => position.name.endsWith('A'))
let cycleCounters = []
for (const currentPosition of currentPositions) {
    const cycleCount = getCycleCount(currentPosition)
    cycleCounters.push(cycleCount)
}

console.log('cycleCounters: ', cycleCounters)
const result = calculateLCM(cycleCounters)
console.log('RESULT: ', result)