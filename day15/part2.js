import myData from './data.js'

const testData = `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`

const arrayData = myData.split(",")
// console.log('arrayData: ', arrayData)

const hash = (item) => {
    let currentValue = 0
    const array = [...item]
    for (const element of array) {
        currentValue += element.charCodeAt()
        currentValue *= 17
        currentValue %= 256
    }
    return currentValue
}


let boxes = Array(256).fill().map(() => [])
// hash('HASH')
arrayData.forEach((item) => {
    const [label, operation] = item.split(/(-|=)/);
    const boxIndex = hash(label);
    if (operation === '=') {
        const focalLength = parseInt(item.split('=')[1], 10);
        const existingIndex = boxes[boxIndex].findIndex(lens => lens.label === label);
        if (existingIndex !== -1) {
            boxes[boxIndex][existingIndex].focalLength = focalLength;
        } else {
            boxes[boxIndex].push({ label, focalLength });
        }
    } else if (operation === '-') {
        boxes[boxIndex] = boxes[boxIndex].filter(lens => lens.label !== label);
    }
});

let totalFocusingPower = 0;
boxes.forEach((box, boxIndex) => {
    box.forEach((lens, slotIndex) => {
        totalFocusingPower += (boxIndex + 1) * (slotIndex + 1) * lens.focalLength;
    });
});

console.log('Total Focusing Power: ', totalFocusingPower);