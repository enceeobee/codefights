const { strictEqual: areEqual } = require('assert')

function differentRightmostBit (n, m) {
  return (function () {
    'use strict'
    let nBinaryReversed = n.toString(2).split('').reverse()
    let mBinaryReversed = m.toString(2).split('').reverse()

    while (nBinaryReversed.length !== mBinaryReversed.length) {
      ((nBinaryReversed.length < mBinaryReversed.length) ? nBinaryReversed : mBinaryReversed).push('0')
    }

    for (let i = 0; i < nBinaryReversed.length; i += 1) {
      if (nBinaryReversed[i] !== mBinaryReversed[i]) return Math.pow(2, i)
    }
  })()
}

let n
let m
let expected
let actual

n = 11
m = 13
expected = 2
actual = differentRightmostBit(n, m)
areEqual(actual, expected)

n = 7
m = 23
expected = 16
actual = differentRightmostBit(n, m)
areEqual(actual, expected)

n = 1
m = 0
expected = 1
actual = differentRightmostBit(n, m)
areEqual(actual, expected)

n = 64
m = 65
expected = 1
actual = differentRightmostBit(n, m)
areEqual(actual, expected)

n = 1073741823
m = 1071513599
expected = 131072
actual = differentRightmostBit(n, m)
areEqual(actual, expected)

n = 42
m = 22
expected = 4
actual = differentRightmostBit(n, m)
areEqual(actual, expected)

console.log('All tests passed.')
