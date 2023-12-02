import myData from './data.js'

const testData = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`

const rowData = myData.split("\n")
// console.log('rowData: ', rowData);

// red, green, blue
const bagContent = [12, 13, 14]


const findMinBatch = (rowBatch) => {
    const minBatch = []
    for (let col = 0; col < rowBatch[0].length; col++) {
        let min = rowBatch[0][col]
        for (let row = 1; row < rowBatch.length; row++) {
            if (rowBatch[row][col] !== 0 && (rowBatch[row][col] > min || min === 0)) {
                min = rowBatch[row][col]
            }
        }
        minBatch.push(min)
    }
    return minBatch
}

const extractBatch = (batch) => {
    let batchContent = [0, 0, 0]
    batch.forEach(elements => {
        if (elements.includes('red')) {
            elements = elements.replace('red', '').trim()
            batchContent[0] = Number(elements)
        } else if (elements.includes('green')) {
            elements = elements.replace('green', '').trim()
            batchContent[1] = Number(elements)
        } else if (elements.includes('blue')) {
            elements = elements.replace('blue', '').trim()
            batchContent[2] = Number(elements)
        }
    })
    return batchContent
}

let totalSum = 0
rowData.forEach((row, index) => {
    row = row.split(':')[1]
    const cubeBatches = row.split(';')
    let rowBatchContent = []
    for (let i = 0; i < cubeBatches.length; i++) {
        let batch = cubeBatches[i].split(',').map(element => element.trim())

        const batchContent = extractBatch(batch)
        rowBatchContent.push(batchContent)
    }
    const minBatch = findMinBatch(rowBatchContent)
    totalSum += minBatch.reduce((accumulator, currentValue) => accumulator * currentValue, 1)
});

console.log('RESULT: ', totalSum);
