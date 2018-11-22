const assert = require('assert')

function circleOfNumbers (n, firstNumber) {
  'use strict'
  const circle = []
  for (let i = 0; i < n; i += 1) circle.push(i)

  const acrossIndex = (n / 2) + firstNumber

  return (acrossIndex < n) ? circle[acrossIndex] : circle[acrossIndex - n]
}

let expected = 7
let actual = circleOfNumbers(10, 2)
assert.strictEqual(actual, expected)

expected = 2
actual = circleOfNumbers(10, 7)
assert.strictEqual(actual, expected)

expected = 3
actual = circleOfNumbers(4, 1)
assert.strictEqual(actual, expected)

expected = 0
actual = circleOfNumbers(6, 3)
assert.strictEqual(actual, expected)

console.log('All tests passed.')
