const assert = require('assert')

// Solution #2 - Smart subtraction
function ballsDistribution (colors, ballsPerColor, boxSize) {
  // Balls fit perfectly with no overlap
  if (boxSize % ballsPerColor === 0) return 0

  const colorMap = {}
  let colorBallsRemainingCount = ballsPerColor
  let currentBoxSize = boxSize

  while (colors > 0) {
    // We can't fit the remainder of this color into this box
    if (colorBallsRemainingCount > currentBoxSize) {
      colorBallsRemainingCount -= currentBoxSize
      currentBoxSize = boxSize
      colorMap[colors] = true
      continue
    }

    // We can fit the remainder of this color's balls into this box
    currentBoxSize -= colorBallsRemainingCount
    colorBallsRemainingCount = ballsPerColor
    colors--
  }

  return Object.keys(colorMap).length
}

// Solution #1 - naive/weird iteration
/* function ballsDistribution (colors, ballsPerColor, boxSize) {
  let colorsInMultipleBoxesCount = 0
  let colorBallsRemainingCount = ballsPerColor
  let box = { total: 0, [colors]: 0 }

  while (colors > 0) {
    // There is space
    if (box.total < boxSize) {
      if (colorBallsRemainingCount > 0) {
        // ... and available ball in this color
        box[colors]++
      } else {
        // ... but no ball in this color
        colors--
        colorBallsRemainingCount = ballsPerColor
        box[colors] = 1
      }

      box.total++
    } else {
      // There is no space, create a new box
      if (colorBallsRemainingCount > 0) {
        // ... and available ball in this color
        colorsInMultipleBoxesCount++
      } else {
        // ... but no ball in this color
        colors--
        colorBallsRemainingCount = ballsPerColor
      }

      box = { total: 1, [colors]: 1 }
    }

    colorBallsRemainingCount--
  }

  return colorsInMultipleBoxesCount
} */

const makeTest = (c, bpc, bs, x) => ({ c, bpc, bs, x })
const tests = [
  makeTest(3, 5, 6, 2),
  makeTest(10, 10, 9, 10),
  makeTest(10, 10, 30, 0)
]

tests.forEach(t => assert.strictEqual(ballsDistribution(t.c, t.bpc, t.bs), t.x))
