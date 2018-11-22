// any room that is free or,
// is located anywhere below a free room in the same column
// is not considered suitable for the bots.

function matrixElementsSum (matrix) {
  'use strict'

  let sum = 0
  let row = 0
  let col = 0

  while (col < matrix[row].length) {
    if (matrix[row][col] === 0) {
      row = 0
      col += 1
    } else {
      sum += matrix[row][col]
      row += 1
    }

    if (row === matrix.length) {
      row = 0
      col += 1
    }
  }

  return sum
}

let matrix = [[0, 1, 1, 2],
  [0, 5, 0, 0],
  [2, 0, 3, 3]]
console.log(matrixElementsSum(matrix)) // 9

matrix = [[1, 1, 1, 0],
  [0, 5, 0, 1],
  [2, 1, 3, 10]]
console.log(matrixElementsSum(matrix)) // 9

matrix = [[1, 1, 1],
  [2, 2, 2],
  [3, 3, 3]]
console.log(matrixElementsSum(matrix)) // 18

matrix = [[0]]
console.log(matrixElementsSum(matrix)) // 0
