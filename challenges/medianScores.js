const assert = require('assert')

// Attempt #5 or whatever attempting binary search
const calculateMedian = scores => {
  const halfLen = scores.length / 2
  return Math.ceil(scores.length % 2 ? scores[Math.floor(halfLen)] : ((scores[halfLen - 1] + scores[halfLen]) / 2))
}

const getInsertIndex = (target, scores) => {
  if (scores.length === 0 || target <= scores[0]) return 0
  if (target >= scores[scores.length - 1]) return scores.length

  let start = 0
  let end = scores.length - 1
  let i = Math.floor((end - start) / 2)

  for (let c = 0; c < 10000; c++) {
    if (start === end) return end
    if (i === 0) return 1
    if (target >= scores[i - 1] && target <= scores[i]) return i

    if (target < scores[i - 1]) {
      end = i - 1
      start = Math.max(0, start)
    } else if (target > scores[i]) {
      end = Math.min(scores.length - 1, end)
      start = i + 1
    }

    i = Math.floor((end + start) / 2)
  }
}

function medianScores (scores) {
  const sortedScores = []

  return scores.map((s) => {
    sortedScores.splice(getInsertIndex(s, sortedScores), 0, s)
    return calculateMedian(sortedScores)
  })
}

const makeTest = (s, x) => ({ s, x })
const tests = [
  makeTest([100, 20, 50, 70, 45], [100, 60, 50, 60, 50]),
  makeTest([10, 20, 30], [10, 15, 20]),
  makeTest([98, 91, 70, 26, 75, 91, 30, 88, 86], [98, 95, 91, 81, 75, 83, 75, 82, 86]),
  makeTest([93, 65, 48, 30, 23, 91, 24, 57, 98, 71, 60, 97], [93, 79, 65, 57, 48, 57, 48, 53, 57, 61, 60, 63]),
  makeTest([82, 65, 70, 67, 70, 50, 67, 85, 52, 98, 51, 76, 60, 51, 73, 61, 75, 89, 57, 50, 73, 96, 76, 65, 76, 64, 71, 55, 86, 50, 50, 87, 65, 59, 60, 56, 57, 74, 80, 50], [82, 74, 70, 69, 70, 69, 67, 69, 67, 69, 67, 69, 67, 67, 67, 67, 67, 69, 67, 67, 67, 69, 70, 69, 70, 69, 70, 69, 70, 69, 67, 69, 67, 67, 67, 66, 65, 66, 67, 66]),
  makeTest([1, 2, 3], [1, 2, 2]),
  makeTest([20, 11, 45, 0, 0, 40, 12, 88, 56, 66, 96, 32, 79, 98, 96, 57, 72, 33, 15, 14], [20, 16, 20, 16, 11, 16, 12, 16, 20, 30, 40, 36, 40, 43, 45, 51, 56, 51, 45, 43]),
  makeTest([100], [100]),
  makeTest([97, 65, 90, 95, 95, 78, 80, 84, 70, 67, 87, 71, 53, 65, 86, 76, 81, 67, 78, 84, 92, 84, 75, 55, 58, 55, 59, 71, 91, 76, 54, 58], [97, 81, 90, 93, 95, 93, 90, 87, 84, 82, 84, 82, 80, 79, 80, 79, 80, 79, 78, 79, 80, 81, 80, 79, 78, 78, 78, 77, 78, 77, 76, 76]),
  makeTest([54, 68, 57, 91, 50, 78, 75, 55, 51, 56, 59, 60, 65, 63, 82, 86, 90, 62, 99, 53, 63, 56, 50, 56, 91, 50, 99, 95, 52, 69, 70, 53, 80, 83, 81, 91, 59, 51, 87, 66, 62, 57, 82, 67, 68, 51, 71, 66, 53, 60, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [54, 61, 57, 63, 57, 63, 68, 63, 57, 57, 57, 58, 59, 60, 60, 62, 63, 63, 63, 63, 63, 63, 62, 61, 62, 61, 62, 63, 62, 63, 63, 63, 63, 63, 63, 64, 63, 63, 63, 64, 63, 63, 63, 64, 65, 64, 65, 66, 65, 64, 63, 63, 63, 63, 62, 62, 62, 61, 60, 60, 60, 60, 59, 59, 59, 58, 57, 57, 57, 57, 56, 56, 56, 56, 56, 56, 55, 55, 54, 54, 53, 53, 53, 53, 53, 53, 52, 52, 51, 51, 51, 51, 51, 51, 50, 50, 50, 50, 50, 25])
]

tests.forEach(t => assert.deepStrictEqual(medianScores(t.s), t.x))
