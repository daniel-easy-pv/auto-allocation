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
