const assert = require('assert')

function possibleSums (coins, quantity) {
  const sumMemo = {}
  let possibleSumCount = 0

  const memoize = (sum) => {
    if (!sumMemo[sum]) {
      sumMemo[sum] = true
      possibleSumCount++
    }
  }

  const makeSums = (adder, values, quantities) => {
    if (values.length === 0) return

    const slicedValues = values.slice(1)
    let sum

    for (let q = 1; q <= quantities[0]; q++) {
      sum = adder + (values[0] * q)

      memoize(sum)

      // Iterate over rest of the coins with this new sum
      slicedValues.forEach((v, j) => makeSums(sum, values.slice(j + 1), quantities.slice(j + 1)))
    }
  }

  coins.forEach((c, i) => makeSums(0, coins.slice(i), quantity.slice(i)))

  return possibleSumCount
}

/*
function possibleSums (coins, quantity) {
  const sumMemo = {}
  let possibleSumCount = 0

  const memoize = (sum) => {
    if (!sumMemo[sum]) {
      sumMemo[sum] = true
      possibleSumCount++
    }
  }

  const addAndMemo = (adder, values, quantities) => {
    if (values.length === 0) return
    if (quantities[0] === 0) return

    // console.log('adder', adder)
    // console.log('values', values)
    // console.log('quantities', quantities)

    const newSum = adder + values[0]

    memoize(newSum)

    const slicedValues = values.slice(1)
    const slicedQuantities = quantities.slice(1)
    const qCopy = [...quantities]
    qCopy[0]--

    addAndMemo(adder, slicedValues, slicedQuantities)
    addAndMemo(adder, values, qCopy)

    addAndMemo(newSum, slicedValues, slicedQuantities)
    addAndMemo(newSum, values, qCopy)
  }

  addAndMemo(0, coins, quantity)

  return possibleSumCount
}
 */
const makeTest = (c, q, x) => ({ c, q, x })
const tests = [
  makeTest([10], [2], 2),
  makeTest([10], [1], 1),
  makeTest([5, 10], [2, 1], 4), // 5, 10, 15, 20
  makeTest([1, 5, 10], [1, 2, 1], 9),
  makeTest([10, 50, 100], [1, 2, 1], 9),
  makeTest([10, 50, 100, 500], [5, 3, 2, 2], 122),
  makeTest([1], [5], 5),
  makeTest([1, 1], [2, 3], 5),
  makeTest([1, 2], [50000, 2], 50004),
  makeTest([1, 2, 3], [2, 3, 10000], 30008),
  makeTest([3, 1, 1], [111, 84, 104], 521),
  makeTest([1, 1, 1, 1, 1], [9, 19, 18, 12, 19], 77),
  // // my tests
  // makeTest([10, 50], [5, 1], 10),
  // makeTest([5], [5], 5),
  // makeTest([10, 50], [1, 2], 5), // 10, 60, 110, 50, 100; 10 + sum (10, 0); 10 + sum(50, 2); 10 + sum(50, 1); 10 + sum(50, 0); 50 + sum(50, 1); 50 + sum(50, 0)
  // makeTest([50, 100], [2, 1], 4), // 50, 100, 150, 200
  // makeTest([1, 5], [1, 1], 3),
  makeTest([], [], 0)
]

tests.forEach(({ c, q, x }) => assert.strictEqual(possibleSums(c, q), x))

console.log('All tests passed')
