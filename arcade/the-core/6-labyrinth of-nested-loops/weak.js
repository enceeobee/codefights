const assert = require('assert')

function getDivisors (num) {
  let divisors = {}
  let divisor

  // 1 and num are always divisors (unless num is 1)
  divisors[1] = true
  if (num !== 1) divisors[num] = true

  for (let i = 2; i <= Math.ceil(num / 2); i += 1) {
    if (num % i !== 0 || divisors.hasOwnProperty(i)) continue

    divisors[i] = true
    divisor = num / i
    while (divisor >= i) {
      divisors[divisor] = true
      if (divisor % i === 0) divisor /= i
      else break
    }
  }

  return Object.keys(divisors).length
}

function weakNumbers (n) {
  'use strict'
  const weaknessMap = {}
  const divisorMap = {}

  let maxWeakness = 0

  /**
   * We define the weakness of number x as the number of positive integers smaller than x that have more divisors than x.
   * In other words
   * weakness of x = positive integers that have more divisors than x and are smaller than x
   *
   * To get weakness:
   * 1. calculate divisors for n
   * 2. loop divisorMap for values > numDivisors (has more divisors than x)
   * 3. loop that array to see if any of those are < n (smaller than x)
   */
  function getWeakness (num) {
    const numDivisors = getDivisors(num)
    let weakness = 0

    if (!divisorMap[numDivisors]) divisorMap[numDivisors] = []
    divisorMap[numDivisors].push(num)

    Object.keys(divisorMap).forEach((nextDivisorAmt) => {
      if (nextDivisorAmt <= numDivisors) return
      weakness += divisorMap[nextDivisorAmt].reduce((acc, val) => (val < num) ? acc + 1 : acc, 0)
    })

    return weakness
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

  let weakness
  for (let i = 1; i <= n; i += 1) {
    weakness = getWeakness(i)
    maxWeakness = Math.max(maxWeakness, weakness)

    if (!weaknessMap[weakness]) weaknessMap[weakness] = []
    weaknessMap[weakness].push(i)
  }

  return [maxWeakness, weaknessMap[maxWeakness].length]
}

assert.strictEqual(getDivisors(1), 1)
assert.strictEqual(getDivisors(2), 2)
assert.strictEqual(getDivisors(3), 2)
assert.strictEqual(getDivisors(4), 3)
assert.strictEqual(getDivisors(5), 2)
assert.strictEqual(getDivisors(6), 4)
assert.strictEqual(getDivisors(7), 2)
assert.strictEqual(getDivisors(8), 4)
assert.strictEqual(getDivisors(9), 3)
assert.strictEqual(getDivisors(420), 24)
assert.strictEqual(getDivisors(360), 24)
assert.strictEqual(getDivisors(480), 24)
assert.strictEqual(getDivisors(240), 20)
assert.strictEqual(getDivisors(288), 18)

let n
let expected
let actual

n = 9
expected = [2, 2]
actual = weakNumbers(n)
assert.strictDeepEqual(actual, expected)

n = 1
expected = [0, 1]
actual = weakNumbers(n)
assert.strictDeepEqual(actual, expected)

n = 2
expected = [0, 2]
actual = weakNumbers(n)
assert.strictDeepEqual(actual, expected)

n = 7
expected = [2, 1]
actual = weakNumbers(n)
assert.strictDeepEqual(actual, expected)

n = 500
expected = [403, 1]
actual = weakNumbers(n)
assert.strictDeepEqual(actual, expected)

n = 4
expected = [0, 4]
actual = weakNumbers(n)
assert.strictDeepEqual(actual, expected)

console.log('All tests passed.')
