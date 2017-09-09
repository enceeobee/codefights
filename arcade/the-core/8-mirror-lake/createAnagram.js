const assert = require('assert')

function createAnagram (s, t) {
  let turns = 0
  let swapLetter

  const isAnagram = (a, b) => (
    Object.keys(a).every(sLetter => b[sLetter] === a[sLetter])
  )

  const sMap = s.split('').reduce((acc, val) => {
    if (!acc[val]) acc[val] = 0
    acc[val] += 1
    return acc
  }, {})
  const tMap = t.split('').reduce((acc, tLetter) => {
    if (!acc[tLetter]) acc[tLetter] = 0
    acc[tLetter] += 1
    return acc
  }, {})

  while (!isAnagram(sMap, tMap)) {
    Object.keys(sMap).some((currentLetter) => {
      if (sMap[currentLetter] <= tMap[currentLetter]) return false

      swapLetter = ''
      Object.keys(tMap)
        .filter(letter => letter !== currentLetter)
        .some((letter, i, tKeys) => {
          const foundSwapLetter = (!sMap[letter] || tMap[letter] > sMap[letter])
          if (foundSwapLetter) swapLetter = letter
          return foundSwapLetter
        })

      if (!swapLetter) {
        return false
      }

      if (!sMap[swapLetter]) sMap[swapLetter] = 0
      sMap[swapLetter] += 1

      sMap[currentLetter] -= 1
      if (sMap[currentLetter] === 0) delete sMap[currentLetter]

      turns += 1
      return true
    })
  }

  return turns
}

const test = (s, t, ex) => assert.equal(createAnagram(s, t), ex)

test('AABAA', 'BBAAA', 1)
test('BBAAA', 'AABAA', 1)
test('BBBAA', 'AABAA', 2)
test('OVGHK', 'RPGUC', 4)
test('OVGHHK', 'RPGUCF', 5)
test('AAB', 'AAC', 1)
test('NATE', 'ANTE', 0)
test('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB', 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC', 1)
test('SEXXX', 'SAXXX', 1)
test('RACECAR', 'BASECAR', 2) // 'racecar' -> 'bacecar' -> 'basecar'
test('RACECARS', 'BASECARZ', 2) // racecars -> bacecars -> bazecars
test('DUMB', 'FUCK', 3)
test('ANT', 'XXX', 3)
test('ANT', 'SMF', 3)
test('ANT', 'SAF', 2)
test('OFF', 'UHF', 2)
test('NATE', 'BATE', 1)
test('NATE', 'NATB', 1)
test('XXFXX', 'FFXFF', 3)
test('ABBB', 'BBBA', 0)
test('ABCDEFG', 'ABCDEFJ', 1)
test('', '', 0)
test('WHAT THE SHIT', 'WHAT THE FUCK', 4)
test('RACECAR', 'RAPECAR', 1)
test('RACECAR', 'FFFFFFF', 7)
test('RACECAR', 'OFFFFFF', 7)
test('RACECAR', 'AFFFFFF', 6)
test('RACECAR', 'AFFFEFF', 5)
test('CORN', 'CORC', 1)
test('CORN', 'COCC', 2)
test('NORN', 'CORN', 1)
test('NORN', 'CORC', 2)
test('CORN', 'CRRC', 2) // CORN -> RORN -> RCRN -> RCRC
// should be CORN -> CRRN -> CRRC
// Don't swap C with R because we still need another C

console.log('All tests passed.')
