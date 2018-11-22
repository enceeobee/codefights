const assert = require('assert')

/**
   * letter 0: just use the same value from mes; set sum to alpha[letter] == alpha[t] == 19
   * letter 1: we know the result of sum % 26, so we need to do something like:
   *  - e.g. (sum + x) % 26 = alpha.indexOf(thisLetter) == 19 + x % 26 = 0; solve for x
   *  - x = 7; letter = alpha[7] = h; sum += 7 = 26
   * letter 2: repeat. (sum + x) % 26 = alpha.indexOf('i') = 26 + x % 26 = 8
   *  - x = 8; letter = alpha[8] = i; sum += 8 = 34
   * letter 3
   *  - val = 'a'; sum = 34
   *  - (sum + x) % 26 = alpha.indexOf(val) == (34 + x) % 26 = 0
   *  - x = 18; newLetter = alpha[18] = s
   *  - sum += 18 = 52
  */
function cipher26 (message) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'
  let sum = 0
  let x = 0

  return message
    .split('')
    .reduce((acc, val) => {
      x = 0
      while ((sum + x) % 26 !== alphabet.indexOf(val)) {
        x += 1
      }

      sum += x
      return acc + alphabet[x]
    }, '')
}

const test = (m, x) => assert.strictEqual(cipher26(m), x)

test('taiaiaertkixquxjnfxxdh', 'thisisencryptedmessage')
test('ibttlprimfymqlpgeftwu', 'itsasecrettoeverybody')
test('ftnexvoky', 'fourtytwo')
test('taevzhzmashvjw', 'thereisnospoon')
test('abdgkpvcktdoanbqgxpicxtqon', 'abcdefghijklmnopqrstuvwxyz')
test('z', 'z')

console.log('All tests passed.')
