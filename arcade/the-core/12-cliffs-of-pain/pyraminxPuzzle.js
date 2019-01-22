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

  console.log('puzzle', puzzle)

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
  const isClockwise = move.includes(`'`)
  const isVertex = /[A-Z]/.test(move)

  // Remember that we're undoing a move, so move in the
  // opposite direction of `isClockwise`

  console.log(`${move} - Is clockwise? ${isClockwise}; Is vertex? ${isVertex}`)

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
    // This means "the upper vertex is comprised of front[0], left[0], and right[0]"
    U: {
      pieces: [0, -1, 0, 0]
    },
    // back[8], left[8], right[8]
    B: {
      pieces: [-1, 8, 8, 8]
    },
    // front[4], back[0], left[4]
    L: {
      pieces: [4, 0, 4, -1]
    },
    // front[8], bottom[4], no left, right[4]
    R: {
      pieces: [8, 4, -1, 4]
    }
  }

  if (isVertex) {
    let temp = -1

    if (isClockwise) {
      // TODO
    } else {
      // Rotate this vertex clockwise
      let { pieces } = vertices[move[0]]
      let setIndex = 0
      let getIndex = 1


      console.log('pieces', pieces)


      // for (let i = 0; i < 4; i++) {


      //   console.log(`set ${setIndex}; get ${getIndex}`)


      //   if (pieces[setIndex] === -1) {
      //     // getIndex++
      //     setIndex++
      //     continue
      //   } else if (pieces[getIndex] === -1) {
      //     getIndex++
      //     continue
      //   }

      //   if (temp === -1) temp = puzzle[setIndex][pieces[setIndex]]

      //   puzzle[setIndex][pieces[setIndex]] = puzzle[getIndex][pieces[getIndex]]

      //   getIndex++
      //   setIndex++
      // }
      // TODO - I'm not sure this is accurate?
      // if (puzzle[3][pieces[3]] !== -1) {
      //   puzzle[3][pieces[3]] = temp
      // }

      // This is backwards DOH
      // let i = 0
      // while (i < 4) {

      //   // Shit, I have this backwards...
      //   console.log(`${i} -> ${getIndex}`)


      //   if (pieces[i] === -1) {
      //     i++
      //     getIndex++
      //     continue
      //   }
      //   if (pieces[getIndex] === -1) {
      //     getIndex++
      //     continue
      //   }
      //   if (temp === -1) temp = puzzle[i][pieces[i]]

      //   puzzle[i][pieces[i]] = (i !== 3) ? puzzle[getIndex][pieces[getIndex]] : temp

      //   i = getIndex++
      // }
      let i = 0
      let temp2
      setIndex = i + 1

      while (i < 4) {

        console.log(`${i} -> ${setIndex}`)

        // i -> setIndex
        // Front goes to left
        // Left goes to right
        // Right goes to front
        /*
          2,0 grabs 0,0
          3,0 grabs 2,0 (but its original value)
          0,0 grabs 3,0's orig val

          ---or---

          2,0 grabs 0,0; temp = 2,0
          3,0 grabs temp; temp = 3,0
          0,0 grabs temp
        */
        if (pieces[i] === -1) {
          i++
          continue
        }
        if (pieces[setIndex] === -1) {
          setIndex++
          continue
        }
        if (i === 3) {
          puzzle[0][pieces[0]] = temp
          break
        }

        if (temp === -1) {
          temp = puzzle[setIndex][pieces[setIndex]]
          puzzle[setIndex][pieces[setIndex]] = puzzle[i][pieces[i]]
        } else {
          temp2 = puzzle[setIndex][pieces[setIndex]]
          puzzle[setIndex][pieces[setIndex]] = temp
          temp = temp2
        }
        // temp = puzzle[setIndex][pieces[setIndex]]

        // Both i and setIndex are legit, so set
        // puzzle[setIndex][pieces[setIndex]] = puzzle[i][pieces[i]]
        // puzzle[setIndex][pieces[setIndex]] = temp

        i = setIndex++
      }
    }
  }
}

const makeTest = (f, m, x) => ({ f, m, x })
const tests = [
  // Custom:
  // Testing one move
  makeTest(
    ['R', 'G', 'Y', 'O'],
    [`U`],
    [ [ 'O', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R' ],
      [ 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G' ],
      [ 'R', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y' ],
      [ 'Y', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O' ] ]
  ),

  makeTest(
    ['R', 'G', 'Y', 'O'],
    ['R'],
    [ [ 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'G' ],
      [ 'G', 'G', 'G', 'G', 'O', 'G', 'G', 'G', 'G' ],
      [ 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y' ],
      [ 'O', 'O', 'O', 'O', 'R', 'O', 'O', 'O', 'O' ] ]
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
