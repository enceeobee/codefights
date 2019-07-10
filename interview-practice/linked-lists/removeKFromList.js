const assert = require('assert')

const create = require('./create')

function removeKFromList (l, k) {
  if (!l) return []
  if (!l.next) return (l.value === k) ? null : l
  if (l.value !== k) {
    l.next = removeKFromList(l.next, k)
  } else {
    l = removeKFromList(l.next, k)
  }

  return l
}

const makeTest = (l, k, x) => ({
  l: create(l),
  k,
  x: create(x)
})
const tests = [
  makeTest([3, 1, 2, 3, 4, 5], 3, [1, 2, 4, 5]),
  makeTest([1, 2, 3, 4, 5, 6, 7], 10, [1, 2, 3, 4, 5, 6, 7]),
  makeTest([1000, 1000], 1000, []),
  // makeTest([], -1000, []),
  makeTest([123, 456, 789, 0], 0, [123, 456, 789])
]

tests.forEach(({ l, k, x }) => assert.deepStrictEqual(removeKFromList(l, k), x))

console.log('Solved removeKFromList')
