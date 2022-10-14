/* eslint-disable no-shadow */
/* eslint-disable arrow-parens */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-const */
function numOccurrences(arr) {
    // expect(d.numOccurrences([1, 1, 2, 5, 7, 7, 20])).toEqual({ 1: 2, 2: 1, 5: 1, 7: 2, 20: 1 });
    const dict = {};
    for (let value of arr) {
        if (typeof dict[value] === 'undefined') {
            dict[value] = 1;
        } else {
            dict[value]++;
        }
    }
    return dict;
}

function indicesOf(arr, value) {
    const indices = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === value) {
            indices.push(i);
        }
    }
    return indices;
}

function dictOfIndices(arr) {
    const dict = {};
    for (let value of arr) {
        dict[value] = indicesOf(arr, value);
    }
    return dict;
}

const cartesian = (...a) => a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())));

function shrinkArray(arr) {
    if (arr.length === 0) { return []; }
    const result = [arr[0]];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] !== arr[i - 1]) {
            result.push(arr[i]);
        }
    }
    return result;
}

module.exports = {
 numOccurrences, indicesOf, dictOfIndices, cartesian, shrinkArray,
};
