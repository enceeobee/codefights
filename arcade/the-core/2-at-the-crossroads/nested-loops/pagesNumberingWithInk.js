const assert = require('assert')

function pagesNumberingWithInk (current, numberOfDigits) {
  let currentPage = current
  let digitsLeft = numberOfDigits
  let didPrint = false

  while (true) {
    if (didPrint) currentPage += 1
    if (digitsLeft >= String(currentPage).length) {
      digitsLeft -= String(currentPage).length
      didPrint = digitsLeft >= String(currentPage + 1).length
    } else {
      return currentPage
    }
  }
}

let current
let numberOfDigits
let expected
let actual

current = 1
numberOfDigits = 2
expected = 2
actual = pagesNumberingWithInk(current, numberOfDigits)
assert.strictEqual(actual, expected)

current = 1
numberOfDigits = 5
expected = 5
actual = pagesNumberingWithInk(current, numberOfDigits)
assert.strictEqual(actual, expected)

current = 21
numberOfDigits = 5
expected = 22
actual = pagesNumberingWithInk(current, numberOfDigits)
assert.strictEqual(actual, expected)

current = 8
numberOfDigits = 4
expected = 10
actual = pagesNumberingWithInk(current, numberOfDigits)
assert.strictEqual(actual, expected)

current = 21
numberOfDigits = 6
expected = 23
actual = pagesNumberingWithInk(current, numberOfDigits)
assert.strictEqual(actual, expected)

current = 76
numberOfDigits = 250
expected = 166
actual = pagesNumberingWithInk(current, numberOfDigits)
assert.strictEqual(actual, expected)

current = 80
numberOfDigits = 1000
expected = 419
actual = pagesNumberingWithInk(current, numberOfDigits)
assert.strictEqual(actual, expected)

console.log('All tests passed.')
