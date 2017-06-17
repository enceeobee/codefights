const assert = require('assert');

function getDivisors(num) {
    /**
     * start at 64 / 2
     * then take that dividend and divide it down by all of its divisors
     * 32 / 2 = 16; 16/2 = 8; 8/2 = 4; 4/2=2; 2/2 = 1; <- all divisors
     * 32 / 3 BUST
     * 32 / 4 ALREADY HAVE
     * 
     * 12:
     * 2 - 12/2=6; 6/2=3; 3/2 BUST
     * 3 - 12/3=4; 4/3 BUST
     * 4 - 12/4=3; 3/4 BUST
     * 5 - 12/5 BUST
     * 6 - ALREADY HAVE
     * 
     * 6:
     * 2 - 6/2=3; 3/2=BUST
     * 3 - ALREADY HAVE
     */

    let divisors = {};
    let divisor;

    // 1 and num are always divisors (unless num is 1)
    divisors[1] = true;
    if (num !== 1) divisors[num] = true;

    for (let i = 2; i <= Math.ceil(num / 2); i += 1) {
      if (num % i !== 0 || divisors.hasOwnProperty(i)) continue;

      divisors[i] = true;
      divisor = num / i;
      while (divisor >= i) {
        divisors[divisor] = true;
        if (divisor % i === 0) divisor /= i;
        else break;
      }
    }

    // console.log(divisors);
    
    return Object.keys(divisors).length;
  }

function weakNumbers(n) {
  'use strict';
  const weaknessMap = {};
  const divisorMap = {};
  const divisors = {};

  let maxWeakness = 0;

  // Smelly brute force
  /**
   *       
    function getDivisors(num) {
      let numDivisors = 0;
      for (let i = 1; i <= Math.floor(num / 2); i += 1) {
        if (num % i === 0) numDivisors += 1;
      }
      return numDivisors + 1;
    }
  */
  
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

  // console.log('weaknessMap', weaknessMap);
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

n = 1;
expected = [0, 1];
actual = weakNumbers(n);
assert.deepEqual(actual, expected);

n = 2;
expected = [0, 2];
actual = weakNumbers(n);
assert.deepEqual(actual, expected);

n = 7;
expected = [2, 1];
actual = weakNumbers(n);
assert.deepEqual(actual, expected);

n = 500;
expected = [403, 1];
actual = weakNumbers(n);
assert.deepEqual(actual, expected);

n = 4;
expected = [0, 4];
actual = weakNumbers(n);
assert.deepEqual(actual, expected);

assert.equal(getDivisors(1), 1);
assert.equal(getDivisors(2), 2);
assert.equal(getDivisors(3), 2);
assert.equal(getDivisors(4), 3);
assert.equal(getDivisors(5), 2);
assert.equal(getDivisors(6), 4);
assert.equal(getDivisors(7), 2);
assert.equal(getDivisors(8), 4);
assert.equal(getDivisors(9), 3);
assert.equal(getDivisors(420), 24);
assert.equal(getDivisors(360), 24);
assert.equal(getDivisors(480), 24);
assert.equal(getDivisors(240), 20);
assert.equal(getDivisors(288), 18);

console.log('All tests passed.');
