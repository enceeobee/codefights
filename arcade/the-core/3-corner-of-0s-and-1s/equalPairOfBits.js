const assert = require('assert')

// TODO - Lean bitwise operators. This is gross.
function equalPairOfBits (n, m) {
  return (function () {
    'use strict'

    let mBinaryReversed = m.toString(2).split('').reverse()
    let nBinaryReversed = n.toString(2).split('').reverse()
    let i = 0

    while (nBinaryReversed.length !== mBinaryReversed.length) {
      ((nBinaryReversed.length < mBinaryReversed.length) ? nBinaryReversed : mBinaryReversed).push('0')
    }

    while (nBinaryReversed[i] !== mBinaryReversed[i]) {
      i += 1
    }

    return Math.pow(2, i)
  })()
}

let n
let m
let expected
let actual

n = 10
m = 11
expected = 2
actual = equalPairOfBits(n, m)
assert.strictEqual(actual, expected)

n = 0
m = 0
expected = 1
actual = equalPairOfBits(n, m)
assert.strictEqual(actual, expected)

n = 28
m = 27
expected = 8
actual = equalPairOfBits(n, m)
assert.strictEqual(actual, expected)

n = 895
m = 928
expected = 32
actual = equalPairOfBits(n, m)
assert.strictEqual(actual, expected)

n = 1073741824
m = 1006895103
expected = 262144
actual = equalPairOfBits(n, m)
assert.strictEqual(actual, expected)

console.log('All tests passed.')
