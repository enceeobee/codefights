const assert = require('assert')

function arrayMaximalAdjacentDifference (inputArray) {
  'use strict'
  let maxAdjDifference = 0
  for (let i = 0; i < inputArray.length - 1; i += 1) {
    maxAdjDifference = Math.max(
      maxAdjDifference,
      Math.abs(inputArray[i] - inputArray[i + 1]),
      Math.abs(inputArray[i + 1] - inputArray[i])
    )
  }
  return maxAdjDifference
}

let inputArray = [2, 4, 1, 0]
assert.strictEqual(arrayMaximalAdjacentDifference(inputArray), 3)

inputArray = [1, 1, 1, 1]
assert.strictEqual(arrayMaximalAdjacentDifference(inputArray), 0)

inputArray = [-1, 4, 10, 3, -2]
assert.strictEqual(arrayMaximalAdjacentDifference(inputArray), 7)
