const assert = require('assert');

function palindromeRearranging(inputString) {
  const counts = inputString.split('').reduce((a, v) => {
    if (!a[v]) a[v] = 0;
    a[v] += 1;
    return a;
  }, {});

  return Object.keys(counts).filter(k => counts[k] % 2).length <= 1;
}

let inputString = 'aabb';
assert.equal(palindromeRearranging(inputString), true);

inputString = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaabc';
assert.equal(palindromeRearranging(inputString), false);

inputString = 'abbcabb';
assert.equal(palindromeRearranging(inputString), true);

inputString = 'racecar';
assert.equal(palindromeRearranging(inputString), true);

inputString = 'eracecare';
assert.equal(palindromeRearranging(inputString), true);
