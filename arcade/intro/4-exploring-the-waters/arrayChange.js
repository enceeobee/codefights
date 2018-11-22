const assert = require('assert')

function arrayChange (inputArray) {
  let numChanges = 0
  for (let i = 1; i <= inputArray.length; i += 1) {
    if (inputArray[i] <= inputArray[i - 1]) {
      numChanges += inputArray[i - 1] - inputArray[i] + 1
      inputArray[i] = inputArray[i - 1] + 1
    }
  }

  return numChanges
}

let inputArray = [1, 1, 1]
assert.strictEqual(arrayChange(inputArray), 3)

inputArray = [2, 1, 10, 1]
assert.strictEqual(arrayChange(inputArray), 12)
