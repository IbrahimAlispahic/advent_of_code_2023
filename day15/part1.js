import myData from './data.js'

const testData = `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`

const arrayData = myData.split(",")
// console.log('arrayData: ', arrayData)

let currentValue = 0
const hash = (item) => {
    const array = [...item]
    for(const element of array) {
        currentValue += element.charCodeAt()
        currentValue *= 17
        currentValue %= 256
    }
}


let totalSum = 0
// hash('HASH')
arrayData.forEach((item) => {
    hash(item)
    totalSum += currentValue
    currentValue = 0
})

console.log('RESULT: ', totalSum)
