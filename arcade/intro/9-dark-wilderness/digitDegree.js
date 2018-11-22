const assert = require('assert')

function digitDegree (n) {
  'use strict'
  let i = 0

  while (n >= 10) {
    n = String(n).split('').reduce((acc, val) => Number(acc) + Number(val))
    i += 1
  }
  return i
}

let n
let actual
let expected

n = 5
expected = 0
actual = digitDegree(n)
assert.strictEqual(actual, expected)

n = 100
expected = 1
actual = digitDegree(n)
assert.strictEqual(actual, expected)

n = 91
expected = 2
actual = digitDegree(n)
assert.strictEqual(actual, expected)

n = 99
expected = 2
actual = digitDegree(n)
assert.strictEqual(actual, expected)

console.log('All tests passed.')
