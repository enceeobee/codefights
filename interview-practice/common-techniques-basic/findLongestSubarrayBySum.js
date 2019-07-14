const assert = require('assert')

// https://www.geeksforgeeks.org/longest-sub-array-sum-k/
function findLongestSubarrayBySum (s, arr) {
  const sumToIndexMap = {}
  const possibleAnswers = []
  let sum = 0
  let maxLen = 0

  arr.forEach((n, i) => {
    sum += n

    if (sum === s) {
      maxLen = i
      possibleAnswers.push([1, i + 1])
    }

    if (!sumToIndexMap[sum]) {
      sumToIndexMap[sum] = [sum, i]
    }

    if (sumToIndexMap[sum - s]) {
      const index = sumToIndexMap[sum - s][1]
      maxLen = Math.max(maxLen, i - index - 1)

      possibleAnswers.push([index + 2, i + 1])
    }
  })

  if (possibleAnswers.length === 0) return [-1]

  return possibleAnswers
    .filter(([start, end]) => end - start === maxLen)
    .shift()
}

// Naive - Works
/* function findLongestSubarrayBySum (s, arr) {
  const possibleAnswers = []
  let largestLen = 0
  let startIndex
  let sum

  for (let i = 0; i < arr.length; i++) {
    sum = arr[i]
    startIndex = i + 1

    if (sum === s) {
      possibleAnswers.push([startIndex, i + 1])
    }

    for (let j = i + 1; j < arr.length; j++) {
      sum += arr[j]

      if (sum > s) break

      if (sum === s) {
        if (possibleAnswers.length > 0 &&
          possibleAnswers[possibleAnswers.length - 1][0] === startIndex) {
          possibleAnswers[possibleAnswers.length - 1][1] = j + 1
        } else {
          possibleAnswers.push([startIndex, j + 1])
        }

        largestLen = Math.max(largestLen, j + 1 - startIndex)

        continue
      }
    }
  }

  if (possibleAnswers.length === 0) return [-1]

  return possibleAnswers
    .filter(([start, end]) => end - start === largestLen)
    .shift()
} */

const makeTest = (s, arr, x) => ({ s, arr, x })
const tests = [
  makeTest(12, [1, 2, 3, 7, 5], [2, 4]),
  makeTest(15, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [1, 5]),
  makeTest(15, [1, 2, 3, 4, 5, 0, 0, 0, 6, 7, 8, 9, 10], [1, 8]),
  makeTest(3, [0, 3, 0], [1, 3]),
  makeTest(3, [3], [1, 1]),
  makeTest(3, [2], [-1]),
  makeTest(468, [135, 101, 170, 125, 79, 159, 163, 65, 106, 146, 82, 28, 162, 92, 196, 143, 28, 37, 192, 5, 103, 154, 93, 183, 22, 117, 119, 96, 48, 127, 0, 172, 0, 139, 0, 0, 70, 113, 68, 100, 36, 95, 104, 12, 123, 134], [42, 46]),
  makeTest(665, [142, 112, 54, 69, 148, 45, 63, 158, 38, 60, 124, 142, 130, 179, 117, 36, 191, 43, 89, 107, 41, 143, 65, 49, 47, 6, 91, 130, 171, 151, 7, 102, 194, 149, 30, 24, 85, 155, 157, 41, 167, 177, 132, 109, 145, 40, 27, 124, 138, 139, 119, 83, 130, 142, 34, 116, 40, 59, 105, 131, 178, 107, 74, 187, 22, 146, 125, 73, 71, 30, 178, 174, 98, 113], [-1]),
  makeTest(1291, [162, 37, 156, 168, 56, 175, 32, 53, 151, 151, 142, 125, 167, 31, 108, 192, 8, 138, 58, 88, 154, 184, 146, 110, 10, 159, 22, 189, 23, 147, 107, 31, 14, 169, 101, 192, 163, 56, 11, 160, 25, 138, 149, 84, 196, 42, 3, 151, 92, 37, 175, 21, 197, 22, 149, 200, 69, 85, 82, 135, 54, 200, 19, 139, 101, 189, 128, 68, 129, 94, 49, 84, 8, 22, 111, 18, 14, 115, 110, 17, 136, 52, 1, 50, 120, 157, 199], [-1]),
  makeTest(255, [9, 45, 10, 190], [-1]),
  makeTest(1196, [86, 94, 144], [-1]),
  makeTest(0, [1, 0, 2], [2, 2]),
  makeTest(1588, [115, 104, 49, 1, 59, 19, 181, 197, 199, 82, 190, 199, 10, 158, 73, 23, 139, 93, 39, 180, 191, 58, 159, 192], [-1]),
  //  My tests
  makeTest(12, [1, 2, 3, 7, 3, 2], [2, 4])
]

tests.forEach(t => assert.deepStrictEqual(findLongestSubarrayBySum(t.s, t.arr), t.x))
