const assert = require('assert')

function bishopAndPawn (b, p) {
  const cols = 'abcdefgh'
  const colDiff = cols.indexOf(b[0]) - cols.indexOf(p[0])
  const rowDiff = b[1] - p[1]

  return colDiff !== 0 && rowDiff !== 0 && (Math.abs(colDiff) === Math.abs(rowDiff))
}

let b
let p
let actual
let expected

b = 'a1'
p = 'c3'
expected = true
actual = bishopAndPawn(b, p)
assert.strictEqual(actual, expected)

b = 'h1'
p = 'h3'
expected = false
actual = bishopAndPawn(b, p)
assert.strictEqual(actual, expected)

b = 'a5'
p = 'c3'
expected = true
actual = bishopAndPawn(b, p)
assert.strictEqual(actual, expected)

b = 'g1'
p = 'f3'
expected = false
actual = bishopAndPawn(b, p)
assert.strictEqual(actual, expected)

b = 'd4'
p = 'g1'
expected = true
actual = bishopAndPawn(b, p)
assert.strictEqual(actual, expected)

console.log('All tests passed.')
