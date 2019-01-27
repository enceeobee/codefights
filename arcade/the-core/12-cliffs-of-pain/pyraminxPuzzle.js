const assert = require('assert')

function pyraminxPuzzle (faceColors, moves) {
  const puzzle = createSolvedPuzzle(faceColors)

  moves
    .map(m => m)
    .reverse()
    .forEach(move => undoMove(move, puzzle))

  return puzzle
}

function createSolvedPuzzle (faceColors) {
  const [front, bottom, left, right] = faceColors

  return [
    front.repeat(9).split(''),
    bottom.repeat(9).split(''),
    left.repeat(9).split(''),
    right.repeat(9).split('')
  ]
}

function undoMove (move, puzzle) {
  const puzzleCopy = puzzle.map(r => r.map(c => c))
  const wasVertex = /[A-Z]/.test(move)
  const left = [4, 6, 5, 1, 8, 7, 3, 2, 0]
  const right = [8, 3, 7, 6, 0, 2, 1, 5, 4]
  const indices = { u: 0, b: 1, l: 2, r: 3 }
  const i = indices[move[0].toLowerCase()]

  let firstI
  let ahead
  let behind

  if (!move.includes(`'`)) {
    firstI = (i + 3) - (i * 2)
    ahead = left
    behind = right
  } else {
    firstI = i < 2 ? i + 2 : i - 2
    ahead = right
    behind = left
  }
  const secondI = (firstI % 2 === 1) ? firstI - 1 : firstI + 1

  for (let b = 0; b < (wasVertex ? 1 : 4); b++) {
    puzzle[i][b] = puzzleCopy[firstI][behind[b]]
    puzzle[firstI][behind[b]] = puzzleCopy[secondI][ahead[b]]
    puzzle[secondI][ahead[b]] = puzzleCopy[i][b]
  }
}

/*
  Shit, ok, if we're moving a vertex, we're always dealing with:
  curFace[0], left[4], right[8]
  But HOW do we determine what's left or right?
  leftIndex = curFaceIndex + 2(?)
  rightIndex = cur + 3

  front:
    i = 0
    l = 2
    r = 3
  back:
    i = 1
    l = 3
    r = 2
  left:
    i = 2
    l = 0
    r = 1
  right:
    i = 3
    l = 1
    r = 0

  Or we could think about it in terms of rotation:
  for any face:
  front = [0,1,2,3,4,5,6,7,8]
  left  = [4,6,5,1,8,7,3,2,0]
  right = [8,3,7,6,0,2,1,5,4]

  Let's look at vertices, doing a clockwise move
  u/f:
  [0][0] = [3][8] = [(faceIndex+3) - (2*faceIndex)][8] = [3-0][8]
  [3][8] = [2][4] = [faceIndex % 2 === 1 ? faceIndex-1 : faceIndex + 1] = [3-1][4]
  [2][4] = [0][0]

  b:
  [1][0] = [2][8] = [(faceIndex+3) - (2*faceIndex)][8] = [4-2][8]
  [2][8] = [3][4] = [faceIndex % 2 === 1 ? faceIndex-1 : faceIndex + 1] = [2+1][4]
  [3][4] = [1][0]

  l:
  [2][0] = [1][8] = [(faceIndex+3) - (2*faceIndex)][8] = [5-4][8]
  [1][8] = [0][4] = [faceIndex % 2 === 1 ? faceIndex-1 : faceIndex + 1] = [1-1][4]
  [0][4] = [2][0]

  r:
  [3][0] = [0][8] = [(faceIndex+3) - (2*faceIndex)][8] = [6-6][8]
  [0][8] = [1][4] = [faceIndex % 2 === 1 ? faceIndex-1 : faceIndex + 1] = [0+1][4]
  [1][4] = [3][0]

  --- counter clockwise ---

  u/f'
  [0][0] = [2][4] = [faceIndex < 2 ? faceIndex + 2 : faceIndex - 2]
  [2][4] = [3][8] = [faceIndex % 2 === 1 ? faceIndex-1 : faceIndex + 1]
  [3][8] = [0][0]

  b'
  [1][0] = [3][4]
  [3][4] = [2][8]
  [2][8] = [1][0]

  l'
  [2][0] = [0][4]
  [0][4] = [1][8]
  [1][8] = [2][0]

  r'
  [3][0] = [1][4]
  [1][4] = [0][8]
  [0][8] = [3][0]

*/

const makeTest = (f, m, x) => ({ f, m, x })
const tests = [
  /*
    Solved puzzle:
    [ [ 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R' ],
      [ 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G' ],
      [ 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y' ],
      [ 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O' ] ]
  */
  // Custom:
  // Testing one move
  makeTest(
    ['R', 'G', 'Y', 'O'],
    // The last move was 'Upper vertex counterclockwise'
    // So we need to move upper vertex clockwise
    [`U`],
    // [0][0] = [3][8]
    // [3][8] = [2][4]
    // [2][4] = [0][0]
    [ [ 'O', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R' ],
      [ 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G' ],
      [ 'Y', 'Y', 'Y', 'Y', 'R', 'Y', 'Y', 'Y', 'Y' ],
      [ 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'Y' ] ]
  ),
  makeTest(
    ['R', 'G', 'Y', 'O'],
    [`U'`],
    // [0][0] = [2][4]
    // [2][4] = [3][8]
    // [3][8] = [0][0]
    [ [ 'Y', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R' ],
      [ 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G' ],
      [ 'Y', 'Y', 'Y', 'Y', 'O', 'Y', 'Y', 'Y', 'Y' ],
      [ 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'R' ] ]
  ),

  makeTest(
    ['R', 'G', 'Y', 'O'],
    [`B`],
    // [1][0] = [2][8]
    // [2][8] = [3][4]
    // [3][4] = [1][0]
    [ [ 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R' ],
      [ 'Y', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G' ],
      [ 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'O' ],
      [ 'O', 'O', 'O', 'O', 'G', 'O', 'O', 'O', 'O' ] ]
  ),
  makeTest(
    ['R', 'G', 'Y', 'O'],
    [`B'`],
    // [1][0] = [3][4]
    // [3][4] = [2][8]
    // [2][8] = [1][0]
    [ [ 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R' ],
      [ 'O', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G' ],
      [ 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'G' ],
      [ 'O', 'O', 'O', 'O', 'Y', 'O', 'O', 'O', 'O' ] ]
  ),

  makeTest(
    ['R', 'G', 'Y', 'O'],
    // The last move was 'Left vertex counterclockwise'
    // So we want to set the board up for that. Which means
    // we move the left vertex clockwise
    [`L`],
    // [2][0] = [1][8]
    // [1][8] = [0][4]
    // [0][4] = [2][0]
    [ [ 'R', 'R', 'R', 'R', 'Y', 'R', 'R', 'R', 'R' ],
      [ 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'R' ],
      [ 'G', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y' ],
      [ 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O' ] ]
  ),
  makeTest(
    ['R', 'G', 'Y', 'O'],
    [`L'`],
    // [2][0] = [0][4]
    // [0][4] = [1][8]
    // [1][8] = [2][0]
    [ [ 'R', 'R', 'R', 'R', 'G', 'R', 'R', 'R', 'R' ],
      [ 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'Y' ],
      [ 'R', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y' ],
      [ 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O' ] ]
  ),

  makeTest(
    ['R', 'G', 'Y', 'O'],
    [`R`],
    [ [ 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'G' ],
      [ 'G', 'G', 'G', 'G', 'O', 'G', 'G', 'G', 'G' ],
      [ 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y' ],
      [ 'R', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O' ] ]
  ),
  makeTest(
    ['R', 'G', 'Y', 'O'],
    [`R'`],
    // [3][0] = [1][4]
    // [1][4] = [0][8]
    // [0][8] = [3][0]
    [ [ 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'O' ],
      [ 'G', 'G', 'G', 'G', 'R', 'G', 'G', 'G', 'G' ],
      [ 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y' ],
      [ 'G', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O' ] ]
  ),

  // ---

  // Row rotations
  makeTest(
    ['R', 'G', 'Y', 'O'],
    [`u'`],
    [ [ 'Y', 'Y', 'Y', 'Y', 'R', 'R', 'R', 'R', 'R' ],
      [ 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G' ],
      [ 'Y', 'O', 'Y', 'Y', 'O', 'O', 'O', 'Y', 'Y' ],
      [ 'O', 'O', 'O', 'R', 'O', 'O', 'R', 'R', 'R' ] ]
  ),
  makeTest(
    ['R', 'G', 'Y', 'O'],
    [`u`],
    [ [ 'O', 'O', 'O', 'O', 'R', 'R', 'R', 'R', 'R' ],
      [ 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G' ],
      [ 'Y', 'R', 'Y', 'Y', 'R', 'R', 'R', 'Y', 'Y' ],
      [ 'O', 'O', 'O', 'Y', 'O', 'O', 'Y', 'Y', 'Y' ] ]
  ),

  makeTest(
    ['R', 'G', 'Y', 'O'],
    [`b`],
    // move back clockwise
    // back -> l; l -> r; r -> b
    // [1][0] = [2][8]
    // [2][8] = [3][4]
    // [3][4] = [1][0]
    [ [ 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R' ],
      [ 'Y', 'Y', 'Y', 'Y', 'G', 'G', 'G', 'G', 'G' ],
      [ 'Y', 'Y', 'Y', 'O', 'Y', 'Y', 'O', 'O', 'O' ],
      [ 'O', 'G', 'O', 'O', 'G', 'G', 'G', 'O', 'O' ] ]
  ),
  // b'
  makeTest(
    ['R', 'G', 'Y', 'O'],
    [`b'`],
    // [1][0] = [3][4]
    // [3][4] = [2][8]
    // [2][8] = [1][0]
    [ [ 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R' ],
      [ 'O', 'O', 'O', 'O', 'G', 'G', 'G', 'G', 'G' ],
      [ 'Y', 'Y', 'Y', 'G', 'Y', 'Y', 'G', 'G', 'G' ],
      [ 'O', 'Y', 'O', 'O', 'Y', 'Y', 'Y', 'O', 'O' ] ]
  ),

  makeTest(
    ['R', 'G', 'Y', 'O'],
    [`l`],
    // [2][0] = [1][8]
    // [1][8] = [0][4]
    // [0][4] = [2][0]
    [ [ 'R', 'Y', 'R', 'R', 'Y', 'Y', 'Y', 'R', 'R' ],
      [ 'G', 'G', 'G', 'R', 'G', 'G', 'R', 'R', 'R' ],
      [ 'G', 'G', 'G', 'G', 'Y', 'Y', 'Y', 'Y', 'Y' ],
      [ 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O' ] ]
  ),
  makeTest(
    ['R', 'G', 'Y', 'O'],
    [`l'`],
    // [2][0] = [0][4]
    // [0][4] = [1][8]
    // [1][8] = [2][0]
    [ [ 'R', 'G', 'R', 'R', 'G', 'G', 'G', 'R', 'R' ],
      [ 'G', 'G', 'G', 'Y', 'G', 'G', 'Y', 'Y', 'Y' ],
      [ 'R', 'R', 'R', 'R', 'Y', 'Y', 'Y', 'Y', 'Y' ],
      [ 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O' ] ]
  ),

  makeTest(
    ['R', 'G', 'Y', 'O'],
    [`r`],
    // [3][0] = [0][8]
    // [0][8] = [1][4]
    // [1][4] = [3][0]
    [ [ 'R', 'R', 'R', 'G', 'R', 'R', 'G', 'G', 'G' ],
      [ 'G', 'O', 'G', 'G', 'O', 'O', 'O', 'G', 'G' ],
      [ 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y' ],
      [ 'R', 'R', 'R', 'R', 'O', 'O', 'O', 'O', 'O' ] ]
  ),
  makeTest(
    ['R', 'G', 'Y', 'O'],
    [`r'`],
    // [3][0] = [1][4]
    // [1][4] = [0][8]
    // [0][8] = [3][0]
    [ [ 'R', 'R', 'R', 'O', 'R', 'R', 'O', 'O', 'O' ],
      [ 'G', 'R', 'G', 'G', 'R', 'R', 'R', 'G', 'G' ],
      [ 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y' ],
      [ 'G', 'G', 'G', 'G', 'O', 'O', 'O', 'O', 'O' ] ]
  ),

  // ---

  // Combo moves
  makeTest(
    ['R', 'G', 'Y', 'O'],
    [`u'`, 'R'],
    [
      ['Y', 'Y', 'Y', 'Y', 'R', 'R', 'R', 'R', 'G'],
      ['G', 'G', 'G', 'G', 'O', 'G', 'G', 'G', 'G'],
      ['Y', 'O', 'Y', 'Y', 'O', 'O', 'O', 'Y', 'Y'],
      ['R', 'O', 'O', 'R', 'O', 'O', 'R', 'R', 'R']
    ]
  ),

  // ---

  // Codefight tests
  makeTest(
    ['R', 'G', 'Y', 'O'],
    ['B', "b'", "u'", 'R'],
    [['Y', 'Y', 'Y', 'Y', 'R', 'R', 'R', 'R', 'G'],
      ['G', 'R', 'O', 'O', 'O', 'G', 'G', 'G', 'G'],
      ['Y', 'O', 'Y', 'G', 'O', 'O', 'G', 'G', 'Y'],
      ['R', 'O', 'O', 'R', 'O', 'Y', 'Y', 'R', 'R']]
  ),

  makeTest(
    ['R', 'G', 'Y', 'O'],
    ['l', "l'"],
    [['R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R'],
      ['G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G'],
      ['Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y'],
      ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O']]
  ),

  makeTest(
    ['R', 'G', 'Y', 'O'],
    ['l',
      "l'",
      'u',
      'R',
      "U'",
      'L',
      "R'",
      "u'",
      "l'",
      "L'",
      'r'],
    [['Y', 'O', 'R', 'G', 'G', 'G', 'G', 'G', 'G'],
      ['G', 'O', 'G', 'Y', 'O', 'O', 'Y', 'Y', 'Y'],
      ['R', 'G', 'R', 'R', 'O', 'Y', 'Y', 'Y', 'Y'],
      ['R', 'R', 'R', 'R', 'O', 'O', 'O', 'O', 'R']]
  ),

  makeTest(
    ['R', 'G', 'Y', 'O'],
    ['r'],
    [['R', 'R', 'R', 'G', 'R', 'R', 'G', 'G', 'G'],
      ['G', 'O', 'G', 'G', 'O', 'O', 'O', 'G', 'G'],
      ['Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y'],
      ['R', 'R', 'R', 'R', 'O', 'O', 'O', 'O', 'O']]
  ),

  makeTest(
    ['A', 'B', 'C', 'D'],
    ['l',
      "l'",
      "r'",
      'r',
      'u',
      'U',
      "u'",
      "R'",
      'L',
      'R',
      "L'",
      "B'",
      "U'",
      'b',
      'B',
      "b'"],
    [['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A'],
      ['B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B'],
      ['C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C'],
      ['D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D']]
  )
]

tests.forEach(({ f, m, x }) => assert.deepStrictEqual(pyraminxPuzzle(f, m), x))
