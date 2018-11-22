const assert = require('assert')

function newNumeralSystem (number) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const numberIndex = alphabet.indexOf(number)
  const stopIndex = numberIndex % 2 === 0 ? (numberIndex / 2 + 1) : Math.ceil(numberIndex / 2)
  const pairs = []

  for (let i = 0; i < stopIndex; i += 1) {
    pairs.push(`${alphabet[i]} + ${alphabet[numberIndex - i]}`)
  }

  return pairs
}

const test = (n, x) => assert.strictDeepEqual(newNumeralSystem(n), x)

test('G', ['A + G',
  'B + F',
  'C + E',
  'D + D'])
test('A', ['A + A'])
test('D', ['A + D',
  'B + C'])
test('E', ['A + E',
  'B + D',
  'C + C'])
test('F', ['A + F',
  'B + E',
  'C + D'])
test('I', ['A + I',
  'B + H',
  'C + G',
  'D + F',
  'E + E'])
test('K', ['A + K',
  'B + J',
  'C + I',
  'D + H',
  'E + G',
  'F + F'])
test('L', ['A + L',
  'B + K',
  'C + J',
  'D + I',
  'E + H',
  'F + G'])
test('O', ['A + O',
  'B + N',
  'C + M',
  'D + L',
  'E + K',
  'F + J',
  'G + I',
  'H + H'])
test('P', ['A + P',
  'B + O',
  'C + N',
  'D + M',
  'E + L',
  'F + K',
  'G + J',
  'H + I'])
test('S', ['A + S',
  'B + R',
  'C + Q',
  'D + P',
  'E + O',
  'F + N',
  'G + M',
  'H + L',
  'I + K',
  'J + J'])
test('T', ['A + T',
  'B + S',
  'C + R',
  'D + Q',
  'E + P',
  'F + O',
  'G + N',
  'H + M',
  'I + L',
  'J + K'])
test('W', ['A + W',
  'B + V',
  'C + U',
  'D + T',
  'E + S',
  'F + R',
  'G + Q',
  'H + P',
  'I + O',
  'J + N',
  'K + M',
  'L + L'])

console.log('All tests passed.')
