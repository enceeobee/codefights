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
   * sExtras = ['B']
   *
   * sMap needs C, doesn't need B
   * TURN - swap C with B
   *
   * sMap = { A: 2, C: 1 }
   * tMap = { A: 2, C: 1 }
   *
   * return 1
   */
  let turns = 0
  const isAnagram = (a, b) => (
    Object.keys(a).every(key => b[key] === a[key])
  )

  const sNeeds = []
  const sExtras = []
  const sMap = s.split('').reduce((acc, val) => {
    if (!t.includes(val)) sExtras.push(val)
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

  // console.log('sMap', sMap)
  // console.log('tmap', tMap)
  // console.log('needs', sNeeds, 'extras', sExtras)

  let turnsTaken
  let swapMap
  let swapLetter
  while (!isAnagram(sMap, tMap)) {
    swapMap = {}

    // Take turns
    turnsTaken = 1

    // First, convert sExtras to sNeeds
    if (sNeeds.length > 0) {
      sMap[sNeeds[0]] = tMap[sNeeds[0]]
      turnsTaken = tMap[sNeeds[0]]

      // TODO - Should we only delete this if sMap[sExtras[0]] is 1? I can't think right now
      delete sMap[sExtras[0]]

      sNeeds.shift()
      sExtras.shift()

      // console.log('needs', sNeeds, 'extras', sExtras)
      // console.log('smap', sMap)

    }

    // Second, adjust the number of common letters (ex. sMap { A: 4, B: 1 }, tmap { A: 3, B: 2 })
    Object.keys(tMap).forEach((key) => {
      // console.log('key', key)
      if (tMap[key] !== sMap[key]) {
        // Swap letters
        // swapMap[key] = Math.abs(tMap[key] - sMap[key])
        if (!swapLetter) {
          swapLetter = key
          return
        }

        // console.log('swapLetter', swapLetter)

        // if (tMap[key] > sMap[key]) {
        //   tMap[key] -= 1
        //   tMap[swapLetter] += 1
        // } else {
        //   tMap[key] += 1
        //   tMap[swapLetter] -= 1
        // }
        if (sMap[key] > tMap[key]) {
          sMap[key] -= 1
          sMap[swapLetter] += 1
        } else {
          sMap[key] += 1
          sMap[swapLetter] -= 1
        }
      }

      console.log('smap', sMap, 'tmap', tMap)
    })

    turns += turnsTaken

    // console.log('smap', sMap, 'tmap', tMap)

    // TODO - Obviously remove this
    break
  }

  return turns
}

const test = (s, t, ex) => assert.equal(createAnagram(s, t), ex)

// test('AABAA', 'BBAAA', 1)
// test('BBAAA', 'AABAA', 1)
test('OVGHK', 'RPGUC', 4)
// test('OVGHHK', 'RPGUCF', 5)// this could be wrong, the point is it'll take two turns to get both H's
// test('AAB', 'AAC', 1)
// test('NATE', 'ANTE', 0)
// test('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB', 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC', 1)

console.log('All tests passed.')
