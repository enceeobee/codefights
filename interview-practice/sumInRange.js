const assert = require('assert')

// 4 % 3 = 1
// 10 % 2 = 0
// 10 % 4 = 2
const mod = (x, y) => {
  const absY = Math.abs(y)
  let remainder

  if (x / y === Math.round(x / y)) return 0

  remainder = Math.abs(x) - absY

  while (remainder - absY > 0) {
    remainder -= absY
  }

  return (x > 0) ? remainder : -remainder
}

assert.strictEqual(mod(10, 4), 2)
assert.strictEqual(mod(-10, 4), -2)
assert.strictEqual(mod(10, -4), 2)
console.log('0', mod(0, 1000000007))
console.log('-1000', mod(-1000, 1000000007))
console.log('-2000', mod(-2000, 1000000007))
console.log('10', mod(10, 1000000007))

// TODO.
// Also, this will probably be slow as balls
function sumInRange (nums, queries) {
  'use strict'

  const sum = queries
    .map((q) => {
      return nums
        .slice(q[0], q[1] + 1)
        .reduce((acc, val) => acc + val)
    })
    .reduce((acc2, val2) => acc2 + val2)

  console.log('sum', sum)

  // return sum % (Math.pow(10, 9) + 7);
  // return sum % 1000000007;
  return mod(sum, 1000000007)
  // return (sum % 1000000000) + 7;
}

// function sumInRange(nums, queries) {
//   'use strict';
//   const sums = {};

//   // 0,2
//   for (let i = 0; i < queries.length; i += 1) {
//     // sums[`${i}${i}`] = sums[`${i}${i}`] || nums[i];
//     // sums[`${i}${i + 1}`] =
//     for (let j = queries[i][0]; j <= queries[i][1]; j += 1) {
//       sums[`${i}${j}`] = sums[`${i}${j}`];
//     }
//   }

//   console.log('sums', sums);

//   // return sum % 1000000007;
// }

let nums
let queries
let expected
let actual

nums = [3, 0, -2, 6, -3, 2]
queries = [[0, 2],
  [2, 5],
  [0, 5]]
expected = 10
actual = sumInRange(nums, queries)
assert.strictEqual(actual, expected)

nums = [-1000]
queries = [[0, 0]]
expected = 999999007
actual = sumInRange(nums, queries)
assert.strictEqual(actual, expected)

nums = [34, 19, 21, 5, 1, 10, 26, 46, 33, 10]
queries = [[3, 7],
  [3, 4],
  [3, 7],
  [4, 5],
  [0, 5]]
expected = 283
actual = sumInRange(nums, queries)
assert.strictEqual(actual, expected)

nums = [-4, -18, -22, -14, -33, -47, -29, -35, -50, -19]
queries = [[2, 9],
  [5, 6],
  [1, 2],
  [2, 2],
  [4, 5]]
expected = 999999540
actual = sumInRange(nums, queries)
assert.strictEqual(actual, expected)

console.log('All tests passed.')
