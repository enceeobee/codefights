const assert = require('assert')

function constructArray (size) {
  const result = []
  let evenVal = 1
  let oddVal = size

  for (let i = 0; i < size; i++) {
    if (i % 2 !== 0) {
      result.push(oddVal)
      oddVal--
    } else {
      result.push(evenVal)
      evenVal++
    }
  }

  return result
}

let actual

const tests = [
  {
    size: 7,
    expected: [1, 7, 2, 6, 3, 5, 4]
  },
  {
    size: 2,
    expected: [1, 2]
  },
  {
    size: 1,
    expected: [1]
  }
]

tests.forEach(({ size, expected }) => {
  actual = constructArray(size)
  assert.strictDeepEqual(actual, expected)
})
