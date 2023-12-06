// 14.44 mins to find a solution using brute force, not ideal but not too bad...

import {
    seeds, seedsToSoil, soilToFertilizer, fertilizerToWater, waterToLight,
    lightToTemperature, temperatureToHumidity, humidityToLocation
} from './data.js'

const mapper = (map) => {
    map = map.split("\n")
    let mapperArrays = []
    map.forEach(row => {
        mapperArrays.push(row.split(' ').map(element => Number(element)))
    })
    return mapperArrays
}

const findElementMapping = (element, mapper) => {
    let result
    for (let i = 0; i < mapper.length; i++) {
        const row = mapper[i]
        if (element >= row[1] && element < row[1] + row[2]) {
            result = row[0] + (element - row[1])
            return result
        } else {
            result = element
        }
    }
    return result
}

// test data
// const seeds = `79 14 55 13`
// const seedsToSoil = `50 98 2
// 52 50 48`
// const soilToFertilizer = `0 15 37
// 37 52 2
// 39 0 15`
// const fertilizerToWater = `49 53 8
// 0 11 42
// 42 0 7
// 57 7 4`
// const waterToLight = `88 18 7
// 18 25 70`
// const lightToTemperature = `45 77 23
// 81 45 19
// 68 64 13`
// const temperatureToHumidity = `0 69 1
// 1 0 69`
// const humidityToLocation = `60 56 37
// 56 93 4`

const seedsMapper = mapper(seeds)[0]
const seedsToSoilMapper = mapper(seedsToSoil)
const soilToFertilizerMapper = mapper(soilToFertilizer)
const fertilizerToWaterMapper = mapper(fertilizerToWater)
const waterToLightMapper = mapper(waterToLight)
const lightToTemperatureMapper = mapper(lightToTemperature)
const temperatureToHumidityMapper = mapper(temperatureToHumidity)
const humidityToLocationMapper = mapper(humidityToLocation)

let minLocation = 0

for (let i = 0; i < seedsMapper.length; i += 2) {
    for (let j = 0; j < seedsMapper[i + 1]; j++) {
        const currentSeed = seedsMapper[i] + j

        const soil = findElementMapping(currentSeed, seedsToSoilMapper)
        const fertilizer = findElementMapping(soil, soilToFertilizerMapper)
        const water = findElementMapping(fertilizer, fertilizerToWaterMapper)
        const light = findElementMapping(water, waterToLightMapper)
        const temperature = findElementMapping(light, lightToTemperatureMapper)
        const humidity = findElementMapping(temperature, temperatureToHumidityMapper)
        const location = findElementMapping(humidity, humidityToLocationMapper)

        if (location < minLocation || (i === 0 && j === 0)) {
            minLocation = location
        }

        // console.log('seed: ', seed);
        // console.log('soil: ', soil);
        // console.log('fertilizer: ', fertilizer);
        // console.log('water: ', water);
        // console.log('light: ', light);
        // console.log('temperature: ', temperature);
        // console.log('humidity: ', humidity);
        // console.log('location: ', location);
        // console.log('----------------------');

    }
}

console.log('RESULT: ', minLocation);
