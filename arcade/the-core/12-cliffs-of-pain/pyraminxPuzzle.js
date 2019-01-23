const assert = require('assert')

/*
  [output] array.array.char

  Initial state of the puzzle.
  result[0] should contain 9 characters corresponding to the front face,
  result[1] - to the bottom face,
  result[2] - to the left face and
  result[3] - to the right face.

  The colors for each face should be given in top-to-bottom and left-to-right order,
  starting from the marked vertex (i.e. U, B, L or R),
  assuming that this vertex is at the top of the puzzle.
*/
/*
  Notes:
    * We can move individual layers as well as corners
    * Everything will be in the following order:
      * Top/Up/Front
      * Bottom/Back
      * Left
      * Right
*/
/*
  Plan:
    * Construct the solved puzzle
    * Step through each move backwards
    * Adjust the puzzle according to the move
      * Remember to do the inverse of the given move
    * Return puzzle
*/
function pyraminxPuzzle (faceColors, moves) {
  const puzzle = createSolvedPuzzle(faceColors)

  moves
    .map(m => m)
    .reverse()
    .forEach(move => undoMove(move, puzzle))

  // console.log('puzzle', puzzle)

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
  /*
    MOVES:
      * U - 120° counterclockwise turn of top tip (assuming that we're looking at the pyraminx from the top, and vertex U is the topmost);
      * U' - clockwise turn for the same tip;
      * u - 120° counterclockwise turn of two upper layers;
      * u' - clockwise turn for the same layers.

      * B - 120° counterclockwise turn of backmost tip (facing away from the player)
      * B' - clockwise turn for the same tip;
      * b - 120° counterclockwise turn of two bottom layers;
      * b' - clockwise turn for the same layers.

      * L - 120° counterclockwise turn of left tip
      * L' - clockwise turn for the same tip;
      * l - 120° counterclockwise turn of two left layers;
      * l' - clockwise turn for the same layers.

      * R - 120° counterclockwise turn of right tip
      * R' - clockwise turn for the same tip;
      * r - 120° counterclockwise turn of two right layers;
      * r' - clockwise turn for the same layers.

    Notes:
      * `'` indicates *clockwise*
      * [A-Z] indicates vertices
      * [a-z] indicates layers
  */
  const wasClockwiseMove = move.includes(`'`)
  const isVertex = /[A-Z]/.test(move)

  // Remember that we're undoing a move, so move in the
  // opposite direction of `wasClockwiseMove`

  // console.log(`${move} - Was clockwise? ${wasClockwiseMove}; Is vertex? ${isVertex}`)

  /*
    Example: move = `R`
      * This means 'Move the right vertex counterclockwise
      * So we want to move the right vertex clockwise
      * The right vertex is comprised of front[9], right[5], and bottom[5] (1-indexed)
      * Using 0 index, the new values will be:
        * front[8] = bottom[4]
        * bottom[4] = right[4]
        * right[4] = front[8] (before its new value)

    Example: move = `L`
      * This means 'Move the left vertex counterclockwise
      * So we want to move the left vertex clockwise
      * The left vertex is comprised of front[5], left[9], and bottom[1] (1-indexed)
      * Using 0 index, the new values will be:
        * front[4] = green = bottom[0]
        * left[9] = red = front[4] (before its new value)
        * bottom[0] = yellow = left[9] (before its new value)
  */

  const vertices = {
    // This means "the upper vertex is comprised of front[0], left[4], and right[8]"
    U: [0, -1, 4, 8],
    // back[0], left[8], right[4]
    B: [-1, 0, 8, 4],
    // front[4], back[8], left[0]
    L: [4, 8, 0, -1],
    // front[8], bottom[4], right[0]
    R: [8, 4, -1, 0]
  }

  if (isVertex) {
    let pieces = vertices[move[0].toUpperCase()]
    let getIndex = -1

    if (wasClockwiseMove) {
      // Rotate this vertex counterclockwise
      for (let i = 0; i < 4; i++) {
        if (pieces[i] < 0) continue
        getIndex = findNewValueIndexCounterClockwise(i + 1, pieces)
        puzzle[i][pieces[i]] = puzzleCopy[getIndex][pieces[getIndex]]
      }
    } else {
      // Rotate this vertex clockwise
      for (let i = 0; i < 4; i++) {
        if (pieces[i] < 0) continue
        getIndex = findNewValueIndexClockwise(i - 1, pieces)
        puzzle[i][pieces[i]] = puzzleCopy[getIndex][pieces[getIndex]]
      }
    }
  } else {
    // Move top two rows
    // So we basically always move the vertex,
    // then conditionally rotate the middle row
  }
}

function findNewValueIndexClockwise (start, pieces) {
  if (start < 0) start = pieces.length - 1

  for (let i = start; i >= 0; i--) {
    if (pieces[i] >= 0) return i
  }

  return pieces.length - 1
}

function findNewValueIndexCounterClockwise (start, pieces) {
  if (start > 3) start = 0

  for (let i = start; i < 4; i++) {
    if (pieces[i] >= 0) return i
  }

  return 0
}

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
  //  U: [0, -1, 4, 8],
  makeTest(
    ['R', 'G', 'Y', 'O'],
    [`U`],
    [ [ 'O', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R' ],
      [ 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G' ],
      [ 'Y', 'Y', 'Y', 'Y', 'R', 'Y', 'Y', 'Y', 'Y' ],
      [ 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'Y' ] ]
  ),
  makeTest(
    ['R', 'G', 'Y', 'O'],
    [`U'`],
    [ [ 'Y', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R' ],
      [ 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G' ],
      [ 'Y', 'Y', 'Y', 'Y', 'O', 'Y', 'Y', 'Y', 'Y' ],
      [ 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'R' ] ]
  ),

  // B: [-1, 0, 8, 4],
  makeTest(
    ['R', 'G', 'Y', 'O'],
    [`B`],
    [ [ 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R' ],
      [ 'O', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G' ],
      [ 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'G' ],
      [ 'O', 'O', 'O', 'O', 'Y', 'O', 'O', 'O', 'O' ] ]
  ),
  makeTest(
    ['R', 'G', 'Y', 'O'],
    [`B'`],
    [ [ 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R' ],
      [ 'Y', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G' ],
      [ 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'O' ],
      [ 'O', 'O', 'O', 'O', 'G', 'O', 'O', 'O', 'O' ] ]
  ),

  // L: [4, 8, 0, -1],
  makeTest(
    ['R', 'G', 'Y', 'O'],
    [`L`],
    [ [ 'R', 'R', 'R', 'R', 'Y', 'R', 'R', 'R', 'R' ],
      [ 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'R' ],
      [ 'G', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y' ],
      [ 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O' ] ]
  ),
  makeTest(
    ['R', 'G', 'Y', 'O'],
    [`L'`],
    [ [ 'R', 'R', 'R', 'R', 'G', 'R', 'R', 'R', 'R' ],
      [ 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'Y' ],
      [ 'R', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y' ],
      [ 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O' ] ]
  ),

  // R: [8, 4, -1, 0]
  makeTest(
    ['R', 'G', 'Y', 'O'],
    ['R'],
    [ [ 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'O' ],
      [ 'G', 'G', 'G', 'G', 'R', 'G', 'G', 'G', 'G' ],
      [ 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y' ],
      [ 'G', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O' ] ]
  ),
  makeTest(
    ['R', 'G', 'Y', 'O'],
    [`R'`],
    [ [ 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'G' ],
      [ 'G', 'G', 'G', 'G', 'O', 'G', 'G', 'G', 'G' ],
      [ 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y' ],
      [ 'R', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O' ] ]
  ),

  // makeTest(
  //   ['R', 'G', 'Y', 'O'],
  //   ['B', "b'", "u'", 'R'],
  //   [['Y', 'Y', 'Y', 'Y', 'R', 'R', 'R', 'R', 'G'],
  //     ['G', 'R', 'O', 'O', 'O', 'G', 'G', 'G', 'G'],
  //     ['Y', 'O', 'Y', 'G', 'O', 'O', 'G', 'G', 'Y'],
  //     ['R', 'O', 'O', 'R', 'O', 'Y', 'Y', 'R', 'R']]
  // ),

  // makeTest(
  //   ['R', 'G', 'Y', 'O'],
  //   ['l', "l'"],
  //   [['R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R'],
  //     ['G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G'],
  //     ['Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y'],
  //     ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O']]
  // ),

  // makeTest(
  //   ['R', 'G', 'Y', 'O'],
  //   ['l',
  //     "l'",
  //     'u',
  //     'R',
  //     "U'",
  //     'L',
  //     "R'",
  //     "u'",
  //     "l'",
  //     "L'",
  //     'r'],
  //   [['Y', 'O', 'R', 'G', 'G', 'G', 'G', 'G', 'G'],
  //     ['G', 'O', 'G', 'Y', 'O', 'O', 'Y', 'Y', 'Y'],
  //     ['R', 'G', 'R', 'R', 'O', 'Y', 'Y', 'Y', 'Y'],
  //     ['R', 'R', 'R', 'R', 'O', 'O', 'O', 'O', 'R']]
  // ),

  // makeTest(
  //   ['R', 'G', 'Y', 'O'],
  //   ['r'],
  //   [['R', 'R', 'R', 'G', 'R', 'R', 'G', 'G', 'G'],
  //     ['G', 'O', 'G', 'G', 'O', 'O', 'O', 'G', 'G'],
  //     ['Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y'],
  //     ['R', 'R', 'R', 'R', 'O', 'O', 'O', 'O', 'O']]
  // ),

  // makeTest(
  //   ['A', 'B', 'C', 'D'],
  //   ['l',
  //     "l'",
  //     "r'",
  //     'r',
  //     'u',
  //     'U',
  //     "u'",
  //     "R'",
  //     'L',
  //     'R',
  //     "L'",
  //     "B'",
  //     "U'",
  //     'b',
  //     'B',
  //     "b'"],
  //   [['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A'],
  //     ['B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B'],
  //     ['C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C'],
  //     ['D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D']]
  // )
]

tests.forEach(({ f, m, x }) => assert.deepStrictEqual(pyraminxPuzzle(f, m), x))
