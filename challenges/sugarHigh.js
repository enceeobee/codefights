const assert = require('assert')

function sugarHigh (candies, threshold) {
  /*
    Here's an interesting idea:

    "I recommend sorting by sugar count first (low to high)
    and break ties with their original positions (lower indices first)."
    */
  const candyObjects = candies.map((c, i) => ({
    grams: c,
    index: i
  }))
    .sort((a, b) => a.grams - b.grams)

  // console.log('candyObjects', candyObjects)

  const possibleStashes = generateStashes(candyObjects, threshold)

  // console.log('possibleStashes', possibleStashes)

  if (possibleStashes.length === 0) return []
  // if (possibleStashes.length === 1) return possibleStashes[0]
  if (possibleStashes.length === 1) return possibleStashes[0].sort((a, b) => a - b)

  const mostCandies = possibleStashes.reduce((acc, val) => Math.max(acc, val.length), 0)
  const stashesWithMostCandy = possibleStashes.filter(stash => stash.length === mostCandies)

  // if (stashesWithMostCandy.length === 1) return stashesWithMostCandy[0]
  if (stashesWithMostCandy.length === 1) return stashesWithMostCandy[0].sort((a, b) => a - b)

  const leastGrams = stashesWithMostCandy.reduce((acc, stash) => {
    // const stashTotal = stash.reduce((acc2, val) => (acc2 + candyObjects[val].grams), 0)
    const stashTotal = stash.reduce((acc2, val) => (acc2 + candies[val]), 0)
    return Math.min(stashTotal, acc)
  }, Infinity)

  const stashesWithLeastGrams = stashesWithMostCandy.filter((stash) => {
    // const stashTotal = stash.reduce((acc2, val) => (acc2 + candyObjects[val].grams), 0)
    const stashTotal = stash.reduce((acc2, val) => (acc2 + candies[val]), 0)
    return stashTotal === leastGrams
  })

  // console.log('stashesWithLeastGrams', stashesWithLeastGrams)

  if (stashesWithLeastGrams.length === 1) return stashesWithLeastGrams[0].sort((a, b) => a - b)

  return stashesWithLeastGrams[0]
  // return stashesWithLeastGrams.sort()[0]
  // .sort((a, b) => a - b)
}

/*
  Recursive function to append the next candy to the stash, if doable.

  Start with empty stash, [], and pass an index, 0. candies[0] is doable, now stash is [0]
  Now we have to try [0] with every other candy ([0,1], [0,2], [0,3] ...), so loop through the rest
  of the candies and call recurse([0], i, thresh).

  Now we have [0,1], we need to try [0,1,2], [0,1,3], [0,1,n]. So loop through candies after index 1
  and call recurse([0,1], i, thresh)

*/

function generateStashes (candyObjects, threshold) {
  let stashes = []

  // This function should return [[0], [0,1], [0,2]] when candyIndex is 0
  function getStashes (stash, candyIndex, remainingThreshold) {
    if (candyIndex >= candyObjects.length) return []

    // console.log('stash', stash, 'candyIndex', candyIndex, 'remainingThreshold', remainingThreshold)

    // Create [0]
    const candy = candyObjects[candyIndex]
    if (candy.grams <= remainingThreshold) {
      const tempStash = stash.concat([candy.index])
      // stashes.push(tempStash)
      stashes = stashes.concat([tempStash])
      for (let i = candyIndex + 1; i < candyObjects.length; i++) {
        getStashes(tempStash, i, remainingThreshold - candy.grams)
      }
    }

    return []
  }

  for (let i = 0; i < candyObjects.length; i++) {
    stashes.push(getStashes([], i, threshold))
  }

  return stashes
}

// First one should be [0], [1], [2], [0,1], [0,2], [1, 2]
assert.deepStrictEqual(sugarHigh([1, 1, 1], 2), [0, 1])
assert.deepStrictEqual(sugarHigh([33, 20, 12, 19, 29], 33), [2, 3])
assert.deepStrictEqual(sugarHigh([8, 68, 32, 28, 90, 19, 25, 44, 83, 49], 250), [0, 2, 3, 5, 6, 7, 9])

console.time('11')
assert.deepStrictEqual(sugarHigh([72, 11, 96, 88, 77, 49, 23, 76, 26, 71, 6, 84], 353), [0, 1, 5, 6, 7, 8, 9, 10])
console.timeEnd('11')
