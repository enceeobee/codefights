const assert = require('assert')

function houseOfCats (legs) {
  const getHumanSum = (numLegs, numCats, numHumans) => {
    if (numLegs < 4) return [(numLegs < 2) ? numHumans : numHumans + 1]
    return getHumanSum(numLegs - 4, numCats + 1, numHumans).concat(getHumanSum(numLegs - 2, numCats, numHumans + 1))
  }

  return getHumanSum(legs, 0, 0)
    .reduce((acc, val) => !acc.includes(val) ? acc.concat(val) : acc, [])
    .sort((a, b) => a - b)
}

const test = (legs, ex) => assert.deepEqual(houseOfCats(legs), ex)

test(6, [1, 3])
test(2, [1])
test(8, [0, 2, 4])
test(4, [0, 2])
test(44, [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22])

console.log('All tests passed.')
