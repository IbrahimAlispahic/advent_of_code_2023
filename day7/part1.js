import myData from './data.js'

class CamelCard {
    constructor(hand, bid) {
        this.hand = hand
        this.bid = bid
        this.type = this.determineType()
    }

    static cardStrengths = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']

    determineType() {
        if (this.checkIfFiveOfAKind()) {
            return 6 // 'Five of a kind'
        } else if (this.checkIfFourOfAKind()) {
            return 5 // 'Four of a kind'
        } else if (this.checkIfFullHouse()) {
            return 4 // 'Full house'
        } else if (this.checkIfThreeOfAKind()) {
            return 3 // 'Three of a kind'
        } else if (this.checkIfTwoPair()) {
            return 2 // 'Two pair'
        } else if (this.checkIfOnePair()) {
            return 1 // 'One pair'
        } else {
            return 0 // 'High card'
        }
    }

    checkIfFiveOfAKind() {
        return this.hand.every(card => card === this.hand[0])
    }

    checkIfFourOfAKind() {
        const uniqueElements = new Set(this.hand)
        // If there are exactly two unique elements, return true
        if (uniqueElements.size === 2) {
            // Check if one of the unique elements occurs exactly once
            for (const element of uniqueElements) {
                if (this.hand.filter(item => item === element).length === 1) {
                    return true
                }
            }
        }
        return false
    }

    checkIfFullHouse() {
        const uniqueElements = new Set(this.hand)
        // If there are exactly two unique elements, return true
        if (uniqueElements.size === 2) {
            // Check if one of the unique elements occurs exactly twice
            for (const element of uniqueElements) {
                if (this.hand.filter(item => item === element).length === 2) {
                    return true
                }
            }
        }
        return false
    }

    checkIfThreeOfAKind() {
        const uniqueElements = new Set(this.hand)
        // If there are exactly two unique elements, return true
        if (uniqueElements.size === 3) {
            // Check if one of the unique elements occurs exactly three times 
            for (const element of uniqueElements) {
                if (this.hand.filter(item => item === element).length === 3) {
                    return true
                }
            }
        }
        return false
    }

    checkIfTwoPair() {
        const uniqueElements = new Set(this.hand)
        // If there are exactly three unique elements, return true
        if (uniqueElements.size === 3) {
            // Check if one of the unique elements occurs only once 
            for (const element of uniqueElements) {
                if (this.hand.filter(item => item === element).length === 1) {
                    return true
                }
            }
        }
        return false
    }

    checkIfOnePair() {
        const uniqueElements = new Set(this.hand)
        // If there are exactly four unique elements, return true
        if (uniqueElements.size === 4) {
            // Check if one of the unique elements occurs twice 
            for (const element of uniqueElements) {
                if (this.hand.filter(item => item === element).length === 2) {
                    return true
                }
            }
        }
        return false
    }
}

const calculateRank = (cards, newCard) => {
    // Add newCard to existing cards
    cards.push(newCard)

    // Sort the cards based on their strength
    cards.sort((a, b) => {
        if (a.type !== b.type) {
            return a.type - b.type; // If types are different, sort by type
        } else {
            // If types are the same, sort by the strength of individual cards
            for (let i = 0; i < 5; i++) {
                const aIndex = CamelCard.cardStrengths.indexOf(a.hand[i]);
                const bIndex = CamelCard.cardStrengths.indexOf(b.hand[i]);

                if (aIndex !== bIndex) {
                    return bIndex - aIndex; // Higher index means stronger card
                }
            }
            return 0; // If all cards are the same, the hands are equal
        }
    });
}

const testData = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`

const rowData = myData.split("\n")
// console.log('rowData: ', rowData);


// const camelCard = new CamelCard([...'77774'], 2)
// console.log(camelCard.type);

let totalSum = 0
let camelCards = []
rowData.forEach((row, index) => {
    let [hand, bid] = row.split(' ')
    const newCard = new CamelCard([...hand], bid)
    calculateRank(camelCards, newCard)
    // console.log(camelCards)
});

totalSum = camelCards.reduce((total, card, index) => {
    return total + card.bid * (index + 1);
}, 0)

console.log('RESULT: ', totalSum);
