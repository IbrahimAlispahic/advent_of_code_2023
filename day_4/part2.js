import myData from './data.js'

const testData = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`

const checkIfNumber = (element) => {
    return (element >= '0' && element <= '9')
}

const extractNumbers = (numbers) => {
    let numbersArray = []
    let currentNumber = ''
    for (let i = 0; i < numbers.length; i++) {
        if (checkIfNumber(numbers[i])) {
            currentNumber += numbers[i]
        } else if (currentNumber.trim() !== '') {
            numbersArray.push(Number(currentNumber))
            currentNumber = ''
        }
    }
    return numbersArray
}

const rowData = myData.split("\n")
// console.log('rowData: ', rowData);

const cards = []
rowData.forEach((row, index) => {
    const numbers = row.split(': ')[1].split('|')
    // console.log(numbers);
    const winningNumbers = extractNumbers(numbers[0])
    // console.log(winningNumbers);
    const myNumbers = extractNumbers(numbers[1] + ' ')
    // console.log(myNumbers);
    let matchingNumbersCtr = 0
    winningNumbers.forEach(number => {
        if (myNumbers.includes(number)) {
            const nextNumber = (index + 1) + (++matchingNumbersCtr)
            cards.push(nextNumber)
            cards.forEach(element => {
                if (element === index + 1) {
                    cards.push(nextNumber)
                }
            });
        }
    })
    cards.push(index + 1)
});

console.log('cards: ', cards.length);
