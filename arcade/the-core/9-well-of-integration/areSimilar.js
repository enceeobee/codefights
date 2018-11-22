const assert = require('assert')

function areSimilar (a, b) {
  const aCopy = [].concat(a)
  let aTemp
  let swapIndex
  let startIndex

  a.some((n, i) => {
    if (n !== b[i]) {
      startIndex = i
      swapIndex = a.indexOf(b[i], startIndex)
      while (swapIndex !== -1) {
        if (n === b[swapIndex] && b[i] === a[swapIndex]) {
          aTemp = a[i]
          aCopy[i] = a[swapIndex]
          aCopy[swapIndex] = aTemp
          return true
        }
        swapIndex = a.indexOf(b[i], startIndex += 1)
      }
    }
    return false
  })

  return aCopy.every((n, i) => n === b[i])
}

const test = (a, b, x) => assert.strictEqual(areSimilar(a, b), x)

test([1, 2, 3], [1, 2, 3], true)
test([1, 2, 3], [2, 1, 3], true)
test([1, 2, 2], [2, 1, 1], false)
test([1, 1, 4], [1, 2, 3], false)
test([1, 2, 3], [1, 10, 2], false)
test([2, 3, 1], [1, 3, 2], true)
test([2, 3, 9], [10, 3, 2], false)
test([4, 6, 3], [3, 4, 6], false)
test([832, 998, 148, 570, 533, 561, 894, 147, 455, 279], [832, 998, 148, 570, 533, 561, 455, 147, 894, 279], true)
test([832, 998, 148, 570, 533, 561, 894, 147, 455, 279], [832, 570, 148, 998, 533, 561, 455, 147, 894, 279], false)
test([1, 2, 2, 3], [3, 2, 2, 1], true)
test([1, 2], [2, 3], false)

// Some hidden test is failing
test([1, 1, 1, 2, 1], [1, 1, 2, 1, 1], true) // adding `i` to `indexOf` fixed this one
test([1, 2, 3], [3, 2, 1], true)
test([1, 2, 3], [1, 2, 4], false)
test([1], [1], true)
test([1], [2], false)
// Keep going until we find a swappable value
test([1, 1, 1, 1, 2], [2, 1, 1, 1, 1], true) // changing `bIndex` to `swapIndex` fixed this one
test([1, 3, 1, 3], [3, 1, 1, 3], true)
// finds that value, but it's not swappable..what then?
test([1, 3, 2, 1, 1], [2, 1, 3, 1, 1], false)
test([1, 3, 2, 1, 1], [2, 1, 3, 1, 1], false)
test([2, 3, 1, 1, 4], [1, 3, 1, 2, 4], true)

console.log('All tests passed')
