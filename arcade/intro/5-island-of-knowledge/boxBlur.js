const assert = require('assert')

function boxBlur (img) {
  'use strict'
  const avgs = []
  for (let row = 1; row < img.length - 1; row += 1) {
    let thisRowAvg = []
    for (let col = 1; col < img[row].length - 1; col += 1) {
      let aboveRowSum = img[row - 1][col - 1] + img[row - 1][col] + img[row - 1][col + 1]
      let thisRowSum = img[row][col - 1] + img[row][col] + img[row][col + 1]
      let belowRowSum = img[row + 1][col - 1] + img[row + 1][col] + img[row + 1][col + 1]
      let average = Math.floor((aboveRowSum + thisRowSum + belowRowSum) / 9)
      thisRowAvg.push(average)
    }
    avgs.push(thisRowAvg)
  }
  return avgs
}

let img = [
  [1, 1, 1],
  [1, 7, 1],
  [1, 1, 1]]
let actual = boxBlur(img)
let expected = [[1]]
assert.strictDeepEqual(actual, expected)

actual = boxBlur([
  [0, 18, 9],
  [27, 9, 0],
  [81, 63, 45]])
expected = [[28]]
assert.strictDeepEqual(actual, expected)

actual = boxBlur([
  [36, 0, 18, 9],
  [27, 54, 9, 0],
  [81, 63, 72, 45]])
expected = [[40, 30]]
assert.strictDeepEqual(actual, expected)

console.log('All tests passed')
