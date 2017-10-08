const assert = require('assert')

function decipher (cipher) {
  let code = ''
  return cipher
    .split('')
    .reduce((acc, val) => {
      code += val
      if (Number(code) > 96 && Number(code) < 123) {
        acc += String.fromCharCode(Number(code))
        code = ''
      }
      return acc
    }, '')
}

const test = (c, x) => assert.equal(decipher(c), x)

test('10197115121', 'easy')
test('98', 'b')
test('122', 'z')

console.log('All tests passed.')
