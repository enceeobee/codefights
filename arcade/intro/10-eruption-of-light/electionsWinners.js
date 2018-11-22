const assert = require('assert')

function electionsWinners (votes, k) {
  'use strict'
  const occurrences = {}
  const highVote = votes.reduce((acc, val) => {
    occurrences[val] = (occurrences[val] || 0) + 1
    return Math.max(acc, val)
  }, 0)

  if (k !== 0) return votes.reduce((acc, val) => (val + k > highVote) ? acc + 1 : acc, 0)

  return (occurrences[highVote] === 1) ? 1 : 0
}

let k = 3
let votes = [2, 3, 5, 2]
let expected = 2
let actual = electionsWinners(votes, k)
assert.strictEqual(actual, expected)

k = 0
votes = [1, 3, 3, 1, 1]
expected = 0
actual = electionsWinners(votes, k)
assert.strictEqual(actual, expected)

k = 0
votes = [5, 1, 3, 4, 1]
expected = 1
actual = electionsWinners(votes, k)
assert.strictEqual(actual, expected)

k = 1
votes = [1, 1, 1, 1]
expected = 4
actual = electionsWinners(votes, k)
assert.strictEqual(actual, expected)

k = 0
votes = [1, 1, 1, 1]
expected = 0
actual = electionsWinners(votes, k)
assert.strictEqual(actual, expected)

k = 2
votes = [3, 1, 1, 3, 1]
expected = 2
actual = electionsWinners(votes, k)
assert.strictEqual(actual, expected)

console.log('All tests passed.')
