import { realSequence, realData } from './data.js'

const testSequence = `RL`
const testData = `AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`

const rowData = realData.split("\n")
const sequence = [...realSequence]

// console.log('rowData: ', rowData);

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

let sequenceIndex = 0
let currentPosition = positions.find(position => position.name === 'AAA')
let moveCtr = 0
while (currentPosition.name !== 'ZZZ') {
    currentPosition = positions
        .find(position =>
            sequence[sequenceIndex] === 'L' ?
                position.name === currentPosition.leftMove :
                position.name === currentPosition.rightMove)

    moveCtr++;

    sequenceIndex = (sequenceIndex + 1) % sequence.length;
}

console.log('RESULT: ', moveCtr)
