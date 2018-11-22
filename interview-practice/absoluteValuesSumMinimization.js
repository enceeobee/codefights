const assert = require('assert')

function absoluteValuesSumMinimization (a) {
  // const i = (a.length % 2) ? Math.floor(a.length / 2) : (a.length / 2) - 1;
  // return a[i];
  // return a[(a.length % 2) ? Math.floor(a.length / 2) : (a.length / 2) - 1];
  return a[Math.ceil(a.length / 2) - 1]
}

console.time('absoluteValuesSumMinimization')

let a = [2, 4, 7]
let actual = absoluteValuesSumMinimization(a)
let expected = 4
assert.strictEqual(actual, expected)

a = [1, 1, 3, 4]
actual = absoluteValuesSumMinimization(a)
expected = 1
assert.strictEqual(actual, expected)

a = [23]
actual = absoluteValuesSumMinimization(a)
expected = 23
assert.strictEqual(actual, expected)

a = [-10, -10, -10, -10, -10, -9, -9, -9, -8, -8, -7, -6, -5, -4, -3, -2, -1, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50]
actual = absoluteValuesSumMinimization(a)
expected = 15
assert.strictEqual(actual, expected)

a = [-4, -1]
actual = absoluteValuesSumMinimization(a)
expected = -4
assert.strictEqual(actual, expected)

a = [0, 7, 9]
actual = absoluteValuesSumMinimization(a)
expected = 7
assert.strictEqual(actual, expected)

console.timeEnd('absoluteValuesSumMinimization')

console.log('All tests passed.')
