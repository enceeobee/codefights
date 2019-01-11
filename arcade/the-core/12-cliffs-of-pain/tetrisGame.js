const assert = require('assert')

/*
  Notes:

    - 20 rows and 10 columns
    - Random pieces appear on the field, each composed of four square blocks.
    - you can rotate it 90 degree clockwise
    - objective of the game is to create horizontal lines composed of 10 blocks
    - When such a line is created, it disappears, and all lines above the deleted one move down.
    - The player receives 1 point for each deleted row.

  Task:

    Your task is to implement an algorithm that places each new piece optimally.
    The piece is considered to be placed optimally if:
      - The total number of blocks in the rows this piece will occupy after
        falling down is maximized;
      - Among all positions with that value maximized,
        this position requires the least number of rotations;
      - Among all positions that require the minimum number of rotations,
        this one is the leftmost one
        (i.e. the leftmost block's position is as far to the left as possible).

  Plan:

    1. Check how optimal each rotation of the piece would be (see notes above)
      - create an array with all rotations (1, 2, 3), and an optimizationScore for each; the
        rotation with the highest optimizationScore will be selected for use.
        OR SIMPLY WRITE A FUNCTION TO RETURN THE OPTIMIZED PIECE
    2. Based on most optimal move, place piece (select a rotation and placement)
      - Look 'down' the board for every bottom-most piece. As soon as an obstacle (block or bottom of board)
        is encountered, the piece ceases to fall
    3. If row is/rows are full,
      * increment score
      * remove row(s)
      - start from bottom of board and work up;
        if every space is filled, remove it from bottom and place a fresh row at top
*/
function tetrisGame (pieces) {
  const board = generateBoard()
  let score = 0
  let newLines
  let optimizedPiece

  pieces.some((piece) => {
    optimizedPiece = generateOptimizedPiece(board, piece)

    console.log('optimizedPiece =', optimizedPiece)

    if (optimizedPiece) {
      placePiece(optimizedPiece, board)

      newLines = calculateLines(board)

      if (newLines > 0) {
        score += newLines
        // TODO - pass `newLines` to `clearLines`
        clearLines(board)
      }

      console.log('board after placement')
      draw(board)
    }
  })

  return score
}

function generateBoard () {
  // TODO - see if this works
  // return new Array(20).fill(new Array(10).fill('.'))

  const board = []

  // for (let r = 0; r < 20; r++) {
  //   board.push([])
  //   for (let c = 0; c < 10; c++) {
  //     board[r].push('.')
  //   }
  // }

  for (let r = 0; r < 20; r++) {
    // board.push('.'.repeat(10).split(''))
    board.push('..........'.split(''))
  }

  // console.log('board', board)

  return board
}

/*
  The piece is considered to be placed optimally if:
    - The total number of blocks in the rows this piece will occupy after
      falling down is maximized;
    - Among all positions with that value maximized,
      this position requires the least number of rotations;
    - Among all positions that require the minimum number of rotations,
      this one is the leftmost one
      (i.e. the leftmost block's position is as far to the left as possible).
*/
function generateOptimizedPiece (board, piece) {
  const rotations = [piece]
  let doesFit = false
  let optimizedPiece = {
    rotationCount: 4,
    blocksOccupiedInRowsCount: 11,
    colIndex: 9
  }

  // TODO - if possible, don't repeat rotations
  for (let i = 1; i < 4; i++) {
    rotations.push(rotate(rotations[i - 1]))
  }

  rotations.forEach((rotation, rotationCount) => {
    // let rows

    // console.log('rotation', rotation)

    for (let r = 19; r >= rotation.length - 1; r--) {
      for (let c = 0; c <= 10 - rotation[0].length; c++) {
        doesFit = true
        // rows = []

        let rowOffset = 0

        let pieceRow = rotation.length - 1 - rowOffset
        while (doesFit && pieceRow >= 0) {
          let colOffset = 0

          for (let pieceCol = 0 + colOffset; pieceCol < rotation[0].length; pieceCol++) {
            const boardRow = r - rowOffset
            const boardCol = c + colOffset++

            // TODO - this is borked
            // rows.push(board[boardRow])

            // console.log(`board cell: [${boardRow},${boardCol}]`)
            // console.log(`piece cell: [${pieceRow},${pieceCol}]`)

            /*
              Should check:
              board  | piece
              [19,2] | [1,0]
              [19,3] | [1,1]
              [19,4] | [1,2]
              [18,2] | [0,0]
              [18,3] | [0,1]
              [18,4] | [0,2]
            */

            doesFit = doesFit && !(board[boardRow][boardCol] === '#' && rotation[pieceRow][pieceCol] === '#')
          }
          rowOffset++
          pieceRow--
        }

        if (doesFit) {
          // console.log(`rotation ${rotationCount} fits at [${r},${c}]`)

          // const blocksOccupiedInRowsCount = calculateBlocksInRowOccupied(rotation, rows)
          const blocksOccupiedInRowsCount = calculateBlocksInRowOccupied(rotation, board, r, c)

          // const isOccupyingFewerBlocks = blocksOccupiedInRowsCount < optimizedPiece.blocksOccupiedInRowsCount
          const isOccupyingMoreBlocks = blocksOccupiedInRowsCount > optimizedPiece.blocksOccupiedInRowsCount
          const hasFewerRotations = rotationCount < optimizedPiece.rotationCount
          const isFartherLeft = c < optimizedPiece.colIndex

          // console.log('isOccupyingFewerBlocks', isOccupyingFewerBlocks)
          // console.log('hasFewerRotations', hasFewerRotations)
          // console.log('isFartherLeft', isFartherLeft)

          // if (isOccupyingFewerBlocks || hasFewerRotations || isFartherLeft) {
          if (
            // isOccupyingFewerBlocks ||
            isOccupyingMoreBlocks ||
            hasFewerRotations ||
            (hasFewerRotations && isFartherLeft)
          ) {
            optimizedPiece.blocksOccupiedInRowsCount = blocksOccupiedInRowsCount
            optimizedPiece.rotationCount = rotationCount
            optimizedPiece.colIndex = c
            optimizedPiece.rowIndex = r
            optimizedPiece.body = rotation
          }

          return
        }
      }
    }
  })

  return doesFit ? optimizedPiece : false
}

function rotate (piece) {
  let rotated = []
  let row

  for (let c = 0; c < piece[0].length; c++) {
    row = []

    for (let r = piece.length - 1; r >= 0; r--) {
      row.push(piece[r][c])
    }

    rotated.push(row)
  }

  return rotated
}

function calculateLines (board) {
  // Mutate the board based on how many lines we have, and return that amount
  let lineCount = 0

  for (let r = 0; r < 20; r++) {
    if (board[r].every(block => block !== '.')) lineCount++
  }

  return lineCount
}

// function calculateBlocksInRowOccupied (piece, rows) {

//   console.log('piece, rows', piece, rows)

//   /*
//     The total number of blocks in the rows this piece will
//     occupy after falling down is maximized;

//     TODO - So maybe we have to check each row, and record the max number
//     of occupied cells.
//   */
//   let boardRowCount
//   let pieceRowCount

//   return rows.reduce((acc, val, i) => {
//     boardRowCount = val.reduce((rAcc, block) => (block !== '.') ? rAcc + 1 : rAcc, 0)
//     pieceRowCount = piece[i].reduce((pAcc, block) => (block !== '.') ? pAcc + 1 : pAcc, 0)

//     // return acc + boardRowCount + pieceRowCount
//     return Math.max(acc, boardRowCount + pieceRowCount)
//   }, 0)
// }
function calculateBlocksInRowOccupied (piece, board, row, col) {
  const boardCopy = board.map(row => row.map(block => block + ''))
  const pieceToPlace = {
    body: piece,
    colIndex: col,
    rowIndex: row
  }
  let maxOccupiedBlocksCount = 0
  let occupiedBlockCount = 0

  placePiece(pieceToPlace, boardCopy)

  for (let r = 0; r < 20; r++) {
    occupiedBlockCount = boardCopy[r].reduce((acc, block) => (block !== '.') ? acc + 1 : acc, 0)
    if (occupiedBlockCount > maxOccupiedBlocksCount) maxOccupiedBlocksCount = occupiedBlockCount
  }

  return maxOccupiedBlocksCount
}

function placePiece ({ body, colIndex, rowIndex }, board) {
  let pieceR = body.length - 1
  let pieceC = 0

  for (let r = rowIndex; r > rowIndex - body.length; r--) {
    pieceC = 0
    for (let c = colIndex; c < colIndex + body[0].length; c++) {
      if (body[pieceR][pieceC] === '#') board[r][c] = body[pieceR][pieceC]
      pieceC++
    }
    pieceR--
  }
}

function clearLines (board) {
  for (let r = 19; r >= 0; r--) {
    if (board[r].every(block => block !== '.')) {
      board.splice(r, 1)
      board.unshift('..........'.split(''))
      r++
    }
  }
}

// TODO - delete
function draw (board) {
  board.forEach(row => console.log(row.join(' ')))
}

// const rotations = [
//   [
//     // 1a
//     [
//       ['.', '#', '.'],
//       ['#', '#', '#']
//     ],
//     [
//       ['#', '.'],
//       ['#', '#'],
//       ['#', '.']
//     ]
//   ],
//   // 1b
//   [
//     [
//       ['#', '.'],
//       ['#', '#'],
//       ['#', '.']
//     ],
//     [
//       ['#', '#', '#'],
//       ['.', '#', '.']
//     ]
//   ],
//   // 1c
//   [
//     [
//       ['#', '#', '#'],
//       ['.', '#', '.']
//     ],
//     [
//       ['.', '#'],
//       ['#', '#'],
//       ['.', '#']
//     ]
//   ],

//   // 2
//   // 3
//   // 4
//   [
//     [
//       ['#', '#', '#', '#']
//     ],
//     [
//       ['#'],
//       ['#'],
//       ['#'],
//       ['#']
//     ]
//   ],
//   [
//     [
//       ['#'],
//       ['#'],
//       ['#'],
//       ['#']
//     ],
//     [
//       ['#', '#', '#', '#']
//     ]
//   ]
// ]
// rotations.forEach(r => assert.deepStrictEqual(rotate(r[0]), r[1]))

// console.log('\n*** all rotations work ***\n')

// const expected = {
//   rotationCount: 0,
//   blocksOccupiedInRowsCount: 8,
//   colIndex: 2,
//   roW
// }
// assert.strictEqual(generateOptimizedPiece().colIndex, 2)

const makeTest = (p, x) => ({ p, x })
const tests = [
  // makeTest([
  //   [
  //     ['.', '#', '.'],
  //     ['#', '#', '#']
  //   ],
  //   [
  //     ['#', '.', '.'],
  //     ['#', '#', '#']
  //   ],
  //   [
  //     ['#', '#', '.'],
  //     ['.', '#', '#']
  //   ],
  //   [
  //     ['#', '#', '#', '#']
  //   ],
  //   [
  //     ['#', '#', '#', '#']
  //   ],
  //   [
  //     ['#', '#'],
  //     ['#', '#']
  //   ]
  // ], 1),

  // makeTest([
  //   [['#', '#'], ['#', '#']],
  //   [['#', '#'], ['#', '#']],
  //   [['#', '#'], ['#', '#']],
  //   [['#', '#'], ['#', '#']],
  //   [['#', '#'], ['#', '#']],
  //   [['#', '#'], ['#', '#']]
  // ], 2),

  // makeTest([
  //   [['#', '#', '#', '#']],
  //   [['#', '#', '#', '#']],
  //   [['#', '#'], ['#', '#']]
  // ], 1),

  makeTest([
    [
      ['.', '#', '#'],
      ['#', '#', '.']
    ],
    [
      ['.', '#', '.'],
      ['#', '#', '#']
    ],
    [
      ['#', '#', '.'],
      ['.', '#', '#']
    ],
    [
      ['.', '#', '.'],
      ['#', '#', '#']
    ],
    [
      ['#', '#', '#', '#']
    ],
    [
      ['#', '.', '.'],
      ['#', '#', '#']
    ],
    [
      ['#', '#'],
      ['#', '#']
    ],
    [
      ['#', '#', '#'],
      ['.', '.', '#']
    ],
    [
      ['.', '#', '#'],
      ['#', '#', '.']
    ],
    [
      ['.', '#', '.'],
      ['#', '#', '#']
    ],
    [
      ['#', '#', '.'],
      ['.', '#', '#']
    ],
    [
      ['.', '#', '.'],
      ['#', '#', '#']
    ],
    [
      ['#', '#', '#', '#']
    ],
    [
      ['#', '.', '.'],
      ['#', '#', '#']
    ],
    [
      ['#', '#'],
      ['#', '#']
    ],
    [
      ['#', '#', '#'],
      ['.', '.', '#']
    ]
  ], 3)

  // makeTest([
  //   [['.', '#', '.'], ['#', '#', '#']],
  //   [['.', '.', '#'], ['#', '#', '#']],
  //   [['#', '#', '.'], ['.', '#', '#']],
  //   [['.', '#', '.'], ['#', '#', '#']],
  //   [['.', '.', '#'], ['#', '#', '#']],
  //   [['#', '#', '.'], ['.', '#', '#']]
  // ], 1)

  // Custom
  // makeTest([
  //   [
  //     ['.', '#', '.'],
  //     ['#', '#', '#']
  //   ],
  //   [
  //     ['#', '#', '.'],
  //     ['.', '#', '#']
  //   ]
  // ], 0),
  // makeTest([
  //   [
  //     '#'.repeat(10).split('')
  //   ]
  // ], 1)
  // makeTest([
  //   [
  //     ['.', '#', '.'],
  //     ['#', '#', '#']
  //   ],
  //   [
  //     ['#', '.', '.'],
  //     ['#', '#', '#']
  //   ],
  //   [
  //     ['#', '#', '.'],
  //     ['.', '#', '#']
  //   ]
  // ], 0),
]

tests.forEach(t => assert.deepStrictEqual(tetrisGame(t.p), t.x))
