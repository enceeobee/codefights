const assert = require('assert')

function longestWord (text) {
  'use strict'
  const regex = /([\w]+)/ig

  let longest = ''
  let result

  while (result = regex.exec(text)) { // eslint-disable-line
    if (result[0].length > longest.length) longest = result[0]
  }

  return longest
}

let text
let actual
let expected

text = 'Ready, steady, go!'
expected = 'steady'
actual = longestWord(text)
assert.strictEqual(actual, expected)

console.log('All tests passed.')
