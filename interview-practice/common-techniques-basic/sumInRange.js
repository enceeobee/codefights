const assert = require('assert')

// JS is funky about modulo
// Here's a mod function found online:
// https://stackoverflow.com/questions/4467539/javascript-modulo-gives-a-negative-result-for-negative-numbers
function mod (n, m) {
  return ((n % m) + m) % m
}

// Use the prefix sums technique to solve
function sumInRange (numbers, queries) {
  // yi = yi − 1 + xi-1 for i > 0, and y0 = 0
  const prefixSums = numbers.reduce((acc, number, i) => {
    acc.push(acc[i] + numbers[i])
    return acc
  }, [0])

  // To get the sum of the elements xa + xa+1 + ... + xb we would calculate yb+1 - ya.
  const totalSum = queries.reduce((acc, [a, b]) => {
    return acc + prefixSums[b + 1] - prefixSums[a]
  }, 0)

  return mod(totalSum, 1000000007)
}

let nums
let queries
let expected
let actual

nums = [3, 0, -2, 6, -3, 2]
queries = [[0, 2],
  [2, 5],
  [0, 5]]
expected = 10
actual = sumInRange(nums, queries)
assert.strictEqual(actual, expected)

nums = [-1000]
queries = [[0, 0]]
expected = 999999007
actual = sumInRange(nums, queries)
assert.strictEqual(actual, expected)

nums = [34, 19, 21, 5, 1, 10, 26, 46, 33, 10]
queries = [[3, 7],
  [3, 4],
  [3, 7],
  [4, 5],
  [0, 5]]
expected = 283
actual = sumInRange(nums, queries)
assert.strictEqual(actual, expected)

nums = [-4, -18, -22, -14, -33, -47, -29, -35, -50, -19]
queries = [[2, 9],
  [5, 6],
  [1, 2],
  [2, 2],
  [4, 5]]
expected = 999999540
actual = sumInRange(nums, queries)
assert.strictEqual(actual, expected)

console.log('All tests passed.')
