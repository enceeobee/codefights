const assert = require('assert')

/*
  When a key is pressed, we 1. add then 2. move. In that order

  Adding taking place in the same direction as the move,
  so if there are 3 identical numbers in this move, start
  adding closest to the destination direction (see test
  below for a better idea)
*/
/*
  I think a key here is to start at the far directional edge,
  then add/move our way backward.

  So if dir = 'd'; start at the bottom, then move up each column
  first adding then sliding.
*/
function game2048 (grid, path) {
  let moved = grid.map(r => r.slice(0))

  path.split('').forEach((m) => {
    switch (m) {
      case 'U':
        moved = up(moved)
        break
      case 'R':
        moved = right(moved)
        break
      case 'D':
        moved = down(moved)
        break
      case 'L':
        moved = left(moved)
    }
  })

  return moved
}

function up (grid) {
  const moved = grid.map(r => r.slice(0))

  loopUp(moved, 'add')
  loopUp(moved, 'move')

  return moved
}

function loopUp (moved, action) {
  let cell
  let prevCell

  for (let c = 0; c < 4; c++) {
    for (let r = 0; r < 3; r++) {
      for (let b = r + 1; b < 4; b++) {
        cell = moved[r][c]
        prevCell = moved[b][c]

        if (action === 'add' && prevCell !== 0) {
          if (!canAdd(cell, prevCell)) break

          moved[r][c] *= 2
          moved[b][c] = 0
          break
        } else if (action === 'move') {
          const moveResult = moveAction(cell, prevCell)

          if (moveResult === 'break') break
          if (moveResult === 'move') {
            moved[r][c] = moved[b][c]
            moved[b][c] = 0
          }
        }
      }
    }
  }
}

function right (grid) {
  const moved = grid.map(r => r.slice(0))

  loopRight(moved, 'add')
  loopRight(moved, 'move')

  return moved
}

function loopRight (moved, action) {
  let cell
  let prevCell

  for (let r = 0; r < moved.length; r++) {
    for (let c = moved[r].length - 1; c > 0; c--) {
      for (let b = c - 1; b >= 0; b--) {
        cell = moved[r][c] * 1
        prevCell = moved[r][b]

        if (action === 'add' && prevCell !== 0) {
          if (!canAdd(cell, prevCell)) break

          moved[r][c] *= 2
          moved[r][b] = 0
          break
        } else if (action === 'move') {
          const moveResult = moveAction(cell, prevCell)

          if (moveResult === 'break') break
          if (moveResult === 'move') {
            moved[r][c] = prevCell * 1
            moved[r][b] = 0
          }
        }
      }
    }
  }
}

function down (grid) {
  const moved = grid.map(r => r.slice(0))

  loopDown(moved, 'add')
  loopDown(moved, 'move')

  return moved
}

function loopDown (moved, action) {
  let cell
  let prevCell

  for (let c = 0; c < moved[0].length; c++) {
    for (let r = moved.length - 1; r > 0; r--) {
      for (let b = r - 1; b >= 0; b--) {
        cell = moved[r][c] * 1
        prevCell = moved[b][c] * 1

        if (action === 'add' && prevCell !== 0) {
          if (!canAdd(cell, prevCell)) break

          moved[r][c] *= 2
          moved[b][c] = 0
          break
        } else if (action === 'move') {
          const moveResult = moveAction(cell, prevCell)

          if (moveResult === 'break') break
          if (moveResult === 'move') {
            moved[r][c] = moved[b][c]
            moved[b][c] = 0
          }
        }
      }
    }
  }
}

function left (grid) {
  const moved = grid.map(r => r.slice(0))

  loopLeft(moved, 'add')
  loopLeft(moved, 'move')

  return moved
}

function loopLeft (moved, action) {
  let cell
  let prevCell

  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 3; c++) {
      for (let b = c + 1; b < 4; b++) {
        cell = moved[r][c] * 1
        prevCell = moved[r][b] * 1

        if (action === 'add' && prevCell !== 0) {
          if (!canAdd(cell, prevCell)) break

          moved[r][c] *= 2 * 1
          moved[r][b] = 0 * 0
          break
        } else if (action === 'move') {
          const moveResult = moveAction(cell, prevCell)

          if (moveResult === 'break') break
          if (moveResult === 'move') {
            moved[r][c] = moved[r][b] * 1
            moved[r][b] = 0 * 0
          }
        }
      }
    }
  }
}

function canAdd (cell, prevCell) {
  if (cell === 0) return false
  if (cell !== prevCell) return false

  return true
}

function moveAction (cell, prevCell) {
  if (cell !== 0) return 'break'
  if (prevCell !== 0) return 'move'

  return 'continue'
}

function print (grid) {
  grid.forEach(r => console.log(r))
}
const makeTest = (g, p, x) => ({ g, p, x })
const tests = [
  makeTest(
    [[0, 0, 0, 0],
      [0, 0, 2, 2],
      [0, 0, 2, 4],
      [2, 2, 4, 8]],
    'RR',
    [[0, 0, 0, 0],
      [0, 0, 0, 4],
      [0, 0, 2, 4],
      [0, 0, 8, 8]]),

  makeTest(
    [[0, 0, 0, 2],
      [0, 0, 4, 2],
      [0, 0, 4, 2],
      [0, 0, 4, 2]],
    'D',
    [[0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 4, 4],
      [0, 0, 8, 4]]),

  makeTest(
    [[0, 2, 2, 0],
      [0, 4, 2, 2],
      [2, 4, 4, 8],
      [2, 4, 0, 0]],
    'L',
    [[4, 0, 0, 0],
      [4, 4, 0, 0],
      [2, 8, 8, 0],
      [2, 4, 0, 0]]),

  // Looks like we 'add up', i.e. when 'd' is pressed,
  // we add the bottom two numbers first
  makeTest(
    [[0, 0, 0, 2],
      [0, 0, 4, 2],
      [0, 0, 4, 2],
      [0, 0, 4, 2]],
    'DD',
    [[0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 4, 0],
      [0, 0, 8, 8]]),

  makeTest(
    [[0, 0, 0, 2],
      [0, 0, 4, 2],
      [0, 0, 4, 2],
      [0, 0, 4, 2]],
    'DRRD',
    [[0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 8],
      [0, 0, 8, 4]]),

  makeTest(
    [
      [2, 4, 8, 16],
      [256, 128, 64, 32],
      [512, 1024, 2048, 4096],
      [65536, 32768, 16384, 8192]
    ],
    'URLD',
    [
      [2, 4, 8, 16],
      [256, 128, 64, 32],
      [512, 1024, 2048, 4096],
      [65536, 32768, 16384, 8192]
    ]
  ),

  makeTest(
    [
      [0, 2, 0, 2],
      [0, 4, 4, 2],
      [0, 0, 4, 2],
      [0, 0, 4, 2]],
    'LLU',
    [
      [4, 4, 0, 0],
      [8, 2, 0, 0],
      [8, 0, 0, 0],
      [0, 0, 0, 0]
    ]
  ),

  makeTest(
    [[0, 2, 0, 2],
      [0, 4, 4, 2],
      [0, 0, 4, 2],
      [0, 0, 4, 2]],
    'LLUR',
    [[0, 0, 0, 8],
      [0, 0, 8, 2],
      [0, 0, 0, 8],
      [0, 0, 0, 0]]),

  makeTest(
    [[0, 0, 0, 2],
      [0, 0, 4, 2],
      [0, 0, 4, 2],
      [0, 0, 4, 2]],
    'DRRL',
    [[0, 0, 0, 0],
      [0, 0, 0, 0],
      [8, 0, 0, 0],
      [8, 4, 0, 0]]),

  makeTest(
    [[0, 0, 0, 2],
      [0, 0, 4, 2],
      [0, 0, 4, 2],
      [0, 0, 4, 2]],
    'DRRLLD',
    [[0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [16, 4, 0, 0]]),

  // custom
  makeTest(
    [[2, 2, 2, 2],
      [2, 0, 0, 2],
      [0, 0, 0, 0],
      [0, 0, 0, 0]],
    'L',
    [[4, 4, 0, 0],
      [4, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]]),
]

tests.forEach(t => assert.deepStrictEqual(game2048(t.g, t.p), t.x))
