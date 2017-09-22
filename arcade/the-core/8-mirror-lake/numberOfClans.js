const assert = require('assert')

function numberOfClans (divisors, k) {
  const clans = {}
  let key
  for (let i = 1; i <= k; i += 1) {
    key = divisors.filter(val => i % val === 0).join('')
    if (!clans[key]) clans[key] = []
    clans[key].push(i)
  }
  return Object.keys(clans).length
}

const test = (div, k, ex) => assert.equal(numberOfClans(div, k), ex)

test([2, 3], 6, 4)
test([2, 3, 4], 6, 5)
test([1, 3], 10, 2)
test([6, 2, 2, 8, 9, 2, 2, 2, 2], 10, 5)

console.log('All tests passed')
