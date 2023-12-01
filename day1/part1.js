import myData from './data.js'

const testData = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`

const data = myData.split("\n")
// console.log('data: ', data);

const checkIfDigit = (char) => {
    return char.charCodeAt() >= '0'.charCodeAt() && char.charCodeAt() <= '9'.charCodeAt()
}

let totalSum = 0
data.forEach(element => {

    let firstDigit, secondDigit
    for (let i = 0; i < element.length; i++) {
        if (checkIfDigit(element[i])) {
            firstDigit = element[i]
            break;
        }
    }
    for (let i = element.length - 1; i >= 0; i--) {
        if (checkIfDigit(element[i])) {
            secondDigit = element[i]
            break;
        }
    }
    totalSum += Number(firstDigit + secondDigit)
});

console.log('RESULT: ', totalSum);
