const { strictEqual } = require('assert')

function waveformRecognition (unknownWave, waveDatabase) {
  let matchedIndex = -1
  let minDiff = Infinity
  let curDiff
  let thisWave

  for (let i = 0; i < waveDatabase.length; i++) {
    for (let j = 0; j < waveDatabase[0].length - unknownWave.length; j++) {
      curDiff = -1
      thisWave = waveDatabase[i]

      unknownWave.some((val, vi) => {
        if (val >= thisWave[j + vi]) {
          if (curDiff === -1) curDiff = 0

          curDiff += val - thisWave[j + vi]

          return false
        }

        curDiff = -1
        return true
      })

      if (curDiff > -1 && curDiff < minDiff) {
        minDiff = curDiff
        matchedIndex = i
      }
    }
  }

  return matchedIndex
}

const makeTest = (u, w, x) => ({ u, w, x })
const tests = [
  makeTest(
    [3, 8, 8, 4, 10, 7],
    [[8, 4, 4, 1, 2, 1, 1, 4, 3, 3, 3, 1, 4, 2, 1, 2, 10],
      [2, 2, 1, 2, 5, 10, 9, 1, 7, 3, 6, 2, 8, 4, 1],
      [9, 3, 2, 3, 3, 3, 7, 3, 7, 6, 2, 7, 4, 5, 2, 2],
      [2, 8, 2, 4, 2, 6, 3, 8, 3, 8, 8, 1, 1, 1, 5, 7, 1],
      [3, 7, 1, 3, 10, 2, 1, 1, 2, 1, 1, 6, 4, 6, 4, 1, 8]],
    2
  ),

  makeTest(
    [2, 4, 2, 6, 8],
    [[0, 2, 7, 6, 0, 5, 6, 9],
      [6, 0, 3, 0, 10, 1, 8, 3, 1, 0]],
    -1
  ),

  makeTest(
    [10, 6, 2, 9],
    [[6, 2, 2, 5, 6, 1, 0, 10, 1, 7, 10, 8, 8, 3, 5, 1, 0, 1, 1, 4, 3, 10, 7, 9, 3],
      [6, 3, 2, 10, 4, 0, 4, 7, 9, 4, 0, 7, 2, 4, 8, 2, 10, 10, 3, 3, 9, 9, 3, 10, 4, 8],
      [8, 6, 9, 4, 2, 0, 8, 10, 7, 5, 8, 10, 5, 7, 5, 0, 1, 7, 7, 7, 1, 2, 6, 0, 7, 0]],
    1
  ),

  makeTest(
    [3, 7, 10, 5, 4],
    [[3, 4, 0, 0, 0, 0, 10, 0, 6, 1, 2, 0],
      [9, 1, 0, 1, 10, 0, 8, 9],
      [3, 9, 4, 1, 3, 0, 4, 3, 7],
      [6, 0, 0, 9, 2, 1, 2, 0, 10, 4]],
    3
  ),

  makeTest(
    [4, 6, 6],
    [[0, 8, 3, 4, 7, 0, 9, 10, 3],
      [5, 6, 0, 10, 0, 2, 0, 3],
      [9, 0, 7, 6, 4, 2, 6, 3]],
    2
  ),

  makeTest(
    [7, 5, 11, 4, 5],
    [[4, 2, 6, 7, 6, 5, 2, 7, 7, 2, 3, 0, 3, 10, 9, 6, 1, 9, 4, 10, 8, 4, 4, 4, 10, 0, 4, 3, 4, 2, 0, 1, 6, 8, 10, 5, 0, 8, 9, 0, 5, 1, 8, 5, 3, 2, 3, 3, 8, 5, 6, 8, 6, 7, 7, 10, 4, 5, 2, 10, 8],
      [9, 10, 0, 2, 7, 7, 5, 2, 10, 9, 1, 2, 7, 1, 0, 3, 8, 9, 1, 9, 0, 5, 3, 5, 0, 3, 5, 6, 10, 9, 9, 8, 0, 7, 0, 6, 6, 2, 0, 9, 4, 9, 5, 8, 8, 2, 7, 6, 9, 2, 5, 5, 5, 0, 8],
      [4, 10, 9, 0, 0, 9, 6, 10, 10, 9, 0, 2, 7, 7, 8, 0, 2, 1, 9, 6, 4, 9, 3, 5, 6, 3, 0, 7, 9, 0, 7, 1, 4, 10, 9, 1, 5, 2, 6, 3, 3, 5, 0, 10, 10, 6, 5, 6, 8, 10, 10, 4, 3, 4, 8, 1, 5, 4, 1]],
    2
  ),

  makeTest(
    [12, 3, 10, 10],
    [[3, 0, 6, 3, 6, 4, 9, 0, 10, 3, 3, 3, 8, 1, 0, 7, 1, 7, 10, 8, 0, 10, 5, 9],
      [10, 2, 5, 6, 8, 10, 7, 7, 5, 0, 6, 4, 5, 3, 5, 4, 10, 0, 5, 4, 9, 5, 9, 1, 3, 4, 8],
      [8, 5, 5, 6, 9, 8, 0, 5, 8, 6, 8, 0, 0, 6, 10, 9, 6, 6, 2, 6, 5, 3, 8, 2, 2, 4, 6, 5, 5, 7, 0, 8, 7]],
    0
  ),

  makeTest(
    [6, 12, 8, 7, 9, 2, 4, 4],
    [[3, 2, 8, 7, 7, 3, 7, 2, 10, 2, 4, 4, 3, 3, 3, 7, 7, 6, 8, 6, 4, 5, 7, 5, 10, 5, 8, 1, 9, 4, 7, 3, 0],
      [8, 5, 3, 8, 9, 7, 10, 7, 2, 2, 9, 8, 7, 0, 4, 0, 10, 4, 5, 0, 1, 5, 2, 3, 8, 2, 9, 5, 8],
      [10, 8, 5, 4, 2, 8, 10, 10, 1, 10, 4, 9, 6, 8, 3, 7, 4, 5, 4, 3, 1, 1, 5, 6, 2, 6, 4, 5, 0],
      [5, 0, 0, 6, 4, 2, 10, 9, 1, 1, 9, 0, 2, 5, 9, 2, 2, 2, 4, 10, 9, 9, 7, 10, 7, 5, 9, 10]],
    -1
  ),

  makeTest(
    [9, 6, 4],
    [[4, 0, 2, 0, 7, 5, 4, 2, 8],
      [2, 1, 2, 0, 4, 0, 5],
      [2, 1, 0, 3, 6, 4, 7],
      [3, 6, 10, 1, 0, 4, 0, 10, 4, 5]],
    0
  ),

  makeTest(
    [4, 9, 11, 8, 4, 9],
    [[5, 1, 3, 7, 5, 7, 2, 8, 4, 6, 10, 10, 10, 2, 1, 8, 0, 1, 8, 7, 2, 5, 4, 9, 5, 8, 5, 1, 6, 2, 4, 0],
      [4, 0, 10, 0, 5, 9, 6, 7, 10, 9, 1, 8, 5, 7, 0, 3, 7, 4, 9, 3, 4, 1, 0, 2, 4, 2, 0, 8, 2, 6, 7, 0, 10],
      [6, 8, 1, 6, 10, 6, 4, 3, 9, 1, 2, 0, 10, 8, 2, 9, 2, 8, 6, 0, 10, 8, 10, 1, 9, 10, 7, 3, 4, 6, 2, 6, 5, 7, 8],
      [6, 10, 7, 3, 7, 3, 9, 5, 7, 0, 10, 1, 6, 7, 8, 5, 2, 6, 6, 10, 6, 6, 2, 7, 7, 0, 8]],
    2
  )
]
tests.forEach(t => strictEqual(waveformRecognition(t.u, t.w), t.x))