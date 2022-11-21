/* eslint-disable max-len */
const partition = require('../partition-problem');

const panelsPerRoof = [55, 17, 38];
const trackerSizes = [8, 8, 9, 9, 12, 8, 26, 30];
const trackerIndexToInverterIndex = [0, 0, 1, 1, 2, 2, 3, 3];
const inverterNames = ['A', 'B', 'C', 'D'];
const trackerIdOfInverter = (arr, index) => {
    const inverterIndex = arr[index];
    return arr.slice(0, index).filter((i) => i === inverterIndex).length;
};

const allocations = partition.allocateTrackersIntoUrns(panelsPerRoof, trackerSizes, trackerIndexToInverterIndex);

for (let i = 0; i < allocations.length; i++) {
    console.log(`Option ${i}`);
    for (let j = 0; j < panelsPerRoof.length; j++) {
        console.log(`${panelsPerRoof[j]} = ${allocations[i][j].map((index) => trackerSizes[index]).join(' + ')} = ${allocations[i][j].map((index) => inverterNames[trackerIndexToInverterIndex[index]] + trackerIdOfInverter(trackerIndexToInverterIndex, index)).join(' + ')}`);
    }
}
