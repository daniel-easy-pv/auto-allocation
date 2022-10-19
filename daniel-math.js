/* eslint-disable no-shadow */
/* eslint-disable arrow-parens */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-const */

const comb = require('./combinatorics');

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

// JavaScript function to find inverse permutations
function inversePermutation(arr) {
    // https://www.geeksforgeeks.org/inverse-permutation/
    let i;
    let j;
    let size = arr.length;
    const result = [];
    // Loop to select Elements one by one
    for (i = 0; i < size; i++) {
        // Loop to print position of element
        // where we find an element
        for (j = 0; j < size; j++) {
            // checking the element in
            // increasing order
            if (arr[j] === i) {
                // print position of element
                // where element is in inverse
                // permutation
                result.push(j);
                break;
            }
        }
    }
    return result;
}

function permuteTrackers(inverterIndices) {
    const dict0 = dictOfIndices(inverterIndices);
    const p = Object.values(dict0).flat(1);
    const dict1 = {};
    for (const [key, value] of Object.entries(dict0)) {
        dict1[key] = comb.permutations(value, value.length);
    }
    const flattened = cartesian(...Object.values(dict1));
    const invP = inversePermutation(p);
    return flattened.map((arr) => invP.map((i) => arr[i]));
}

module.exports = {
    numOccurrences,
    indicesOf,
    dictOfIndices,
    cartesian,
    shrinkArray,
    inversePermutation,
    permuteTrackers,
};
