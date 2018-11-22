const assert = require('assert')

// 1022220 = true
function increaseNumberRoundness (n) {
  return /0[1-9]+0*$/g.test(String(n))
  // return /0[1-9]0*\d$/g.test(String(n));
}

let n = 902200100
let actual = increaseNumberRoundness(n)
let expected = true
assert.strictEqual(actual, expected)

n = 11000
actual = increaseNumberRoundness(n)
expected = false
assert.strictEqual(actual, expected)

n = 3
actual = increaseNumberRoundness(n)
expected = false
assert.strictEqual(actual, expected)

n = 1022220
actual = increaseNumberRoundness(n)
expected = true
assert.strictEqual(actual, expected)

n = 106611
actual = increaseNumberRoundness(n)
expected = true
assert.strictEqual(actual, expected)

console.log('All tests passed.')
