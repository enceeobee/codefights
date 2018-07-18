const assert = require('assert')
// Ok, build a map of the sequence so far
// As we calculate the next number in the sequence, check the map
// If the value exists, and one of the indexes for that value is `s[i] = s[i + T]`, return T
function periodicSequence (s0, a, b, m) {
  const sequence = [s0]
  const sequenceMap = {
    [s0]: { 0: true }
  }

  let nextValue
  let repeatSequence
  for (let i = 1; i < 1000; i++) {
    nextValue = (a * sequence[i - 1] + b) % m

    if (!sequenceMap[nextValue]) {
      sequenceMap[nextValue] = {}
      repeatSequence = []
    } else {
      if (repeatSequence[0] === nextValue) {
        return repeatSequence.length
      }

      repeatSequence.push(nextValue)
    }

    sequenceMap[nextValue][i] = true
    sequence.push(nextValue)
  }

  return -1
}

const tests = [
  {
    s0: 11,
    a: 2,
    b: 6,
    m: 12,
    x: 2
  },
  {
    s0: 1,
    a: 2,
    b: 3,
    m: 5,
    x: 4
  }
]

tests.forEach(test => assert.equal(periodicSequence(test.s0, test.a, test.b, test.m), test.x))
