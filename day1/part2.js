import myData from './data.js'

const testData = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`

const data = myData.split("\n")
// console.log('data: ', data);

const checkIfDigit = (char) => {
    return char.charCodeAt() >= '0'.charCodeAt() && char.charCodeAt() <= '9'.charCodeAt()
}

let currentNumber
const NUMBERS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']

const checkIfNumber = (substring) => {
    let numberExists = false
    NUMBERS.forEach(number => {
        if (substring.includes(number)) {
            currentNumber = NUMBERS.indexOf(number)
            numberExists = true
        }
    })
    return numberExists
}

let totalSum = 0
data.forEach(element => {

    let firstDigit, secondDigit
    for (let i = 0; i < element.length; i++) {
        if (checkIfDigit(element[i])) {
            firstDigit = element[i]
            break;
        }
        if (checkIfNumber(element.substring(0, i + 1))) {
            firstDigit = String(currentNumber)
            break;
        }
    }
    for (let i = element.length - 1; i >= 0; i--) {
        if (checkIfDigit(element[i])) {
            secondDigit = element[i]
            break;
        }
        if (checkIfNumber(element.substring(i, element.length))) {
            secondDigit = String(currentNumber)
            break;
        }
    }
    totalSum += Number(firstDigit + secondDigit)
});

console.log('RESULT: ', totalSum);
