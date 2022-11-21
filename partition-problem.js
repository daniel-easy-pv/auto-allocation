/* eslint-disable no-prototype-builtins */
/* eslint-disable prefer-const */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-shadow */
/* eslint-disable no-plusplus */

/* eslint-disable max-len */

const d = require('./utils/daniel-math');
const comb = require('./utils/combinatorics');

function subsetSumProblem(arr, target) {
    // https://stackoverflow.com/questions/53659151/return-all-subsets-whose-sum-is-a-given-value-subset-sum-problem
    function* subsets(values, sum, parts = []) {
        let i; let s;
        for (i = 0; i < values.length; i++) {
            s = sum - values[i];
            if (!s) {
                yield [...parts, values[i]];
            } else if (s > 0) {
                yield* subsets(values.slice(i + 1), s, [...parts, values[i]]);
            }
        }
    }
    function unique(arrOfArr) {
        function isEqual(arr1, arr2) {
            if (arr1.length !== arr2.length) { return false; }
            for (let i = 0; i < arr1.length; i++) {
                if (arr1[i] !== arr2[i]) { return false; }
            }
            return true;
        }
        if (arrOfArr.length === 0) { return []; }
        const result = [arrOfArr[0]];
        for (let i = 1; i < arrOfArr.length; i++) {
            const currArr = arrOfArr[i];
            const alreadyExists = result.some((r) => isEqual(r, currArr));
            if (!alreadyExists) {
                result.push(currArr);
            }
        }
        return result;
    }
    let result = [...subsets(arr, target)];
    result.forEach((arr) => arr.sort((a, b) => a - b));
    result = unique(result);
    return result;
}

function subsetSumIndicesWithOK(target, arr, ok) {
    let allowedArr = [];
    for (let i = 0; i < arr.length; i++) {
        if (ok[i]) {
            allowedArr.push(arr[i]);
        }
    }
    let dictFiltered = {};
    for (let [key, value] of Object.entries(d.dictOfIndices(arr))) {
        dictFiltered[key] = value.filter((x) => ok[x]);
    }

    const subsets = subsetSumProblem(allowedArr, target);
    const arrOfIndices = [];
    for (let i = 0; i < subsets.length; i++) {
        let subset = subsets[i];
        let shrunk = d.shrinkArray(subset);
        let unflattened = shrunk.map((x) => comb.k_combinations(dictFiltered[x], d.numOccurrences(subset)[x]));
        let indices = d.cartesian(...unflattened);
        arrOfIndices.push(indices);
    }
    return arrOfIndices.flat();
}

function allocateBallsIntoUrnsWithPath(urnCapacities, ballSizes, path) {
    let n = ballSizes.length;
    function f(urnCapacities, ballSizes, urnIndex, ok, currPartition) {
        let subsets = subsetSumIndicesWithOK(urnCapacities[urnIndex], ballSizes, ok);
        if (subsets.length === 0) { return [[]]; }
        if (urnIndex === urnCapacities.length - 1) {
            return subsets.map((subset) => [subset]);
        }
        let subset = subsets[path[urnIndex]];
        if (typeof subset === 'undefined') { return 'dead-end'; }
        let newOK = [...Array(n).keys()].map((i) => ok[i] && !subset.includes(i));
        let newCurrPartition = [...currPartition, subset];
        let choices = f(urnCapacities, ballSizes, urnIndex + 1, newOK, newCurrPartition);
        if (choices === 'dead-end') { return 'dead-end'; }
        return choices.map((choice) => [subset, ...choice]);
    }
    return f(urnCapacities, ballSizes, 0, Array(n).fill(true), []);
}

function allocateBallsIntoUrns(urnCapacities, ballSizes, test = false) {
    let u = urnCapacities.length;
    let totalUrnCapacity = urnCapacities.reduce((a, b) => a + b, 0);
    let totalBallSizes = ballSizes.reduce((a, b) => a + b, 0);
    if (totalUrnCapacity !== totalBallSizes) { return []; }
    let allocations = [];
    let currentPath = Array(u).fill(0);
    let pointerIndex = u - 2;
    for (let i = 0; i < 100; i++) {
        let allocation = allocateBallsIntoUrnsWithPath(urnCapacities, ballSizes, currentPath);
        if (allocation !== 'dead-end') {
            if (allocation.flat(Infinity).map((i) => ballSizes[i]).reduce((a, b) => a + b, 0) !== totalUrnCapacity) {
                allocation = 'dead-end';
            }
            if (allocation !== 'dead-end') {
                allocations.push(...allocation);
            }
            currentPath[pointerIndex] += 1;
        } else if (pointerIndex > 0) {
            currentPath[pointerIndex] = 0;
            pointerIndex--;
        }
    }

    // if no allocations return [].
    if (!allocations || !allocations[0] || !allocations[0][0]) { return []; }

    // sort allocations
    for (let allocation of allocations) {
        for (let group of allocation) {
            group.sort((a, b) => a - b);
        }
    }

    // make unique.
    let getUniqueByStringify = (array) => {
        let hash = {};
        let result = [];
        let key;
        for (let i = 0, l = array.length; i < l; ++i) {
            key = JSON.stringify(array[i]);
            if (!hash.hasOwnProperty(key)) {
                hash[key] = true;
                result.push(array[i]);
            }
        }
        return result;
    };
    allocations = getUniqueByStringify(allocations);

    function testAllocations() {
        for (let allocation of allocations) {
            for (let urnIndex = 0; urnIndex < urnCapacities.length; urnIndex++) {
                let sizes = allocation[urnIndex].map((i) => ballSizes[i]);
                let sum = sizes.reduce((a, b) => a + b, 0);
                if (sum !== urnCapacities[urnIndex]) {
                    throw new Error(`Something went wrong with urn ${urnIndex}. Expect ${urnCapacities[urnIndex]} but got ${sum}`);
                }
            }
        }
    }
    if (test) {
        testAllocations();
    }
    return allocations;
}

function getPermutationLabel(trackerSizes, trackerIndexToInverterIndex) {
    const result = Array(trackerSizes.length).fill(0);
    const inverterIndices = trackerIndexToInverterIndex.filter(d.onlyUnique);
    let curr = -1;
    for (const inverterIndex of inverterIndices) {
        const positions = d.indicesOf(trackerIndexToInverterIndex, inverterIndex);
        const done = [];
        for (const position of positions) {
            const trackerSize = trackerSizes[position];
            if (done.includes(trackerSize)) {
                result[position] = curr;
            } else {
                curr += 1;
                result[position] = curr;
                done.push(trackerSize);
            }
        }
    }
    return result;
}

function allocateTrackersIntoUrns(urnCapacities, trackerSizes, trackerIndexToInverterIndex) {
    const allocations = allocateBallsIntoUrns(urnCapacities, trackerSizes);
    const permutationLabel = getPermutationLabel(trackerSizes, trackerIndexToInverterIndex);
    const result = [];
    const done = [];
    for (const allocation of allocations) {
        // check if allocation is done already
        if (!done.includes(JSON.stringify(allocation))) {
            result.push(allocation);
            let permutations = d.permuteTrackers(permutationLabel);
            permutations.forEach((permutation) => {
                let permutatedAllocation = [];
                for (let partition of allocation) {
                    permutatedAllocation.push(partition.map((val) => permutation[val]));
                }
                done.push(JSON.stringify(permutatedAllocation));
            });
        }
    }
    return result;
}

module.exports = {
    subsetSumProblem, subsetSumIndicesWithOK, allocateBallsIntoUrns, allocateTrackersIntoUrns, getPermutationLabel,
};
