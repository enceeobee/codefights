const assert = require('assert')
// const makeTest = require('../../../makeTest')

/*
  The game starts with a 9 × 9 field with several colored balls placed on its cells
  (there are 7 possible colors but not all colors have to be present initially).
  The player can move one ball per turn, and they may only move a ball if
  there is a clear path between the current position of the chosen ball and the desired destination.

  Clear paths are formed by neighboring empty cells.

  Two cells are neighboring if they have a common side.

  The goal is to remove balls by forming lines (horizontal, vertical or diagonal)
  of at least five balls of the same color. If the player manages to form one or more such lines,
  the move is called successful, and the balls in those lines disappear.
  Otherwise, the move is called unsuccessful, and three more balls appear on the field.
*/

function linesGame (field, clicks, newBalls, newBallsCoordinates) {
  let score = 0
  /*
    1. Create the board - nope, it's already given to us
    2. Loop through clicks
    3. Identify first click (ball or not ball)
    4. Identify second click (ball or not ball)
    5. Determine action
      a. If the user clicks a ball and then another, the first click is ignored
      b. If two consecutive clicks result in an incorrect move, they are ignored
        i. move is correct if there is a clear path between the current position
        of the chosen ball and the desired destination
    6. Determine move's success by checking for lines
      a. If unsuccessful (aka no lines)
        i. Place new balls
        ii. Check and clear lines that have formed from placing new balls
      b. If successful, clear lines
    7. Clearing lines:
      a. score += A + B - 1
        i. A is the number of lines of at least five balls
        ii. B is the total number of balls in those lines
  */

  // Loop clicks
  // If isBall(firstClick) && isBall(secondClick) continue
  let firstClick
  let secondClick
  let isCorrectMove
  let newBallIndex = 0

  for (let c = 0; c < clicks.length - 1; c++) {
    firstClick = clicks[c]
    secondClick = clicks[c + 1]

    // If first click is not ball - INVALID MOVE
    if (!isBall(firstClick, field)) {
      // Ignore both clicks
      // console.log(`IGNORING ${firstClick} to ${secondClick}`)
      c++
      isCorrectMove = false
      // continue
    } else {
      // First click is ball
      if (isBall(secondClick, field)) {
        // console.log(`Ignoring ${firstClick}`)
        isCorrectMove = false
        // continue
      } else {
        // Second click is not ball

        // console.log(`possible valid move: ${firstClick} to ${secondClick}`)

        isCorrectMove = isValidMove(firstClick, secondClick, field)

        // console.log('isCorrectMove', String(isCorrectMove).toUpperCase())

        // Increment c whether it's a valid move or not
        c++
      }
    }

    if (isCorrectMove) {
      field[secondClick[0]][secondClick[1]] = field[firstClick[0]][firstClick[1]]
      field[firstClick[0]][firstClick[1]] = '.'
    } else {
      // console.log(`placing balls from index ${newBallIndex}`)

      if (newBalls.length < 3) continue

      for (let i = 0; i < 3; i++) {
        // if (newBalls.length < newBallIndex + 1) break

        const [row, col] = newBallsCoordinates[newBallIndex]
        field[row][col] = newBalls[newBallIndex]
        newBallIndex++
      }

      // newBallIndex++
    }

    // console.log(field)

    // Check and clear lines
    score += scoreMove(field)

    // console.log('score', score)
  }

  return score
}

function isBall (click, field) {
  return field[click[0]][click[1]] !== '.'
}

// This will be a tough function, I'm thinking it'll be recursive
function isValidMove (origin, destination, field, dir = '') {
  // console.log('origin', origin, 'dest', destination, 'dir', dir)

  // Infinite loop defense
  // console.log('count', count)
  // if (count++ > 64) return false

  // Two cells are neighboring if they have a common side.
  // const isDestinationNeighboring = Math.abs(origin[0] - destination[0]) === 1 || Math.abs(origin[1] - destination[1]) === 1
  // const isDestinationEmpty = field[destination[0]][destination[1]] === '.'

  // console.log('isDestinationNeighboring', isDestinationNeighboring)
  // console.log('isDestinationEmpty', isDestinationEmpty)

  // if (isDestinationNeighboring && isDestinationEmpty) {
  // if (field[destination[0]][destination[1]] === '.') return true
  // if (origin[0] === destination[0] && origin[1] === destination[1]) return true
  if (origin.join() === destination.join()) return true

  const [originRow, originCol] = origin
  const [destinationRow, destinationCol] = destination
  const isEmpty = ([row, col]) => field[row][col] === '.'

  // Return false if neighbor is out of bounds or already occupied
  // const isAboveValid = originRow > 0 &&
  //   // !(originRow === 8 && dir === 'down') &&
  //   dir !== 'down' &&
  //   isValidMove([originRow - 1, originCol], destination, field, 'up')
  // const isBelowValid =
  //   originRow < 8 &&
  //   // !(originRow === 0 && dir === 'up') &&
  //   dir !== 'up' &&
  //   isValidMove([originRow + 1, originCol], destination, field, 'down')

  // const isAboveValid = originRow > 0 && dir !== 'down' && isEmpty([originRow - 1, originCol]) && isValidMove([originRow - 1, originCol], destination, field, 'up')
  // const isBelowValid = originRow < 8 && dir !== 'up' && isEmpty([originRow + 1, originCol]) && isValidMove([originRow + 1, originCol], destination, field, 'down')
  // const isLeftValid = originCol > 0 && dir !== 'right' && isEmpty([originRow, originCol - 1]) && isValidMove([originRow, originCol - 1], destination, field, 'left')
  // const isRightValid = originCol < 8 && dir !== 'left' && isEmpty([originRow, originCol + 1]) && isValidMove([originRow, originCol + 1], destination, field, 'right')

  // Ok, this time, only move in the direction of dest
  let isAboveValid = false
  let isBelowValid = false
  let isLeftValid = false
  let isRightValid = false
  let newDest

  if (destinationRow < originRow) {
    newDest = [originRow - 1, originCol]
    isAboveValid = originRow > 0 &&
      dir !== 'down' &&
      isEmpty(newDest) &&
      isValidMove(newDest, destination, field, 'up')
  }
  if (destinationRow > originRow) {
    isBelowValid = originRow < 8 &&
      dir !== 'up' &&
      isEmpty([originRow + 1, originCol]) &&
      isValidMove([originRow + 1, originCol], destination, field, 'down')
  }
  if (destinationCol < originCol) {
    isLeftValid = originCol > 0 &&
      dir !== 'right' &&
      isEmpty([originRow, originCol - 1]) &&
      isValidMove([originRow, originCol - 1], destination, field, 'left')
  }
  if (destinationCol > originCol) {
    isRightValid = originCol < 8 &&
      dir !== 'left' &&
      isEmpty([originRow, originCol + 1]) &&
      isValidMove([originRow, originCol + 1], destination, field, 'right')
  }

  // console.log(isAboveValid, isBelowValid, isLeftValid, isRightValid)
  // return false

  return isAboveValid ||
    isBelowValid ||
    isLeftValid ||
    isRightValid
}

function scoreMove (field) {
  const lines = []
  let line = []

  // valid colors "R", "B", "O", "V", "G", "Y" and "C"
  // const score = (row, col, compareUnit) => {
  const score = (row, col, doTerminate) => {
    const block = field[row][col]
    const matchesFirstChar = line.length > 0 && block === field[line[0][0]][line[0][1]]

    if (matchesFirstChar) {
      line.push([row, col])

      // if (compareUnit === 8 && line.length > 4) {
      if (doTerminate && line.length > 4) {
        lines.push(line)
        return true
      }

      return false
    }

    if (line.length > 4) {
      lines.push(line)
      return true
    }

    line = (block !== '.') ? [[row, col]] : []

    return false
  }

  // Check horizontal
  for (let row = 0; row < 9; row++) {
    line = []
    for (let col = 0; col < 9; col++) {
      // if (score(row, col, col)) break
      if (score(row, col, col === 8)) break
    }
  }

  // Check vertical
  for (let col = 0; col < 9; col++) {
    line = []
    for (let row = 0; row < 9; row++) {
      // if (score(row, col, row)) break
      if (score(row, col, row === 8)) break
    }
  }

  for (let c = 0; c < 9; c++) {
    line = []
    for (let r = 0; c + r < 9; r++) {
      // At top, moving right. ex. 1,3; 2,4; 3,5; 4,6; 5,7; 6,8
      // if (score(r, c + r, c + r)) break
      if (score(r, c + r, c + r === 8)) break
    }

    line = []
    for (let r = 0; 8 - c - r > -1; r++) {
      // At top, moving left. ex. 1,7; 2,6; 3,5; 4,4; 5,3; 6;2
      // (0,7; 1,6;) 2,5; 3,4; 4,3; 5,2; 6,1; 7,0

      // console.log(r, 8 - c - r)

      // if (score(r, 8 - c - r, r)) break
      if (score(r, 8 - c - r, 8 - c - r === 0)) break
    }

    if (c > 0) {
      line = []
      for (let r = 8; c + 8 - r < 9; r--) {
        // At bottom, moving right. ex. 8,0; 7,1; 6,2; 5,3 | 8,3; 7,4; 6,5...
        // 8,3; 7,4; 6,5; 5,6; 4,7; 5, 8
        // if (score(r, c + 8 - r, c + 8 - r)) break
        if (score(r, c + 8 - r, c + 8 - r === 8)) break
      }

      line = []
      for (let r = 8; r - c > -1; r--) {
        // At bottom, moving left. ex. 8,5; 7,4; 6,3; 5,2; 4,1; 3,0
        // if (score(r, r - c, 8 + r - c)) break
        if (score(r, r - c, r - c === 0)) break
      }
    }
  }

  const a = lines.length
  const b = lines.reduce((acc, val) => acc + val.length, 0)

  clearLines(field, lines)

  if (a > 0) return a + b - 1

  return 0
}

function clearLines (field, lines) {
  lines.forEach(line => line.forEach(([r, c]) => (field[r][c] = '.')))
}

// Scoring tests
// assert.strictEqual(
//   // a = 2; b = 11; x = 12
//   scoreMove([
//     ['.', 'O', '.', '.', '.', '.', '.', 'O', '.'],
//     ['.', '.', 'O', '.', '.', '.', 'O', '.', '.'],
//     ['.', '.', '.', 'O', '.', 'O', '.', '.', '.'],
//     ['.', '.', '.', '.', 'O', '.', '.', '.', '.'],
//     ['.', '.', '.', 'O', '.', 'O', '.', '.', '.'],
//     ['.', '.', 'O', '.', '.', '.', 'O', '.', '.'],
//     ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
//     ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
//     ['.', '.', '.', '.', '.', '.', '.', '.', '.']]),
//   12
// )

// Diag from top, center line
assert.strictEqual(
  // a = 1; b = 6; x = 6
  scoreMove([
    ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', 'O', '.'],
    ['.', '.', '.', '.', '.', '.', 'O', '.', '.'],
    ['.', '.', '.', '.', '.', 'O', '.', '.', '.'],
    ['.', '.', '.', '.', 'O', '.', '.', '.', '.'],
    ['.', '.', '.', 'O', '.', '.', '.', '.', '.'],
    ['.', '.', 'O', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.']]),
  6
)

// Diag from top, going right, center line
assert.strictEqual(
  // a = 1; b = 8; x = 8
  scoreMove([
    ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', 'R', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', 'R', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', 'R', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', 'R', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', 'R', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', 'R', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', 'R', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', 'R']]),
  8
)

// Terminating at 0
assert.strictEqual(
  // a = 1; b = 6; x = 6
  scoreMove([
    ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', 'O', '.', '.', '.'],
    ['.', '.', '.', '.', 'O', '.', '.', '.', '.'],
    ['.', '.', '.', 'O', '.', '.', '.', '.', '.'],
    ['.', '.', 'O', '.', '.', '.', '.', '.', '.'],
    ['.', 'O', '.', '.', '.', '.', '.', '.', '.'],
    ['O', '.', '.', '.', '.', '.', '.', '.', '.']]),
  6
)

// Terminating at 0
assert.strictEqual(
  // a = 1; b = 6; x = 6
  scoreMove([
    ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', 'R', '.', '.', '.'],
    ['.', '.', '.', '.', 'R', '.', '.', '.', '.'],
    ['.', '.', '.', 'R', '.', '.', '.', '.', '.'],
    ['.', '.', 'R', '.', '.', '.', '.', '.', '.'],
    ['.', 'R', '.', '.', '.', '.', '.', '.', '.'],
    ['R', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.']]),
  6
)

// Diag from right
assert.strictEqual(
  // a = 1; b = 6; x = 6
  scoreMove([
    ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', 'R', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', 'R', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', 'R', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', 'R', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', 'R', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', 'R'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.']]),
  6
)

// Diag from bottom, going right
assert.strictEqual(
  // a = 1; b = 6; x = 6
  scoreMove([
    ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', 'O'],
    ['.', '.', '.', '.', '.', '.', '.', 'O', '.'],
    ['.', '.', '.', '.', '.', '.', 'O', '.', '.'],
    ['.', '.', '.', '.', '.', 'O', '.', '.', '.'],
    ['.', '.', '.', '.', 'O', '.', '.', '.', '.'],
    ['.', '.', '.', 'O', '.', '.', '.', '.', '.']]),
  6
)

// Diag from bottom, going left
assert.strictEqual(
  // a = 1; b = 6; x = 6
  scoreMove([
    ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['R', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', 'R', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', 'R', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', 'R', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', 'R', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', 'R', '.', '.', '.']]),
  6
)

assert.strictEqual(
  // a = 1; b = 6; x = 6
  scoreMove([
    ['.', '.', 'O', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', 'O', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', 'O', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', 'O', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', 'O', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', 'O', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.']]),
  6
)

assert.strictEqual(
  // a = 1; b = 6; x = 6
  scoreMove([
    ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', 'O', '.'],
    ['.', '.', '.', '.', '.', '.', 'O', '.', '.'],
    ['.', '.', '.', '.', '.', 'O', '.', '.', '.'],
    ['.', '.', '.', '.', 'O', '.', '.', '.', '.'],
    ['.', '.', '.', 'O', '.', '.', '.', '.', '.'],
    ['.', '.', 'O', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.']]),
  6
)

assert.strictEqual(
  // a = 1; b = 6; x = 6
  scoreMove([
    ['.', '.', '.', '.', '.', '.', '.', 'O', '.'],
    ['.', '.', '.', '.', '.', '.', 'O', '.', '.'],
    ['.', '.', '.', '.', '.', 'O', '.', '.', '.'],
    ['.', '.', '.', '.', 'O', '.', '.', '.', '.'],
    ['.', '.', '.', 'O', '.', '.', '.', '.', '.'],
    ['.', '.', 'O', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.']]),
  6
)

assert.strictEqual(
  // a = 2; b = 12
  13,
  scoreMove([
    [ '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
    [ 'G', '.', '.', '.', '.', '.', '.', '.', '.' ],
    [ '.', 'G', '.', '.', '.', '.', '.', '.', '.' ],
    [ '.', '.', 'G', '.', '.', '.', '.', '.', 'G' ],
    [ 'G', 'G', 'G', 'G', 'G', 'G', '.', '.', '.' ],
    [ '.', '.', '.', '.', 'G', '.', 'G', '.', '.' ],
    [ '.', '.', '.', '.', '.', 'G', '.', '.', '.' ],
    [ '.', '.', '.', '.', 'G', '.', '.', '.', '.' ],
    [ '.', '.', '.', 'G', '.', '.', '.', '.', '.' ] ])
)
assert.strictEqual(
  // a = 1, b = 9
  9,
  scoreMove(
    [
      ['.', 'G', '.', 'O', '.', '.', '.', '.', '.'],
      ['.', '.', '.', 'O', '.', '.', '.', 'V', '.'],
      ['.', 'O', '.', 'O', 'O', '.', '.', '.', '.'],
      ['.', '.', '.', 'O', 'O', '.', '.', '.', '.'],
      ['.', '.', '.', 'O', '.', '.', '.', '.', 'O'],
      ['.', '.', '.', 'O', 'O', '.', '.', '.', '.'],
      ['.', '.', '.', 'O', '.', '.', '.', '.', '.'],
      ['R', '.', '.', 'O', '.', '.', '.', 'B', 'R'],
      ['.', '.', 'C', 'O', '.', '.', '.', 'Y', 'O']
    ]
  )
)
assert.strictEqual(
  // a = 1; b = 5
  5,
  scoreMove(
    [
      ['.', 'G', '.', 'O', '.', '.', '.', '.', '.'],
      ['V', 'V', 'V', 'V', 'V', '.', 'V', 'V', 'V'],
      ['.', 'O', '.', 'O', 'O', '.', '.', '.', '.'],
      ['.', '.', '.', 'O', 'O', '.', '.', '.', '.'],
      ['.', '.', '.', 'O', '.', '.', '.', '.', 'O'],
      ['.', '.', '.', '.', 'O', '.', '.', '.', '.'],
      ['.', '.', '.', 'O', '.', '.', '.', '.', '.'],
      ['R', '.', '.', 'O', '.', '.', '.', 'B', 'R'],
      ['.', '.', 'C', 'O', '.', '.', '.', 'Y', 'O']
    ]
  )
)
assert.strictEqual(
  // a = 1; b = 5
  5,
  scoreMove(
    [
      ['V', 'G', '.', 'O', '.', '.', '.', '.', '.'],
      ['V', 'V', 'V', 'B', 'V', 'V', 'B', 'V', 'V'],
      ['.', 'O', 'V', 'O', 'O', '.', '.', '.', '.'],
      ['.', '.', '.', 'V', 'O', '.', '.', '.', '.'],
      ['.', '.', '.', 'O', 'V', '.', '.', '.', 'O'],
      ['.', '.', '.', 'O', 'O', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', 'V', '.', '.'],
      ['R', '.', '.', 'O', '.', '.', '.', 'V', 'R'],
      ['.', '.', 'C', 'O', '.', '.', '.', 'Y', 'V']
    ]
  )
)

assert.strictEqual(
  // a = 2; b = 14 (9 diag, 5 across)
  15,
  scoreMove(
    [
      ['V', 'G', '.', 'O', '.', '.', '.', '.', '.'],
      ['V', 'V', 'V', 'B', 'V', 'V', 'V', 'V', 'V'],
      ['.', 'O', 'V', 'O', 'O', '.', 'NOPE', '.', '.'],
      ['.', '.', '.', 'V', 'O', 'V', '.', '.', '.'],
      ['.', '.', '.', 'O', 'V', '.', '.', '.', 'O'],
      ['.', '.', '.', 'V', 'O', 'V', '.', '.', '.'],
      ['.', '.', '.', 'O', '.', '.', 'V', '.', '.'],
      ['R', '.', '.', 'O', '.', '.', '.', 'V', 'R'],
      ['.', '.', 'C', 'O', '.', '.', '.', 'Y', 'V']
    ]
  )
)

assert.strictEqual(
  // a = 3; b = 15 = 3 + 15 - 1 = 17
  17,
  scoreMove(
    [
      [ '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
      [ '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
      [ '.', '.', 'O', '.', 'O', '.', 'O', '.', '.' ],
      [ '.', '.', '.', 'O', 'O', 'O', '.', '.', '.' ],
      [ '.', '.', '.', '.', 'O', '.', '.', '.', '.' ],
      [ '.', '.', '.', 'O', 'O', 'O', '.', '.', '.' ],
      [ '.', '.', 'O', '.', 'O', '.', 'O', '.', '.' ],
      [ '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
      [ '.', '.', '.', '.', '.', '.', '.', '.', '.' ]
    ]
  )
)



// Invalid color - todo?
// assert.strictEqual(
//   0,
//   scoreMove(
//     [
//       ['.', 'G', '.', 'X', '.', '.', '.', '.', '.'],
//       ['.', '.', '.', 'X', '.', '.', '.', 'V', '.'],
//       ['.', 'O', '.', 'X', 'O', '.', '.', '.', '.'],
//       ['.', '.', '.', 'X', 'O', '.', '.', '.', '.'],
//       ['.', '.', '.', 'X', '.', '.', '.', '.', 'O'],
//       ['.', '.', '.', 'X', 'O', '.', '.', '.', '.'],
//       ['.', '.', '.', 'X', '.', '.', '.', '.', '.'],
//       ['R', '.', '.', 'X', '.', '.', '.', 'B', 'R'],
//       ['.', '.', 'C', 'X', '.', '.', '.', 'Y', 'O']
//     ]
//   )
// )

const makeTest = (f, c, nb, nbc, x) => ({ f, c, nb, nbc, x })

const tests = [
  /*
  The only correct moves were:
    Orange ball moved from [2, 1] to [4, 4];
    Red ball moved from [1, 2] to [1, 4];
    Orange ball moved from [4, 8] to [6, 4]
  */
  makeTest(
    [
      ['.', 'G', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', 'V', '.'],
      ['.', 'O', '.', '.', 'O', '.', '.', '.', '.'],
      ['.', '.', '.', '.', 'O', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', 'O'],
      ['.', '.', '.', '.', 'O', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['R', '.', '.', '.', '.', '.', '.', 'B', 'R'],
      ['.', '.', 'C', '.', '.', '.', '.', 'Y', 'O']
    ],
    [[4, 8],
      [2, 1],
      [4, 4],
      [6, 4],
      [4, 8],
      [1, 2],
      [1, 4],
      [4, 8],
      [6, 4]],
    ['R',
      'V',
      'C',
      'G',
      'Y',
      'O'],
    [[1, 2],
      [8, 5],
      [8, 6],
      [1, 1],
      [1, 8],
      [7, 4]],
    6
  ),

  makeTest(
    [['.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', 'O', '.', 'O', '.', 'O', '.', '.'],
      ['.', '.', '.', 'O', 'O', 'O', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', 'O'],
      ['.', '.', '.', 'O', 'O', 'O', '.', '.', '.'],
      ['.', '.', 'O', '.', 'O', '.', 'O', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.']],
    [[4, 8],
      [4, 4]],
    [], [],
    17
  ),

  makeTest(
    [['O', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', 'O', '.'],
      ['.', '.', '.', '.', '.', '.', 'O', '.', '.'],
      ['.', '.', '.', '.', '.', 'O', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', 'O', '.', '.', '.', '.', '.'],
      ['.', '.', 'O', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.']],
    [[0, 0], [4, 4]],
    [],
    [],
    6
  ),

  makeTest(
    [['V', '.', '.', '.', 'O', '.', '.', '.', 'O'],
      ['V', 'O', '.', '.', 'O', '.', '.', 'O', 'V'],
      ['V', '.', 'O', '.', 'O', '.', 'O', '.', '.'],
      ['V', '.', '.', 'O', 'O', 'O', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', 'O'],
      ['V', '.', '.', 'O', 'O', 'O', '.', '.', '.'],
      ['V', '.', 'O', '.', 'O', '.', 'O', '.', '.'],
      ['V', 'O', '.', '.', 'O', '.', '.', 'O', '.'],
      ['V', '.', '.', '.', 'O', '.', '.', '.', 'O']],
    [[4, 8],
      [4, 4],
      [1, 8],
      [4, 0]],
    [],
    [],
    36
  ),

  makeTest(
    [['V', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['V', '.', '.', '.', '.', '.', '.', '.', 'V'],
      ['V', '.', 'O', '.', 'O', '.', 'O', '.', '.'],
      ['V', '.', '.', 'O', 'O', 'O', '.', '.', '.'],
      ['.', 'V', 'V', 'V', '.', '.', '.', '.', 'O'],
      ['V', '.', '.', 'O', 'O', 'O', '.', '.', '.'],
      ['V', '.', 'O', '.', 'O', '.', 'O', '.', '.'],
      ['V', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['V', '.', '.', '.', '.', '.', '.', '.', '.']],
    [[4, 8],
      [4, 4],
      [1, 8],
      [4, 0]],
    [],
    [],
    17
  ),

  makeTest(
    [['.', '.', '.', 'G', 'G', '.', '.', 'G', '.'],
      ['G', '.', '.', '.', '.', '.', '.', 'G', '.'],
      ['.', 'G', '.', '.', '.', '.', '.', 'G', '.'],
      ['.', '.', 'G', '.', '.', '.', '.', 'G', 'G'],
      ['G', 'G', 'G', '.', 'G', 'G', '.', '.', '.'],
      ['.', '.', '.', '.', 'G', '.', 'G', 'G', '.'],
      ['.', '.', '.', '.', '.', 'G', '.', '.', '.'],
      ['.', '.', '.', '.', 'G', '.', '.', '.', '.'],
      ['.', '.', '.', 'G', '.', '.', '.', '.', '.']],
    [[0, 3],
      [4, 7],
      [0, 4],
      [4, 3]],
    [],
    [],
    25
  )
]

tests.forEach(t => assert.strictEqual(linesGame(t.f, t.c, t.nb, t.nbc), t.x))
