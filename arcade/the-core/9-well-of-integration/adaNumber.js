const assert = require('assert')

function adaNumber (l) {
  const line = l.replace(/_/g, '')
  const startChars = {
    11: 'b',
    12: 'c',
    13: 'd',
    14: 'e',
    15: 'f',
    16: 'g'
  }
  const matchesNoBase = /^[\d]+$/.test(line)
  const matchesWithBase = line.match(/^([\d]+)#[0-9a-f]+#$/i)
  if (!(matchesNoBase || matchesWithBase)) return false

  const base = (matchesWithBase) ? Number(matchesWithBase[1]) : 10
  if (base > 16 || base < 2) return false

  const number = (line.match(/#([a-f0-9]+)#/i) || [])[1] || line
  if (base < 11 && number.match(/[^\d]/)) return false
  if (base > 10 && new RegExp(`[${startChars[base]}-z]`, 'i').test(number)) return false

  return !isNaN(Number.parseInt(number, Number(base)))
}

const test = (l, x) => assert.equal(adaNumber(l), x)

test('123_456_789', true)
test('16#123abc#', true)
test('16#123abc#ff', false)
test('10#123abc#', false)
test('10#10#123ABC#', false)
test('10#0#', true)
test('10##', false)
test('16#1234567890ABCDEFabcdef#', true)
test('1600#', false)
test('7#???#', false)
test('4#4#', false)
test('3454235ab534', false)
test('1#0#', false)
test('17#ac#', false)
test('2#10110#', true)
test('2#10110', false)
test('#2#10110', false)
test('#2#10110#', false)
test('9##', false)
test('___', false)
test('_4__', true)
test('11#123f#', false)

console.log('All tests passed')
