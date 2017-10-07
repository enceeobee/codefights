const assert = require('assert')

function reflectString (inputString) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'
  const mirror = alphabet.split('').reduce((acc, val, i) => {
    acc[val] = alphabet[alphabet.length - i - 1]
    return acc
  }, {})

  return inputString.split('').map(c => mirror[c]).join('')
}

const test = (i, x) => assert.equal(reflectString(i), x)

test('name', 'mznv')
test('abyz', 'zyba')

console.log('All tests passed.')
