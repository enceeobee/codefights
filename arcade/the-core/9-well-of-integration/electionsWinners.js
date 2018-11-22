const assert = require('assert')

function electionsWinners (votes, k) {
  const leader = Math.max(...votes)
  const numToWin = leader + 1
  const winners = votes.filter(vote => vote + k >= numToWin || vote === leader)
  if (k === 0 && winners.length > 1 && winners.every(w => w === winners[0])) return 0
  return winners.length
}

const test = (v, k, x) => assert.strictEqual(electionsWinners(v, k), x)

test([2, 3, 5, 2], 3, 2)
test([1, 3, 3, 1, 1], 0, 0)
test([5, 1, 3, 4, 1], 0, 1)
test([1, 1, 1, 1], 1, 4)
test([3, 1, 1, 3, 1], 2, 2)

console.log('All tests passed')
