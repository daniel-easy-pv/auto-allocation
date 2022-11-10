/* eslint-disable max-len */
const partition = require('../partition-problem');

function andy() {
    const allocations = partition.allocateTrackersIntoUrns([55, 17, 38], [9, 7, 9, 9, 12, 8, 26, 30], [0, 1, 2, 2, 3, 4, 5, 6]);
    const names = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'];
    const translated = [];
    for (let i = 0; i < allocations.length; i++) {
        const allocation = allocations[i];
        translated[i] = [];
        for (let j = 0; j < allocation.length; j++) {
            const block = allocation[j];
            translated[i][j] = block.map((x) => names[x]);
        }
    }
    return allocations;
}

console.log(andy());
