// TEST DATA
// const time = 71530
// const distance = 940200

// REAL DATA
const time = 51699878
const distance = 377117112241505

let recordCtr = 0

for (let hold = 1; hold < time - 1; hold++) {
    const travelDistance = hold * (time - hold)
    if (travelDistance > distance) {
        recordCtr++
    }
}

console.log('RESULT: ', recordCtr);


