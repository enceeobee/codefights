const assert = require('assert');

function weakNumbers(n) {
  'use strict';
  const weaknessMap = {};
  const divisorMap = {};
  const divisors = {};

  let maxWeakness = 0;

  // Smelly brute force
  function getDivisors(num) {
    let numDivisors = 0;
    for (let i = 1; i <= Math.floor(num / 2); i += 1) {
      if (num % i === 0) numDivisors += 1;
    }
    return numDivisors + 1;
  }

  /**
   * To get weakness:
   * 1. calculate divisors for n
   * 2. loop divisorMap for values > numDivisors (has more divisors than x)
   * 3. loop that array to see if any of those are < n (smaller than x)
   */
  function getWeakness(num) {
    const numDivisors = getDivisors(num);
    let weakness = 0;

    if (!divisorMap[numDivisors]) divisorMap[numDivisors] = [];
    divisorMap[numDivisors].push(num);

    let nextDivisorAmt = numDivisors + 1;

    while (divisorMap[nextDivisorAmt]) {
      weakness += divisorMap[nextDivisorAmt].filter(a => a < num).length
      nextDivisorAmt += 1;
    }

    return weakness;
  }

  /**
   * weaknessMap = {
   *  0: [1, 2, 3, 4, 6, 8],
   *  1: [5],
   *  2: [7, 9]
   * }
   *
   * divisorMap = {
   *  1: [1],
   *  2: [2, 3, 5, 7],
   *  3: [4, 9],
   *  4: [6, 8]
   * }
   */

  let weakness;
  for (let i = 1; i <= n; i += 1) {
    weakness = getWeakness(i);
    maxWeakness = Math.max(maxWeakness, weakness);

    if (!weaknessMap[weakness]) weaknessMap[weakness] = [];
    weaknessMap[weakness].push(i);
  }

  console.log('weaknessMap', weaknessMap);
  // console.log('divisorMap', divisorMap);

  return [maxWeakness, weaknessMap[maxWeakness].length];
}

let n;
let expected;
let actual;

n = 9;
expected = [2, 2];
actual = weakNumbers(n);
assert.deepEqual(actual, expected);

// n = 1;
// expected = [0, 1];
// actual = weakNumbers(n);
// assert.deepEqual(actual, expected);

// n = 2;
// expected = [0, 2];
// actual = weakNumbers(n);
// assert.deepEqual(actual, expected);

// n = 7;
// expected = [2, 1];
// actual = weakNumbers(n);
// assert.deepEqual(actual, expected);

n = 500;
expected = [403, 1];
actual = weakNumbers(n);
assert.deepEqual(actual, expected);

// n = 4;
// expected = [0, 4];
// actual = weakNumbers(n);
// assert.deepEqual(actual, expected);

console.log('All tests passed.');
