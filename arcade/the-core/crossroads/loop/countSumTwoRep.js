const assert = require('assert');

function countSumOfTwoRepresentations2(n, l, r) {
  'use strict';
  let numWays = 0;
  let a = Math.max(n - r, l);
  let b = n - a;
  while (l <= a && a <= b && b <= r) {
    numWays += 1;
    a += 1;
    b -= 1;
  }
  return numWays;
}

let n;
let l;
let r;
let actual;
let expected;

n = 6;
l = 2;
r = 4;
expected = 2;
actual = countSumOfTwoRepresentations2(n, l, r);
assert.equal(actual, expected);

n = -6;
l = -4;
r = -2;
expected = 2;
actual = countSumOfTwoRepresentations2(n, l, r);
assert.equal(actual, expected);

n = 6;
l = 6;
r = 6;
expected = 0;
actual = countSumOfTwoRepresentations2(n, l, r);
assert.equal(actual, expected);


n = 16;
l = 6;
r = 10;
expected = 3;
actual = countSumOfTwoRepresentations2(n, l, r);
assert.equal(actual, expected);

n = 6;
l = 2;
r = 5;
expected = 2;
actual = countSumOfTwoRepresentations2(n, l, r);
assert.equal(actual, expected);

console.log('All tests passed.');