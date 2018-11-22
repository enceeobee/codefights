const { strictEqual: doEqual } = require('assert')

function swapAdjacentBits (n) {
  return parseInt(
    n.toString(2)
      .replace(n.toString(2)[0], (n.toString(2).length % 2 === 1) ? `0${n.toString(2)[0]}` : n.toString(2)[0])
      .split('')
      .reduce((acc, val, i, arr) => acc + ((i % 2 === 0) ? arr[i + 1] : arr[i - 1]), '')
    , 2)
}

let n
let expected
let actual

n = 13
expected = 14
actual = swapAdjacentBits(n)
doEqual(actual, expected)

n = 74
expected = 133
actual = swapAdjacentBits(n)
doEqual(actual, expected)

n = 1073741823
expected = 1073741823
actual = swapAdjacentBits(n)
doEqual(actual, expected)

n = 0
expected = 0
actual = swapAdjacentBits(n)
doEqual(actual, expected)

n = 1
expected = 2
actual = swapAdjacentBits(n)
doEqual(actual, expected)

n = 83748
expected = 166680
actual = swapAdjacentBits(n)
doEqual(actual, expected)

console.log('All tests passed.')
