import { realSequence, realData } from './data.js';

const testSequence = `LR`
const testData = `11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`

const rowData = realData.split("\n");
const sequence = [...realSequence];

let positions = [];
rowData.forEach((row) => {
    const position = {
        name: row.split(' = ')[0],
        leftMove: row.split(' = ')[1].split(', ')[0].split('(')[1],
        rightMove: row.split(' = ')[1].split(', ')[1].split(')')[0]
    };
    positions.push(position);
});

function findCycleLength(positions, sequence) {
    let currentPositions = positions.filter(position => position.name.endsWith('A'));
    let visited = new Set();
    let moveCtr = 0;

    while (true) {
        let newPositions = [];
        currentPositions.forEach(currentPosition => {
            const newPosition = positions.find(position =>
                sequence[moveCtr % sequence.length] === 'L' ?
                    position.name === currentPosition.leftMove :
                    position.name === currentPosition.rightMove);

            newPositions.push(newPosition);
        });

        const signature = newPositions.map(position => position.name).join('-');
        if (visited.has(signature)) {
            return moveCtr;
        }

        visited.add(signature);
        currentPositions = newPositions;
        moveCtr++;
    }
}

const cycleLength = findCycleLength(positions, sequence);
const sequenceLength = sequence.length;

// Calculate the LCM of cycleLength and sequenceLength
const lcm = (a, b) => (a * b) / gcd(a, b);
const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
const result = lcm(cycleLength, sequenceLength);

console.log('RESULT: ', result);
