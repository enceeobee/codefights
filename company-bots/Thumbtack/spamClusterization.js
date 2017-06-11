const assert = require('assert');

// To be fair, I was interrupted, then went out for the evening!
function spamClusterization(requests, IDs, threshold) {
  'use strict';
  const jaccards = {};

  let returnIds = [];

  // Get word sets
  const words = requests.map(request => [...new Set(request.match(/(\w+)/g).map(word => word.toLowerCase()))]);
  const getJaccard = (set1, set2) => {
    const union = [... new Set(set1.concat(set2))].length;
    const intersection = set1.length + set2.length - union;

    // console.log('intersection', intersection, 'union', union);

    return (union === 0) ? 0 : intersection / union;
  };

  // Calculate Jaccard index
  let theseJacs;
  for (let i = 0; i < requests.length; i += 1) {
    theseJacs = [];
    for (let j = i + 1; j < requests.length; j += 1) {
      if (getJaccard(words[i], words[j]) >= threshold) {
        // if (!theseJacs.includes(IDs[i])) theseJacs.push(IDs[i]);
        // theseJacs.push(IDs[j]);
        jaccards[IDs[i]] = (jaccards[IDs[i]] || []).concat(IDs[j]);
      }
    }
    // returnIds = returnIds.concat([theseJacs.sort((a, b) => a - b)]);
  }

  console.dir(jaccards);

  Object.keys(jaccards).forEach((jac, i) => {
    // returnIds.push([jac, jaccards[jac]].concat(jaccards[jac] || null));
    returnIds.push([Number(jac), jaccards[jac]]);
  });

  return returnIds;
}

let requests;
let IDs;
let threshold;
let actual;
let expected;

requests = ["I need a new window.",
            "I really, really want to replace my window!",
            "Replace my window.",
            "I want a new window.",
            "I want a new carpet, I want a new carpet, I want a new carpet.",
            "Replace my carpet"];
IDs = [374, 2845, 83, 1848, 1837, 1500];
threshold = 0.5;
expected = [[83, 1500], [374, 1837, 1848]];
actual = spamClusterization(requests, IDs, threshold);

assert.equal(actual, expected);

console.log('All tests passed.');