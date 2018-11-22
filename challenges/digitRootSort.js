const assert = require('assert')

function digitRootSort (a) {
  const aItemsWithDigitRoot = a.map((item) => {
    return {
      value: item,
      digitRoot: String(item).split('').reduce((acc, val) => acc + Number(val), 0)
    }
  })

  aItemsWithDigitRoot.sort((a, b) => {
    if (a.digitRoot === b.digitRoot) return a.value - b.value
    return a.digitRoot - b.digitRoot
  })

  return aItemsWithDigitRoot.map(item => item.value)
}

const tests = [
  {
    a: [13, 20, 7, 4],
    x: [20, 4, 13, 7]
  },
  {
    a: [100, 22, 4, 11, 31, 103],
    x: [100, 11, 4, 22, 31, 103]
  }
]

tests.forEach(({ a, x }) => assert.strictDeepEqual(digitRootSort(a), x))
