const assert = require('assert')

function integerToStringOfFixedWidth (number, width) {
  const sn = String(number)
  return (sn.length > width)
    ? sn.slice(sn.length - width)
    : '0'.repeat(width - sn.length) + sn
}

const test = (n, w, x) => assert.equal(integerToStringOfFixedWidth(n, w), x)

test(1234, 2, '34')
test(1234, 4, '1234')
test(1234, 5, '01234')
test(0, 1, '0')

console.log('All tests passed')
