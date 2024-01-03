import myData from './data.js'

const testData = `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`

const rowData = testData.split("\n")
// console.log('rowData: ', rowData);

const countCombinations = (row) => {
    let combinationCtr = 0
    let [springs, groupSizes] = row.split(' ')
    const groupSizesArray = groupSizes.split(',').map(Number)

    console.log('springs: ', springs)
    console.log('groupSizesArray: ', groupSizesArray)

    function tryCombination(currentIndex, currentSprings, currentGroupSizes) {
        // Base case: If we have reached the end of the springs string
        if (currentIndex === currentSprings.length) {
            // Check if the current configuration matches the group sizes
            if (isValidCombination(currentSprings, currentGroupSizes)) {
                combinationCtr++;
            }
            return
        }

        // If current spring is not a '?', just move to the next one
        if (currentSprings[currentIndex] !== '?') {
            tryCombination(currentIndex + 1, currentSprings, currentGroupSizes);
            return
        }

        // Try replacing '?' with a '.' and recursively call tryCombination
        tryCombination(currentIndex + 1, replaceCharAt(currentSprings, currentIndex, '.'), currentGroupSizes);

        // Try replacing '?' with a '#' and recursively call tryCombination
        tryCombination(currentIndex + 1, replaceCharAt(currentSprings, currentIndex, '#'), currentGroupSizes);
    }

    function isValidCombination(springs, groupSizes) {
        let index = 0;
        for (let size of groupSizes) {
            let count = 0
            // Skip operational springs
            while (index < springs.length && springs[index] === '.') {
                index++
            }
            // Count contiguous broken springs
            while (index < springs.length && springs[index] === '#' && count < size) {
                count++
                index++
            }
            if (count !== size) {
                return false // The group size doesn't match
            }
            // Ensure separation between groups
            if (index < springs.length && springs[index] === '#') {
                return false // Adjacent groups without operational spring in between
            }
        }
        // Ensure there are no extra broken springs at the end
        while (index < springs.length) {
            if (springs[index] === '#') {
                return false
            }
            index++
        }
        return true
    }    
    
    function replaceCharAt(str, index, char) {
        return str.substring(0, index) + char + str.substring(index + 1);
    }

    tryCombination(0, springs, groupSizesArray)

    return combinationCtr

}

let totalSum = 0
rowData.forEach((row) => {
    console.log('sum: ', totalSum)
    totalSum += countCombinations(row)
});

console.log('RESULT: ', totalSum);
