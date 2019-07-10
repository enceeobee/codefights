const assert = require('assert')

const ListNode = require('./ListNode')
const create = require('./create')

function rearrangeLastN (l, n) {
  if (n < 1) return l

  let scout = l
  let trailer = l

  for (let i = 0; i < n; i++) {
    scout = scout.next
  }

  if (!scout) return l

  while (scout.next) {
    scout = scout.next
    trailer = trailer.next
  }

  let start
  let lastStartNode

  while (trailer.next) {
    if (!start) {
      start = new ListNode(trailer.next.value)
      lastStartNode = start
    } else {
      lastStartNode.next = new ListNode(trailer.next.value)
      lastStartNode = lastStartNode.next
    }

    trailer.next = trailer.next.next
  }

  lastStartNode.next = l

  return start
}

const makeTest = (l, n, x) => ({
  l: create(l),
  n,
  x: create(x)
})
const tests = [
  makeTest([1, 2, 3, 4, 5], 3, [3, 4, 5, 1, 2]),
  makeTest([1, 2, 3, 4, 5, 6, 7, 8], 3, [6, 7, 8, 1, 2, 3, 4, 5]),
  makeTest([1, 2, 3, 4, 5, 6, 7], 1, [7, 1, 2, 3, 4, 5, 6]),
  makeTest([1000, -1000], 0, [1000, -1000]),
  makeTest([1000, -1000], 1, [-1000, 1000]),
  makeTest([], 0, []),
  makeTest([123, 456, 789, 0], 4, [123, 456, 789, 0])
]
tests.forEach(t => assert.deepStrictEqual(rearrangeLastN(t.l, t.n), t.x))
