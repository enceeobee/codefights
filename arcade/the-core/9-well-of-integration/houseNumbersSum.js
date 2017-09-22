const assert = require('assert')

function houseNumbersSum (inputArray) {
  let sum = 0
  inputArray.some(d => {
    sum += d
    return d === 0
  })
  return sum
}

const test = (ar, ex) => assert.equal(houseNumbersSum(ar), ex)

test([5, 1, 2, 3, 0, 1, 5, 0, 2], 11)
test([4, 2, 1, 6, 0], 13)
test([4, 1, 2, 3, 0, 10, 2], 10)

console.log('All tests passed.')
