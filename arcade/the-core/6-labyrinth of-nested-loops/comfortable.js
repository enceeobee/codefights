 const assert = require('assert');

function comfortableNumbers(l, r) {
  'use strict';

  const digitSum = digit => (
    String(digit)
      .split('')
      .reduce((sum, val) => sum + Number(val), 0)
  );

  const comfyNumbers = {};
  let pairs = 0;
  let sum;

  for (let i = l; i <= r; i += 1) {
    comfyNumbers[i] = [];
    for (let j = i - digitSum(i); j <= i + digitSum(i); j += 1) {
      if (j !== i) comfyNumbers[i].push(j);
    }
  }

  for (let i = l; i < r; i += 1) {
    for (let j = i + 1; j <= r; j += 1) {
      if (comfyNumbers[i].includes(j) && comfyNumbers[j].includes(i)) pairs += 1;
    }
  }

  return pairs;
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

l = 13;
r = 13;
expected = 0;
actual = comfortableNumbers(l, r);
assert.equal(actual, expected);

l = 12;
r = 108;
expected = 707;
actual = comfortableNumbers(l, r);
assert.equal(actual, expected);

l = 239;
r = 777;
expected = 6166;
actual = comfortableNumbers(l, r);
assert.equal(actual, expected);

l = 1;
r = 1000;
expected = 11435;
actual = comfortableNumbers(l, r);
assert.equal(actual, expected);

console.log('All tests passed.');