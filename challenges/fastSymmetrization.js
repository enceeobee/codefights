const assert = require('assert')

function fastSymmetrization (a) {
  let nonStarChar

  for (let r = 0; r < a.length; r++) {
    for (let c = 0; c < a[0].length; c++) {
      if (!isCellSymmetric(r, c, a)) return []

      nonStarChar = [a[r][c], ...getCorrespondingChars(r, c, a)]
        .filter(char => char !== '*')
        .pop()

      if (nonStarChar) {
        a[r][c] = nonStarChar
        a[r][a[0].length - 1 - c] = nonStarChar
        a[a.length - 1 - r][c] = nonStarChar
      }
    }
  }

  return a
}

function isCellSymmetric (rowIndex, colIndex, table) {
  const chars = [table[rowIndex][colIndex], ...getCorrespondingChars(rowIndex, colIndex, table)]
  const charMap = chars
    .filter(char => char !== '*')
    .reduce((acc, val) => {
      if (!acc[val]) acc[val] = true
      return acc
    }, {})

  return Object.keys(charMap).length < 2
}

function getCorrespondingChars (rowIndex, colIndex, table) {
  const correspondingRowChar = table[rowIndex][table[0].length - 1 - colIndex]
  const correspondingColChar = table[table.length - 1 - rowIndex][colIndex]

  return [correspondingRowChar, correspondingColChar]
}

// console.log('Testing isCellSymmetric')
let a = [
  ['*', '*', 'c', '*'],
  ['*', 'b', '*', 'a'],
  ['a', '*', '*', '*'],
  ['*', '*', 'c', '*']
]

// Test every cell in a
for (let r = 0; r < a.length; r++) {
  for (let c = 0; c < a[0].length; c++) {
    assert.strictEqual(isCellSymmetric(r, c, a), true)
  }
}

a = [
  ['*', 'a'],
  ['b', '*']
]
assert.strictEqual(isCellSymmetric(0, 0, a), false)
assert.strictEqual(isCellSymmetric(0, 1, a), true)
assert.strictEqual(isCellSymmetric(1, 0, a), true)
assert.strictEqual(isCellSymmetric(1, 1, a), false)

const makeTest = (a, x) => ({ a, x })
const tests = [
  makeTest([
    ['*', '*', 'c', '*'],
    ['*', 'b', '*', 'a'],
    ['a', '*', '*', '*'],
    ['*', '*', 'c', '*']
  ],
  [
    ['*', 'c', 'c', '*'],
    ['a', 'b', 'b', 'a'],
    ['a', 'b', 'b', 'a'],
    ['*', 'c', 'c', '*']
  ]),
  makeTest([
    ['*', 'a', 'b', '*'],
    ['*', 'a', 'b', '*']
  ],
  []
  ),
  makeTest([
    ['*', '*'],
    ['*', '*']
  ],
  [
    ['*', '*'],
    ['*', '*']
  ]),
  makeTest([
    ['*', 'a'],
    ['b', '*']
  ],
  []
  ),
  makeTest([
    ['a', '*'],
    ['*', 'a']
  ],
  [
    ['a', 'a'],
    ['a', 'a']
  ]),
  makeTest([
    ['*', '*'],
    ['*', 'x'],
    ['*', '*'],
    ['*', '*']
  ],
  [
    ['*', '*'],
    ['x', 'x'],
    ['x', 'x'],
    ['*', '*']
  ])
]

tests.forEach(t => assert.deepStrictEqual(fastSymmetrization(t.a), t.x))
