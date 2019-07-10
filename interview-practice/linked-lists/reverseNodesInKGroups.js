const assert = require('assert')

const ListNode = require('./ListNode')
const create = require('./create')

function reverseNodesInKGroups (l, k) {
  if (!l) return []
  if (k <= 1) return l

  let reversed = null
  let lastReversedNode = null
  let group = null
  let lastGroupNode = null
  let remainingInserts = k
  let node

  while (l) {
    node = new ListNode(l.value)

    if (remainingInserts === 0) {
      /**
       * Set group at end of reversed
       *  - lastRevNode.next = group
       * Reset remainingInserts
       * Set lastRevNode = lastGroupNode
       */
      if (reversed) {
        lastReversedNode.next = group
      } else {
        reversed = group
      }

      group = null
      remainingInserts = k
      lastReversedNode = lastGroupNode
    }

    if (!group) {
      group = node
      lastGroupNode = node

      if (!reversed) lastReversedNode = lastGroupNode

      // This is to handle stragglers
      lastReversedNode.next = l
    } else {
      node.next = group // [2].next = [1]
      group = node // group = [2] -> [1]
    }

    remainingInserts--
    l = l.next
  }

  if (remainingInserts === 0) {
    lastReversedNode.next = group
  }

  return reversed
}

// Barf - this feels like cheating
// function reverseNodesInKGroups (l, k) {
//   const reversed = []
//   let group = []

//   while (l) {
//     group.unshift(l.value)

//     if (group.length >= k) {
//       reversed.push(...group)
//       group = []
//     }

//     l = l.next
//   }

//   if (group.length < k) {
//     group.reverse()
//   }

//   reversed.push(...group)

//   return reversed
// }

const makeTest = (l, k, x) => ({
  l: create(l),
  k,
  x: create(x)
})
const tests = [
  makeTest([1, 2, 3, 4, 5], 2, [2, 1, 4, 3, 5]),
  makeTest([1, 2, 3, 4, 5], 1, [1, 2, 3, 4, 5]),
  makeTest([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 3, [3, 2, 1, 6, 5, 4, 9, 8, 7, 10, 11]),
  makeTest([239], 1, [239]),
  makeTest([1, 2, 3, 4], 2, [2, 1, 4, 3]),
  makeTest([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 3, [3, 2, 1, 6, 5, 4, 9, 8, 7, 12, 11, 10]),
  makeTest([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 4, [4, 3, 2, 1, 8, 7, 6, 5, 12, 11, 10, 9]),
  makeTest([1000000000, -849483855, -1000000000, 376365554, -847904832], 4, [376365554, -1000000000, -849483855, 1000000000, -847904832]),
  makeTest([376365554, -340557143, -849483855, 810952169, -847904832], 4, [810952169, -849483855, -340557143, 376365554, -847904832]),
  makeTest([810952169, -849483855, -340557143, 376365554, -847904832], 2, [-849483855, 810952169, 376365554, -340557143, -847904832]),
  makeTest([-503549928, -526666356, 262916773, -508129645, 992040586, 867794712, 24042453, -540165420, -417669299, 766910780], 2, [-526666356, -503549928, -508129645, 262916773, 867794712, 992040586, -540165420, 24042453, 766910780, -417669299]),
  makeTest([-526666356, -503549928, -508129645, 262916773, 867794712, 992040586, -540165420, 24042453, 766910780, -417669299], 8, [24042453, -540165420, 992040586, 867794712, 262916773, -508129645, -503549928, -526666356, 766910780, -417669299])
]

tests.forEach(t => assert.deepStrictEqual(reverseNodesInKGroups(t.l, t.k), t.x))

console.log('Solved reverseNodesInKGroups')
