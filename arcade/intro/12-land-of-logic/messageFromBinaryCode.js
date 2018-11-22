const assert = require('assert')

function messageFromBinaryCode (code) {
  'use strict'
  let decoded = ''

  const fromBinary = n => (
    n.split('').reverse().reduce((acc, val, i) => (val === '1') ? acc + Math.pow(2, i) : acc, 0)
  )

  for (let i = 0; i < code.length; i += 8) {
    decoded += String.fromCharCode(fromBinary(code.slice(i, i + 8)))
  }

  return decoded
}

let code
let actual
let expected

code = '010010000110010101101100011011000110111100100001'
expected = 'Hello!'
actual = messageFromBinaryCode(code)
assert.strictEqual(actual, expected)

console.log('All tests passed.')
