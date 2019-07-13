const assert = require('assert')

// Attempt #3 - Using Kadane's algorithm w/ reduce
function arrayMaxConsecutiveSum2 (inputArray) {
  let maxEndingHere = -Infinity

  return inputArray.reduce((maxSoFar, n) => {
    maxEndingHere = Math.max(maxEndingHere + n, n)
    return Math.max(maxSoFar, maxEndingHere)
  }, -Infinity)
}

// Attempt #2 - Using Kadane’s algorithm
// function arrayMaxConsecutiveSum2 (inputArray) {
//   let maxSoFar = -Infinity
//   let maxEndingHere = -Infinity

//   inputArray.forEach((n) => {
//     maxEndingHere = Math.max(maxEndingHere + n, n)
//     maxSoFar = Math.max(maxSoFar, maxEndingHere)
//   })

//   return maxSoFar
// }

// Attempt #1 - FAIL
// function arrayMaxConsecutiveSum2 (inputArray) {
//   // let maxSoFar = inputArray[0]
//   // let minSoFar = inputArray[0]
//   // let largestSum = inputArray[0]

//   // let maxSoFar = Infinity
//   // let minSoFar = -Infinity
//   let currentSum = -Infinity
//   let largestSum = -Infinity

//   inputArray.forEach((n) => {
//     // if (n > maxSoFar) maxSoFar = n
//     // else if (n < minSoFar) minSoFar = n

//     if (n > 0) {
//       // currentSum += n
//       currentSum = Math.max(n, currentSum + n)
//       // largestSum = Math.max(largestSum, currentSum)
//     } else {
//       // largestSum = Math.max(largestSum, currentSum)
//       currentSum = n
//     }
//     largestSum = Math.max(largestSum, currentSum)

//     // if (n > largestSum) largestSum = n
//     console.log(n, currentSum, largestSum)
//   })

//   return largestSum
// }

const makeTest = (i, x) => ({ i, x })
const tests = [
  makeTest([-2, 2, 5, -11, 6], 7),
  makeTest([-3, -2, -1, -4], -1),
  makeTest([-3, 2, 1, -4], 3),
  makeTest([1, -2, 3, -4, 5, -3, 2, 2, 2], 8),
  makeTest([11, -2, 1, -4, 5, -3, 2, 2, 2], 14),
  makeTest([89, 96, 60, 10, 24, 30, 72, 40, 74, 49, 38, 87, 55, 46, 44, 14, 49, 88, 93, 11], 1069),
  makeTest([-2, 1, -3, 4, -1, 2, 1, -5, 4], 6)
]

tests.forEach(t => assert.strictEqual(arrayMaxConsecutiveSum2(t.i), t.x))
