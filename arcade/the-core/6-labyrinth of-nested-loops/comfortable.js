 const assert = require('assert');

function comfortableNumbers(l, r) {
  'use strict';
  const digitSum = digit => (
    String(digit)
      .split('')
      .reduce((sum, val) => sum + Number(val), 0)
  );
  console.log(l);
  const rangeStart = l - digitSum(l);
  const rangeEnd = r + digitSum(r);

  console.log(rangeStart, rangeEnd);

  const comfyNumbers = [];
}

let expected;
let actual;
let l;
let r;

l = 10;
r = 12;
expected = 2;
actual = comfortableNumbers(l, r);
assert.equal(actual, expected);

l = 1;
r = 9;
expected = 20;
actual = comfortableNumbers(l, r);
assert.equal(actual, expected);

console.log('All tests passed.');