const assert = require('assert')

function minimalNumberOfCoins (coins, price) {
  let n = 0
  let priceLeft = price
  let i = coins.length - 1

  while (priceLeft > 0) {
    while (priceLeft < coins[i]) --i
    priceLeft -= coins[i]
    n += 1
  }

  return n
}

const test = (c, p, x) => assert.strictEqual(minimalNumberOfCoins(c, p), x)

test([1, 2, 10], 28, 6)
test([1, 5, 10, 100], 239, 10)
test([1], 28, 28)
test([1], 2, 2)
test([2], 2, 1)
test([1, 3], 28, 10)
test([1, 2], 28, 14)
test([1, 2, 12], 28, 4)
test([2, 4], 17, 5)
test([2], 3, 2)
test([1, 10, 100], 14, 5)

console.log('All tests passed')
