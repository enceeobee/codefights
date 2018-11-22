const assert = require('assert')

function goodSet (someSet) {
  const setMap = someSet.reduce((acc, val) => {
    acc[val] = 1
    return acc
  }, {})

  for (let i = 0; i < someSet.length - 1; i += 1) {
    if (someSet[i] === 0) continue
    for (let j = i + 1; j < someSet.length; j += 1) {
      if (setMap[someSet[i] + someSet[j]]) return false
    }
  }
  return true
}

function test (someSet, expected) {
  assert.strictEqual(goodSet(someSet), expected)
}

test([1, 2, 3], false)
test([1, 2, 4], true)
test([0, 3, 6], true)

console.log('All tests passed.')
