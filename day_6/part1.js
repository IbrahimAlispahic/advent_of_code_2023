import myData from './data.js'

const testData = `Time:      7  15   30
Distance:  9  40  200`

const rowData = myData.split("\n")
// console.log('rowData: ', rowData);

const extractNumbers = (data) => {
    return data.split(':')[1].split(' ')
        .map(element => Number(element))
        .filter(element => element !== 0)
}


const timeData = extractNumbers(rowData[0])
const distanceData = extractNumbers(rowData[1])

const racesNum = timeData.length
let recordCtr = []
for (let i = 0; i < racesNum; i++) {
    recordCtr.push(0)
    for (let hold = 1; hold < timeData[i] - 1; hold++) {
        const travelDistance = hold * (timeData[i] - hold)
        if (travelDistance > distanceData[i]) {
            recordCtr[i]++
        }
    }
}
console.log('recordCtr: ', recordCtr);

const result = recordCtr.reduce((accumulator, currentValue) => accumulator * currentValue, 1)

console.log('RESULT: ', result);


