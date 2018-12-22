const { deepStrictEqual } = require('assert')

function snakeGame (gameBoard, commands) {
  const snake = { isAlive: true }
  let board = gameBoard.map(r => r.map(c => c))

  snake.head = generateHead(board)
  snake.body = generateBody(snake.head, board)

  let i = 0
  while (i < commands.length && snake.isAlive) {
    moveSnake(commands[i], snake, board)
    i++
  }

  return drawBoard(board.length, board[0].length, snake)
}

function generateHead (board) {
  const directions = {
    '^': 'U',
    '>': 'R',
    'v': 'D',
    '<': 'L'
  }

  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[0].length; c++) {
      if (directions[board[r][c]]) {
        return {
          row: r,
          col: c,
          facing: directions[board[r][c]]
        }
      }
    }
  }

  return {}
}

function generateBody (head, board) {
  const body = []

  let curRow = head.row
  let curCol = head.col

  if (head.facing === 'U') {
    curRow = head.row + 1
    if (board[curRow][curCol] === '*') {
      body.push({ row: curRow, col: curCol, dir: 'D' })
    }
  } else if (head.facing === 'R') {
    curCol = head.col - 1
    if (board[curRow][curCol] === '*') {
      body.push({ row: curRow, col: curCol, dir: 'L' })
    }
  } else if (head.facing === 'D') {
    curRow = head.row - 1
    if (board[curRow][curCol] === '*') {
      body.push({ row: curRow, col: curCol, dir: 'U' })
    }
  } else {
    // L
    curCol = head.col + 1
    if (board[curRow][curCol] === '*') {
      body.push({ row: curRow, col: curCol, dir: 'R' })
    }
  }

  const findNextCell = (row, col, dir) => {
    const cells = []

    // Up
    if (row > 0 && board[row - 1][col] === '*') {
      // If the last cell was looking down, skip
      const lastCellLookedDown = body.length > 0 && body.slice(-1)[0].dir === 'D'
      if (!lastCellLookedDown) cells.push({ col, row: row - 1, dir: 'U' })
    }
    // Right
    if (col < board[row].length - 1 && board[row][col + 1] === '*') {
      const lastCellLookedLeft = body.length > 0 && body.slice(-1)[0].dir === 'L'
      if (!lastCellLookedLeft) cells.push({ row, col: col + 1, dir: 'R' })
    }
    // Down
    if (row < board.length - 1 && board[row + 1][col] === '*') {
      const lastCellLookedUp = body.length > 0 && body.slice(-1)[0].dir === 'U'
      if (!lastCellLookedUp) cells.push({ col, row: row + 1, dir: 'D' })
    }
    // Left
    if (col > 0 && board[row][col - 1] === '*') {
      const lastCellLookedRight = body.length > 0 && body.slice(-1)[0].dir === 'R'
      if (!lastCellLookedRight) cells.push({ row, col: col - 1, dir: 'L' })
    }

    if (cells.length === 1) {
      body.push(cells[0])
      return findNextCell(cells[0].row, cells[0].col, cells[0].dir)
    }

    return body
  }

  // return findNextCell(head.row, head.col, head.facing)
  return findNextCell(curRow, curCol, head.facing)
}

function moveSnake (command, snake, board) {
  if (command === 'F') {
    if (snake.head.facing === 'U') {
      snake.isAlive = snake.head.row > 0 && !snake.body.some(cl => cl.col === snake.head.col && cl.row === snake.head.row - 1)
      if (snake.isAlive) {
        snake.body = getUpdatedBody(snake)
        snake.head.row--
      }
    } else if (snake.head.facing === 'R') {
      snake.isAlive = snake.head.col < board[snake.head.row].length - 1 && !snake.body.some(cl => cl.row === snake.head.row && cl.col === snake.head.col + 1)
      if (snake.isAlive) {
        snake.body = getUpdatedBody(snake)
        snake.head.col++
      }
    } else if (snake.head.facing === 'D') {
      snake.isAlive = snake.head.row < board.length - 1 && !snake.body.some(cl => cl.col === snake.head.col && cl.row === snake.head.row + 1)
      if (snake.isAlive) {
        snake.body = getUpdatedBody(snake)
        snake.head.row++
      }
    } else { // 'L'
      snake.isAlive = snake.head.col > 0 && !snake.body.some(cl => cl.row === snake.head.row && cl.col === snake.head.col - 1)
      if (snake.isAlive) {
        snake.body = getUpdatedBody(snake)
        snake.head.col--
      }
    }
  } else if (command === 'L') {
    if (snake.head.facing === 'U') {
      snake.head.facing = 'L'
    } else if (snake.head.facing === 'R') {
      snake.head.facing = 'U'
    } else if (snake.head.facing === 'D') {
      snake.head.facing = 'R'
    } else { // 'L'
      snake.head.facing = 'D'
    }
  } else { // 'R'
    if (snake.head.facing === 'U') {
      snake.head.facing = 'R'
    } else if (snake.head.facing === 'R') {
      snake.head.facing = 'D'
    } else if (snake.head.facing === 'D') {
      snake.head.facing = 'L'
    } else { // 'L'
      snake.head.facing = 'U'
    }
  }
}

function getUpdatedBody ({ head, body }) {
  let newBody = []
  for (let i = body.length - 1; i > 0; i--) {
    newBody.unshift({
      row: body[i - 1].row,
      col: body[i - 1].col
    })
  }

  // Update the first cell to be the old head's position
  newBody.unshift({
    row: head.row,
    col: head.col
  })

  return newBody
}

function drawBoard (rows, cols, snake) {
  const board = []
  const heads = {
    U: '^',
    R: '>',
    D: 'v',
    L: '<'
  }

  for (let r = 0; r < rows; r++) {
    board.push([])
    for (let c = 0; c < cols; c++) {
      board[r].push('.')
    }
  }

  board[snake.head.row][snake.head.col] = snake.isAlive ? heads[snake.head.facing] : 'X'

  snake.body.forEach(cl => (board[cl.row][cl.col] = snake.isAlive ? '*' : 'X'))

  return board
}

const makeTest = (b, c, x) => ({ b, c, x })
const tests = [
  makeTest(
    [
      ['.', '.', '.', '.'],
      ['.', '.', '<', '*'],
      ['.', '.', '.', '*']],
    'FFFFFRFFRRLLF',
    [
      ['.', '.', '.', '.'],
      ['X', 'X', 'X', '.'],
      ['.', '.', '.', '.']]
  ),

  makeTest(
    [
      ['.', '.', '^', '.', '.'],
      ['.', '.', '*', '*', '.'],
      ['.', '.', '.', '*', '*']],
    'RFRF',
    [
      ['.', '.', 'X', 'X', '.'],
      ['.', '.', 'X', 'X', '.'],
      ['.', '.', '.', 'X', '.']]
  ),

  makeTest(
    [
      ['.', '.', '*', '>', '.'],
      ['.', '*', '*', '.', '.'],
      ['.', '.', '.', '.', '.']],
    'FRFFRFFRFLFF',
    [
      ['.', '.', '.', '.', '.'],
      ['<', '*', '*', '.', '.'],
      ['.', '.', '*', '.', '.']]
  ),

  makeTest(
    [
      ['*', '*', '>'],
      ['*', '.', '.'],
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['.', '.', '.']],
    'RFRFFLFLFFRFRFFLFLFFRFRFFLFF',
    [
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['X', 'X', 'X'],
      ['X', '.', '.']]
  ),

  makeTest(
    [
      ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '<', '*', '*', '*', '*', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '*', '.', '.'],
      ['.', '.', '.', '.', '*', '*', '*', '.', '.'],
      ['.', '.', '.', '.', '*', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '*', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.']],
    'FFFFFRFFRRLLF',
    [
      ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['X', 'X', 'X', 'X', 'X', 'X', 'X', '.', '.'],
      ['.', '.', '.', '.', '.', '.', 'X', '.', '.'],
      ['.', '.', '.', '.', 'X', 'X', 'X', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.']]
  ),

  makeTest(
    [
      ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '<', '*', '*', '*', '*', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '*', '.', '.'],
      ['.', '.', '.', '.', '*', '*', '*', '.', '.'],
      ['.', '.', '.', '.', '*', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '*', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.']],
    'LFLFRFLFRFFF',
    [
      ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '*', '*', '*', '*', '.', '.', '.'],
      ['.', '.', '*', '*', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '*', '*', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '*', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '*', '.', '.', '.', '.'],
      ['.', '.', '.', '.', 'v', '.', '.', '.', '.']]
  ),

  makeTest(
    [
      ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '<', '*', '*', '*', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '*', '.', '.', '.'],
      ['.', '.', '.', '.', '*', '*', '.', '.', '.'],
      ['.', '.', '.', '.', '*', '.', '*', '*', '.'],
      ['.', '.', '.', '.', '*', '*', '*', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.']],
    'LFLFLFFFF',
    [
      ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', 'X', 'X', 'X', 'X', '.', '.', '.'],
      ['.', '.', 'X', 'X', '.', 'X', '.', '.', '.'],
      ['.', '.', '.', '.', 'X', 'X', '.', '.', '.'],
      ['.', '.', '.', '.', 'X', '.', '.', '.', '.'],
      ['.', '.', '.', '.', 'X', 'X', 'X', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.']]
  ),

  // Hidden test 13
  makeTest([['>', '.', '.', '.', '.', '.']],
    'R',
    [['v', '.', '.', '.', '.', '.']]
  ),

  // Hidden test 14
  makeTest([['.', '.', '.', '.'],
    ['.', '.', '<', '*'],
    ['*', '*', '*', '*']],
  'FLFLFLF',
  [ [ '.', '.', '.', '.' ],
    [ '.', 'X', 'X', 'X' ],
    [ '.', 'X', 'X', 'X' ] ])
]

tests.forEach(t => deepStrictEqual(snakeGame(t.b, t.c), t.x))
