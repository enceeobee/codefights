const assert = require('assert')

// function checkIdentical (m1, m2) {
//   return m1.every((row, i) => row.every((val, j) => m2[i][j] === val))
// }

// Let's use strings to identify squares.
// test = [[0,1],[2,3]]
// testHash = test[0].concat(test[1]).join('')
// Then we can use that hash to store in the squares object

/**
 * Ohhh, it wants the number of unique squares.
 * Maybe we can use their product to determine if we've found this square yet - NOPE. Because index matters
 * @param {*} matrix
 */
function differentSquares (matrix) {
  const squares = []
  for (let i = 0; i < matrix.length - 1; i += 1) {
    for (let j = 0; j < matrix[0].length - 1; j += 1) {
      squares.push([matrix[i][j], matrix[i][j + 1], matrix[i + 1][j], matrix[i + 1][j + 1]])
    }
  }

  return Object.keys(squares.reduce((acc, val) => {
    acc[val.join('')] = true
    return acc
  }, {})).length
}

const test = (matrix, expected) => assert.strictEqual(differentSquares(matrix), expected)

test([[1, 2, 1],
  [2, 2, 2],
  [2, 2, 2],
  [1, 2, 3],
  [2, 2, 1]], 6)

console.log('All tests passed.')
