const assert = require('assert')

function differentSquares (matrix) {
  'use strict'
  const uniqueSquares = []
  const areSame = (s1, s2) => (
    s1[0][0] === s2[0][0] &&
    s1[0][1] === s2[0][1] &&
    s1[1][0] === s2[1][0] &&
    s1[1][1] === s2[1][1]
  )

  let square
  for (let i = 0; i < matrix.length - 1; i += 1) {
    for (let j = 0; j < matrix[i].length - 1; j += 1) {
      square = [
        [matrix[i][j], matrix[i][j + 1]], [matrix[i + 1][j], matrix[i + 1][j + 1]]
      ]
      if (uniqueSquares.every(us => !areSame(square, us))) uniqueSquares.push(square)
    }
  }

  return uniqueSquares.length
}

let matrix
let actual
let expected

matrix = [[1, 2, 1],
  [2, 2, 2],
  [2, 2, 2],
  [1, 2, 3],
  [2, 2, 1]]
expected = 6
actual = differentSquares(matrix)
assert.strictEqual(actual, expected)

matrix = [[9, 9, 9, 9, 9],
  [9, 9, 9, 9, 9],
  [9, 9, 9, 9, 9],
  [9, 9, 9, 9, 9],
  [9, 9, 9, 9, 9],
  [9, 9, 9, 9, 9]]
expected = 1
actual = differentSquares(matrix)
assert.strictEqual(actual, expected)

matrix = [[3]]
expected = 0
actual = differentSquares(matrix)
assert.strictEqual(actual, expected)

matrix = [[3, 4, 5, 6, 7, 8, 9]]
expected = 0
actual = differentSquares(matrix)
assert.strictEqual(actual, expected)

matrix = [[3],
  [4],
  [5],
  [6],
  [7]]
expected = 0
actual = differentSquares(matrix)
assert.strictEqual(actual, expected)

matrix = [[2, 5, 3, 4, 3, 1, 3, 2],
  [4, 5, 4, 1, 2, 4, 1, 3],
  [1, 1, 2, 1, 4, 1, 1, 5],
  [1, 3, 4, 2, 3, 4, 2, 4],
  [1, 5, 5, 2, 1, 3, 1, 1],
  [1, 2, 3, 3, 5, 1, 2, 4],
  [3, 1, 4, 4, 4, 1, 5, 5],
  [5, 1, 3, 3, 1, 5, 3, 5],
  [5, 4, 4, 3, 5, 4, 4, 4]]
expected = 54
actual = differentSquares(matrix)
assert.strictEqual(actual, expected)

matrix = [[1, 1, 1, 1, 1, 1, 2, 2, 2, 3, 3, 3, 9, 9, 9, 2, 3, 9]]
expected = 0
actual = differentSquares(matrix)
assert.strictEqual(actual, expected)

console.log('All tests passed.')
