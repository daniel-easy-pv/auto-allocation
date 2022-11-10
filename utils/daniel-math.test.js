/* eslint-disable object-curly-newline */
const { expect } = require('expect');
const d = require('./daniel-math');

test('can count occurrences', () => {
    expect(d.numOccurrences([1, 1, 2, 5, 7, 7, 20])).toEqual({ 1: 2, 2: 1, 5: 1, 7: 2, 20: 1 });
});

test('can take cartesian products', () => {
    expect(d.cartesian([1, 2], [3, 4])).toEqual([[1, 3], [1, 4], [2, 3], [2, 4]]);
});

test('can shrink array', () => {
    expect(d.shrinkArray([1, 1, 2, 3, 3, 3, 5, 5, 6])).toEqual([1, 2, 3, 5, 6]);
});

test('can permute trackers. Here, tracker 0, 1 belong to inverter 0 and tracker 2, 3 belong to inverter 1.', () => {
    expect(d.permuteTrackers([0, 0, 1, 1])).toEqual([
        [0, 1, 2, 3],
        [0, 1, 3, 2],
        [1, 0, 2, 3],
        [1, 0, 3, 2],
    ]);
    expect(d.permuteTrackers([1, 2, 1, 0, 0, 2])).toEqual([
        [0, 1, 2, 3, 4, 5],
        [0, 5, 2, 3, 4, 1],
        [2, 1, 0, 3, 4, 5],
        [2, 5, 0, 3, 4, 1],
        [0, 1, 2, 4, 3, 5],
        [0, 5, 2, 4, 3, 1],
        [2, 1, 0, 4, 3, 5],
        [2, 5, 0, 4, 3, 1],
    ]);
});
