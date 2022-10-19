/* eslint-disable max-len */
const { expect } = require('expect');
const partition = require('./partition-problem');

test('can solve subset sum problem', () => {
    expect(partition.subsetSumProblem([1, 1, 2, 5, 7, 7, 20], 17)).toEqual([[1, 2, 7, 7]]);
});

test('can find indices in subset sum problem', () => {
    expect(partition.subsetSumIndicesWithOK(1, [1], [true])).toEqual([[0]]);
    expect(partition.subsetSumIndicesWithOK(1, [1], [false])).toEqual([]);
    expect(partition.subsetSumIndicesWithOK(2, [1, 1, 2], [true, true, true])).toEqual([[0, 1], [2]]);
    expect(partition.subsetSumIndicesWithOK(2, [1, 1, 2], [true, false, true])).toEqual([[2]]);
    expect(partition.subsetSumIndicesWithOK(2, [1, 1, 2], [true, true, false])).toEqual([[0, 1]]);
    expect(partition.subsetSumIndicesWithOK(4, [1, 1, 1, 2, 3], [true, true, true, true, true])).toEqual([[0, 1, 3], [0, 2, 3], [1, 2, 3], [0, 4], [1, 4], [2, 4]]);
    expect(partition.subsetSumIndicesWithOK(4, [1, 1, 1, 2, 3], [true, true, true, true, false])).toEqual([[0, 1, 3], [0, 2, 3], [1, 2, 3]]);
    expect(partition.subsetSumIndicesWithOK(56, [8, 8, 9, 9, 12, 8, 26, 30], [true, false, true, true, false, false, true, true])).toEqual([[0, 2, 3, 7], [6, 7]]);
    expect(partition.subsetSumIndicesWithOK(56, [8, 8, 9, 9, 12, 8, 26, 30], Array(8).fill(true))).toEqual([[0, 2, 3, 7], [1, 2, 3, 7], [5, 2, 3, 7], [2, 3, 4, 6], [6, 7]]);
});

test('can allocate balls into urns', () => {
    expect(partition.allocateBallsIntoUrns([1, 2], [1, 1, 1], true)).toEqual([
        [[0], [1, 2]],
        [[1], [0, 2]],
        [[2], [0, 1]],
      ]);
    expect(partition.allocateBallsIntoUrns([55, 17, 38], [8, 8, 9, 9, 12, 8, 26, 30], true)).toEqual([
        [[0, 1, 2, 7], [3, 5], [4, 6]],
        [[0, 1, 3, 7], [2, 5], [4, 6]],
        [[0, 2, 5, 7], [1, 3], [4, 6]],
        [[0, 3, 5, 7], [1, 2], [4, 6]],
        [[1, 2, 5, 7], [0, 3], [4, 6]],
        [[1, 3, 5, 7], [0, 2], [4, 6]],
        [[0, 2, 4, 6], [1, 3], [5, 7]],
        [[0, 3, 4, 6], [1, 2], [5, 7]],
        [[1, 2, 4, 6], [0, 3], [5, 7]],
        [[1, 3, 4, 6], [0, 2], [5, 7]],
        [[2, 4, 5, 6], [0, 3], [1, 7]],
        [[3, 4, 5, 6], [0, 2], [1, 7]],
      ]);
});

test('can allocate trackers into urns, removing duplicates based on inverters', () => {
    expect(partition.allocateTrackersIntoUrns([2, 2], [1, 1, 1, 1], [0, 0, 1, 1])).toEqual([
        [[0, 1], [2, 3]],
        [[0, 2], [1, 3]],
        [[2, 3], [0, 1]],
    ]);
});
