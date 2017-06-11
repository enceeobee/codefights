const assert = require('assert');

function secondRightmostZeroBit(n) {
  return Math.pow(2, n
    .toString(2)
    .split('')
    .reverse()
    .reduce((acc, val, i) => {
      if (val === '0') acc.numZ += 1;
      if (acc.numZ === 2 && !acc.index) acc.index = i;
      return acc;
    }, { index: 0, numZ: 0 }).index);
}

let actual;
let expected;
let n;

n = 37; // 100101
expected = 8;
actual = secondRightmostZeroBit(n);
assert.equal(expected, actual);

n = 38; // 100110
expected = 8;
actual = secondRightmostZeroBit(n);
assert.equal(expected, actual);

n = 4; // 100
expected = 2;
actual = secondRightmostZeroBit(n);
assert.equal(expected, actual);

n = 83748;
expected = 2;
actual = secondRightmostZeroBit(n);
assert.equal(expected, actual);

console.log('All tests passed.');
