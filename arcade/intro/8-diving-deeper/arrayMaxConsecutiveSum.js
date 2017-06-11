const assert = require('assert');

function arrayMaxConsecutiveSum(a, k) {
  'use strict';

  let sum = 0;
  for (let i = 0; i < k; i += 1) {
    sum += a[i];
  }

  let highSum = sum;

  for (let i = 1; i <= a.length - k; i += 1) {
    sum = sum - a[i - 1] + a[i - 1 + k];
    highSum = Math.max(highSum, sum);
  }

  return highSum;
}

let a;
let k;
let actual;
let expected;

const longass = [];
for (let z = 1; z < 1000000; z += 1) {
  longass.push(1);
}

console.time('arrayMaxConsecutiveSum');

let i;
// for (i = 0; i < 1000; i += 1) {

  // Reduce l to r
  // [7, 7, 7, 1, 1] => { '12': 14, '23': 8: '34': 2 }
  // [7, 14, 1, 1]
  // [7, 14, ]

  // Reduce r to l
  // [7, 7, 7, 1, 1]
  // [7, 7, 7, 8, 1]
  // [7, 7, 15, 8, 1]

  // a = [7, 7, 7, 1, 1, 8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
  //   , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 9, 9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
  // ];
  a = longass;
  k = 2100;
  expected = k;
  actual = arrayMaxConsecutiveSum(a, k);
  assert.equal(actual, expected);

  a = [7, 7, 7, 1, 1, 8, 1, 1];
  k = 3;
  expected = 21;
  actual = arrayMaxConsecutiveSum(a, k);
  assert.equal(actual, expected);

  a = [2, 3, 5, 1, 6];
  k = 2;
  expected = 8;
  actual = arrayMaxConsecutiveSum(a, k);
  assert.equal(actual, expected);

  a = [2, 4, 10, 1];
  k = 2;
  expected = 14;
  actual = arrayMaxConsecutiveSum(a, k);
  assert.equal(actual, expected);

  // a = [1, 3, 2, 4, 6, 3, 8, 2, 5, 9, 1, 5];
  a = [1, 3, 2, 4];
  k = 3;
  expected = 9;
  actual = arrayMaxConsecutiveSum(a, k);
  assert.equal(actual, expected);

  a = [3, 2, 1, 1];
  k = 1;
  expected = 3;
  actual = arrayMaxConsecutiveSum(a, k);
  assert.equal(actual, expected);
// }

  console.log('All tests passed.');

// 2-3.5 ms is our benchmark
console.timeEnd('arrayMaxConsecutiveSum');
