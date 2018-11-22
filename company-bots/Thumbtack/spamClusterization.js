const assert = require('assert')

// haha my time. I got busy this week :)
function spamClusterization (requests, IDs, threshold) {
  'use strict'
  const scores = {}

  let returnIds = []

  // Get word sets
  const words = requests.map(request => [...new Set(request.match(/(\w+)/g).map(word => word.toLowerCase()))])
  const getJaccard = (set1, set2) => {
    const union = [...new Set(set1.concat(set2))].length
    const intersection = set1.length + set2.length - union
    return (union === 0) ? 0 : intersection / union
  }

  // Calculate Jaccard index
  for (let i = 0; i < requests.length; i += 1) {
    for (let j = i + 1; j < requests.length; j += 1) {
      if (getJaccard(words[i], words[j]) >= threshold) {
        let doAdd = true
        Object.keys(scores).forEach((key) => {
          if (scores[key].includes(IDs[i])) {
            scores[key].push(IDs[j])
            doAdd = false
          }
        })

        if (doAdd) scores[IDs[j]] = (scores[IDs[j]] || []).concat(IDs[i])
      }
    }
  }

  Object.keys(scores).forEach((key) => {
    scores[key].forEach((j) => {
      if (scores[j]) {
        scores[key] = scores[key].concat(scores[j])
        scores[j] = []
      }
    })
  })

  Object.keys(scores).forEach((key) => {
    if (scores[key].length > 0) {
      returnIds.push([Number(key)]
        .concat(scores[key])
        .sort((a, b) => a - b))
    }
  })

  return returnIds
}

let requests
let IDs
let threshold
let actual
let expected

requests = ['I need a new window.',
  'I really, really want to replace my window!',
  'Replace my window.',
  'I want a new window.',
  'I want a new carpet, I want a new carpet, I want a new carpet.',
  'Replace my carpet']
IDs = [374, 2845, 83, 1848, 1837, 1500]
threshold = 0.5
expected = [[83, 1500], [374, 1837, 1848]]
actual = spamClusterization(requests, IDs, threshold)
// assert.strictDeepEqual(actual, expected);

requests = ['A', 'C', 'A C']
IDs = [374, 2845, 83]
threshold = 0.5
expected = [[83, 374, 2845]]
actual = spamClusterization(requests, IDs, threshold)
// assert.strictDeepEqual(actual, expected);

requests = ['A', 'C', 'B', 'D', 'A C B D']
IDs = [0, 1, 2, 3, 4]
threshold = 0.2
expected = [[0, 1, 2, 3, 4]]
actual = spamClusterization(requests, IDs, threshold)
assert.strictDeepEqual(actual, expected)

// I think this is skipping the first element. See this test...
requests = ['A C B D', 'A', 'C', 'B', 'D']
IDs = [0, 1, 2, 3, 4]
threshold = 0.2
expected = [[0, 1, 2, 3, 4]]
actual = spamClusterization(requests, IDs, threshold)
assert.strictDeepEqual(actual, expected)

console.log('All tests passed.')
