const assert = require('assert')

/*
  Notes:

    - 20 rows and 10 columns
    - Random pieces appear on the field, each composed of four square blocks.
    - you can rotate it 90 degree clockwise
    - objective of the game is to create horizontal lines composed of 10 blocks
    - When such a line is created, it disappears, and all lines above the deleted one move down.
    - The player receives 1 point for each deleted row.
    - Note the way the pieces move:
      There is an empty field with 20 rows and 10 columns, which is initially empty.
      Random pieces appear on the field, each composed of four square blocks.
      You can't change the piece's shape, but you can rotate it 90 degree clockwise (possibly several times)
      and choose which columns it will appear within.
      Once you've rotated the piece and have set its starting position,
      it appears at the topmost row where you placed it and falls down until it can't fall any further.
      The objective of the game is to create horizontal lines composed of 10 blocks.
      When such a line is created, it disappears, and all lines above the deleted one move down.
      The player receives 1 point for each deleted row.

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

  pieces.forEach((piece) => {
    optimizedPiece = generateOptimizedPiece(board, piece)

    placePiece(optimizedPiece, board)

    newLines = calculateLines(board)

    if (newLines > 0) {
      score += newLines
      clearLines(board)
    }

    console.log('board after placement')
    draw(board)
  })

  return score
}

function generateBoard () {
  const board = []

  for (let r = 0; r < 20; r++) {
    board.push('..........'.split(''))
  }

  return board
}

function generateOptimizedPiece (board, piece) {
  const rotations = [piece]
  const rotationsMap = {
    [String(piece)]: true
  }
  let newRotation

  for (let i = 1; i < 4; i++) {
    // rotations.push(rotate(rotations[i - 1]))
    newRotation = rotate(rotations[rotations.length - 1])

    if (!rotationsMap[String(newRotation)]) {
      rotationsMap[String(newRotation)] = true
      rotations.push(newRotation)
    }
  }

  let placementRow
  let blocksOccupiedInRowsCount
  let isOccupyingMoreBlocks
  let isOccupyingSameBlocks
  let hasFewerRotations
  let hasSameRotations
  let isFartherLeft
  let optimizedPiece = {
    rotationCount: 4,
    blocksOccupiedInRowsCount: 0,
    colIndex: 9
  }

  rotations.forEach((rotation, rotationCount) => {
    for (let placementCol = 0; placementCol <= 10 - rotation[0].length; placementCol++) {
      placementRow = findPlacementRow(placementCol, rotation, board)

      if (placementRow > -1) {
        blocksOccupiedInRowsCount = calculateBlocksInRowOccupied(rotation, board, placementRow, placementCol)

        isOccupyingMoreBlocks = blocksOccupiedInRowsCount > optimizedPiece.blocksOccupiedInRowsCount
        isOccupyingSameBlocks = blocksOccupiedInRowsCount === optimizedPiece.blocksOccupiedInRowsCount

        hasFewerRotations = rotationCount < optimizedPiece.rotationCount
        hasSameRotations = rotationCount === optimizedPiece.rotationCount

        isFartherLeft = placementCol < optimizedPiece.colIndex

        if (
          isOccupyingMoreBlocks ||
          (isOccupyingSameBlocks && hasFewerRotations) ||
          (isOccupyingSameBlocks && hasSameRotations && isFartherLeft)
        ) {
          optimizedPiece.blocksOccupiedInRowsCount = blocksOccupiedInRowsCount
          optimizedPiece.rotationCount = rotationCount
          optimizedPiece.colIndex = placementCol
          optimizedPiece.rowIndex = placementRow
          optimizedPiece.body = rotation
        }
      }
    }
  })


  console.log('optimizedPiece =', optimizedPiece)


  return optimizedPiece
}

// Returns the row that represents the top of the piece
function findPlacementRow (leftmostCol, piece, board) {
  let r = 0

  for (r; r <= 20 - piece.length; r++) {
    if (!doesPieceFit([r, leftmostCol], piece, board)) break
  }

  return r - 1
}

function doesPieceFit (boardCoords, piece, board) {
  const [boardRow, boardCol] = boardCoords

  for (let pieceRow = 0; pieceRow < piece.length; pieceRow++) {
    for (let pieceCol = 0; pieceCol < piece[0].length; pieceCol++) {
      if (piece[pieceRow][pieceCol] === '#' && board[boardRow + pieceRow][boardCol + pieceCol] === '#') {
        return false
      }
    }
  }

  return true
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
  return board.reduce((acc, row) => (row.every(block => block !== '.')) ? acc + 1 : acc, 0)
}

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

  for (let r = row; r < row + piece.length; r++) {
    occupiedBlockCount = boardCopy[r].reduce((acc, block) => (block !== '.') ? acc + 1 : acc, 0)
    if (occupiedBlockCount > maxOccupiedBlocksCount) maxOccupiedBlocksCount = occupiedBlockCount
  }

  return maxOccupiedBlocksCount
}

function placePiece ({ body, colIndex, rowIndex }, board) {
  let pieceR = 0
  let pieceC = 0

  for (let r = rowIndex; r < rowIndex + body.length; r++) {
    pieceC = 0
    for (let c = colIndex; c < colIndex + body[0].length; c++) {
      if (body[pieceR][pieceC] === '#') board[r][c] = '#'
      pieceC++
    }
    pieceR++
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

  // makeTest([
  //   [
  //     ['.', '#', '#'],
  //     ['#', '#', '.']
  //   ],
  //   [
  //     ['.', '#', '.'],
  //     ['#', '#', '#']
  //   ],
  //   [
  //     ['#', '#', '.'],
  //     ['.', '#', '#']
  //   ],
  //   [
  //     ['.', '#', '.'],
  //     ['#', '#', '#']
  //   ],
  //   [
  //     ['#', '#', '#', '#']
  //   ],
  //   [
  //     ['#', '.', '.'],
  //     ['#', '#', '#']
  //   ],
  //   [
  //     ['#', '#'],
  //     ['#', '#']
  //   ],
  //   [
  //     ['#', '#', '#'],
  //     ['.', '.', '#']
  //   ],
  //   [
  //     ['.', '#', '#'],
  //     ['#', '#', '.']
  //   ],
  //   [
  //     ['.', '#', '.'],
  //     ['#', '#', '#']
  //   ],
  //   [
  //     ['#', '#', '.'],
  //     ['.', '#', '#']
  //   ],
  //   [
  //     ['.', '#', '.'],
  //     ['#', '#', '#']
  //   ],
  //   [
  //     ['#', '#', '#', '#']
  //   ],
  //   [
  //     ['#', '.', '.'],
  //     ['#', '#', '#']
  //   ],
  //   [
  //     ['#', '#'],
  //     ['#', '#']
  //   ],
  //   [
  //     ['#', '#', '#'],
  //     ['.', '.', '#']
  //   ]
  // ], 3),

  // makeTest([
  //   [
  //     ['.', '#', '.'],
  //     ['#', '#', '#']
  //   ],
  //   [
  //     ['.', '.', '#'],
  //     ['#', '#', '#']
  //   ],
  //   [
  //     ['#', '#', '.'],
  //     ['.', '#', '#']
  //   ],
  //   [
  //     ['.', '#', '.'],
  //     ['#', '#', '#']
  //   ],
  //   [
  //     ['.', '.', '#'],
  //     ['#', '#', '#']
  //   ],
  //   [
  //     ['#', '#', '.'],
  //     ['.', '#', '#']
  //   ]
  // ], 1),

  // Hidden
  makeTest([
    [
      ['#', '#', '#'],
      ['.', '#', '.']
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
      ['.', '#', '#'],
      ['#', '#', '.']
    ],
    [
      ['#', '#', '#', '#']
    ],
    [
      ['.', '#', '.'],
      ['#', '#', '#']
    ],
    [
      ['#', '#', '#', '#']
    ],
    [
      ['#', '#', '#'],
      ['#', '.', '.']
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
      ['.', '.', '#'],
      ['#', '#', '#']
    ],
    [
      ['#', '#'],
      ['#', '#']
    ],
    [
      ['#', '#'],
      ['#', '#']
    ],
    [
      ['#', '#'],
      ['#', '#']
    ],
    [
      ['#', '#'],
      ['#', '#']
    ],
    [
      ['.', '#', '#'],
      ['#', '#', '.']
    ],
    [
      ['#', '#', '.'],
      ['.', '#', '#']
    ],
    [
      ['#', '#', '#', '#']
    ],
    [
      ['#', '#', '#'],
      ['.', '.', '#']
    ],
    [
      ['.', '#', '.'],
      ['#', '#', '#']
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
      ['.', '.', '#'],
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
  ], 4),

  // makeTest([
  //   [
  //     ['#', '#'],
  //     ['#', '#']
  //   ],
  //   [
  //     ['#', '#'],
  //     ['#', '#']
  //   ],
  //   [
  //     ['#', '#'],
  //     ['#', '#']
  //   ],
  //   [
  //     ['#', '#', '#', '#']
  //   ],
  //   [
  //     ['.', '#', '.'],
  //     ['#', '#', '#']
  //   ],
  //   [
  //     ['#', '#'],
  //     ['#', '#']
  //   ],
  //   [
  //     ['#', '#'],
  //     ['#', '#']
  //   ],
  //   [
  //     ['#', '#'],
  //     ['#', '#']
  //   ],
  //   [
  //     ['#', '#', '#', '#']
  //   ],
  //   [
  //     ['.', '#', '.'],
  //     ['#', '#', '#']
  //   ],
  //   [
  //     ['#', '#'],
  //     ['#', '#']
  //   ],
  //   [
  //     ['#', '#'],
  //     ['#', '#']
  //   ],
  //   [
  //     ['#', '#'],
  //     ['#', '#']
  //   ],
  //   [
  //     ['#', '#', '#', '#']
  //   ],
  //   [
  //     ['.', '#', '.'],
  //     ['#', '#', '#']
  //   ],
  //   [
  //     ['#', '#'],
  //     ['#', '#']
  //   ],
  //   [
  //     ['#', '#'],
  //     ['#', '#']
  //   ],
  //   [
  //     ['#', '#'],
  //     ['#', '#']
  //   ],
  //   [
  //     ['#', '#', '#', '#']
  //   ],
  //   [
  //     ['.', '#', '.'],
  //     ['#', '#', '#']
  //   ],
  //   [
  //     ['#', '#'],
  //     ['#', '#']
  //   ],
  //   [
  //     ['#', '#'],
  //     ['#', '#']
  //   ],
  //   [
  //     ['#', '#'],
  //     ['#', '#']
  //   ],
  //   [
  //     ['#', '#', '#', '#']
  //   ],
  //   [
  //     ['.', '#', '.'],
  //     ['#', '#', '#']
  //   ],
  //   [
  //     ['#', '#'],
  //     ['#', '#']
  //   ],
  //   [
  //     ['#', '#'],
  //     ['#', '#']
  //   ],
  //   [
  //     ['#', '#'],
  //     ['#', '#']
  //   ],
  //   [
  //     ['#', '#', '#', '#']
  //   ],
  //   [
  //     ['.', '#', '.'],
  //     ['#', '#', '#']
  //   ]
  // ], 11),

  // makeTest([
  //   [
  //     ['.', '#', '.'],
  //     ['#', '#', '#']
  //   ],
  //   [
  //     ['.', '.', '#'],
  //     ['#', '#', '#']
  //   ],
  //   [
  //     ['#', '#', '.'],
  //     ['.', '#', '#']
  //   ],
  //   [
  //     ['.', '#', '.'],
  //     ['#', '#', '#']
  //   ],
  //   [
  //     ['.', '.', '#'],
  //     ['#', '#', '#']
  //   ],
  //   [
  //     ['#', '#', '.'],
  //     ['.', '#', '#']
  //   ]
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
