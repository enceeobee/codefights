let assert = require('assert');

function makeArrayConsecutive2(statues) {
  return statues
    .sort((a, b) => a - b)
    .reduce((acc, val, i, sorted) => acc + (sorted[i + 1] - val - 1 || 0), 0);
}

let statues;
let expected;
let actual;

statues = [6, 2, 3, 8];
expected = 3;
actual = makeArrayConsecutive2(statues);
assert.equal(actual, expected);

console.log('All tests passed.');
