/* eslint-disable max-len */
const partition = require('./partition-problem');
const d = require('./daniel-math');

function andy() {
    const allocations = partition.allocateTrackersIntoUrns([55, 17, 38], [8, 8, 9, 9, 11, 9, 26, 30], [0, 0, 1, 1, 2, 3, 4, 5]);
    const names = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'];
    const translated = [];
    for (let i = 0; i < allocations.length; i++) {
        const allocation = allocations[i];
        translated[i] = [];
        for (let j = 0; j < allocation.length; j++) {
            const block = allocation[j];
            translated[i][j] = block.map((i) => names[i]);
        }
    }
    return translated;
}

console.log(andy());
