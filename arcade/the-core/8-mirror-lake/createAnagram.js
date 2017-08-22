const assert = require('assert')

function createAnagram(s, t) {
  /**
   * Make a map for each letter of both s and t
   *
   * Figure out if t has letters s does not.
   *
   * Take a turn to match each letter
   *
   * Subtract one from the higher values and add one to lower values
   *
   * If maps match, return n
   *
   * ex. 'AABAA', 'BBAAA', 1
   * sMap = { A: 4, B: 1 }
   * tMap = { A: 3, B: 2 }
   *
   *
   * ex. 'AAB', 'AAC', 1
   * sMap = { A: 2, B: 1 }
   * tMap = { A: 2, C: 1 }
   *
   * sNeeds = ['C']
   * sDontNeed = ['B']
   *
   * sMap needs C, doesn't need B
   * TURN - swap C with B
   *
   * sMap = { A: 2, C: 1 }
   * tMap = { A: 2, C: 1 }
   *
   * return 1
   */
  const isAnagram = (a, b) => (
    Object.keys(a).every(key => b[key] = a[key])
  )
  const sNeeds = []
  const sDontNeed = []
  const sMap = s.split('').reduce((acc, val) => {
    if (!t.includes(val)) sDontNeed.push(val)
    if (!acc[val]) acc[val] = 0
    acc[val] += 1
    return acc
  }, {})
  const tMap = t.split('').reduce((acc, val) => {
    if (!s.includes(val)) sNeeds.push(val)
    if (!acc[val]) acc[val] = 0
    acc[val] += 1
    return acc
  }, {})

  console.log(sMap)
  console.log(tMap)
  console.log(sNeeds, sDontNeed)
}

const test = (s, t, ex) => assert.equal(createAnagram(s, t), ex)

test('AABAA', 'BBAAA', 1)
test('OVGHK', 'RPGUC', 4)
test('AAB', 'AAC', 1)
test('NATE', 'ANTE', 0)
test('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB', 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC', 1)

console.log('All tests passed.')
