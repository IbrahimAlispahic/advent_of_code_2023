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

const checkIfCombinationPossible = (batchContent) => {
    for (let i = 0; i < 3; i++) {
        if (bagContent[i] < batchContent[i]) {
            return false
        }
    }
    return true
}

let totalSum = 0
rowData.forEach((row, index) => {
    row = row.split(':')[1]
    const cubeBatches = row.split(';')
    let combinationPossible = false
    for (let i = 0; i < cubeBatches.length; i++) {
        let batch = cubeBatches[i]
        batch = batch.split(',').map(element => element.trim())

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
        console.log('batchContent: ', batchContent);
        combinationPossible = checkIfCombinationPossible(batchContent)
        if (!combinationPossible) {
            break
        }
        console.log('combinationPossible: ', combinationPossible);
    }
    if (combinationPossible) {
        totalSum += (index + 1)
    } else {
        console.log('combination impossible for row: ', index + 1)
    }
    // console.log('cubeBatches: ', cubeBatches, index);

});

console.log('RESULT: ', totalSum);
