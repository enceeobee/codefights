const assert = require('assert')

function adaNumber (line) {
  line = line.replace(/_/g, '')

  // base, which can only be a number between 2 and 16 in the first representation
  const base = Number((line.match(/^([0-9]+)#/i) || [])[1]) || 10

  if (base > 16 || base < 2) return false

  const number = (line.match(/#([a-z0-9]+)#/i) || [])[1] || line

  console.log('number', number)
  console.log('base', base)

  console.log('Number.parseInt(number, base)', Number.parseInt(number, base))

  return !isNaN(Number.parseInt(number, Number(base)))
}

const test = (l, x) => assert.equal(adaNumber(l), x)

// test('123_456_789', true)
// test('16#123abc#', true)
test('10#123abc#', false)
// test('10#10#123ABC#', false)
// test('10#0#', true)
// test('10##', false)
// test('16#1234567890ABCDEFabcdef#', true)
// test('1600#', false)
// test('7#???#', false)
// test('4#4#', false)
// test('3454235ab534', false)
// test('1#0#', false)
// test('17#ac#', false)
// test('2#10110#', true)
// test('2#10110', false)// not wrapped in #
// test('#2#10110', false)
// test('#2#10110#', false)
// test('9##', false)

console.log('All tests passed')
