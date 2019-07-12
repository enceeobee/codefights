const assert = require('assert')

// const has = Object.prototype.hasOwnProperty
// console.log(has.call(object, key));

// 4 % 3 = 1
// 10 % 2 = 0
// 10 % 4 = 2
// const mod = (x, y) => {
//   const absY = Math.abs(y)
//   let remainder

//   if (x / y === Math.round(x / y)) return 0

//   remainder = Math.abs(x) - absY

//   while (remainder - absY > 0) {
//     remainder -= absY
//   }

//   return (x >= 0) ? remainder : -remainder
// }

// assert.strictEqual(mod(10, 4), 2)
// assert.strictEqual(mod(-10, 4), -2)
// assert.strictEqual(mod(10, -4), 2)
// console.log('0', mod(0, 1000000007))
// console.log('-1000', mod(-1000, 1000000007))
// console.log('-2000', mod(-2000, 1000000007))
// console.log('10', mod(10, 1000000007))

// Here's another mod function found online:
// https://stackoverflow.com/questions/4467539/javascript-modulo-gives-a-negative-result-for-negative-numbers
function mod (n, m) {
  return ((n % m) + m) % m
}

// Attempt 4 - with prefix sums
// Holy cow it makes things easier when you know the algorithm
function sumInRange (numbers, queries) {
  // yi = yi − 1 + xi-1 for i > 0, and y0 = 0
  const prefixSums = numbers.reduce((acc, number, i) => {
    acc.push(acc[i] + numbers[i])
    return acc
  }, [0])

  // console.log('prefixSums', prefixSums)

  // To get the sum of the elements xa + xa+1 + ... + xb we would calculate yb+1 - ya.
  const totalSum = queries.reduce((acc, [a, b]) => {
    return acc + prefixSums[b + 1] - prefixSums[a]
  }, 0)

  return mod(totalSum, 1000000007)
}

// Attempt 3 - with smart memo
// function sumInRange (nums, queries) {
//   /**
//    * Keep track of start indices
//    *  startMap = { startIndex: { endIndex: sum } }
//    * Keep track of end indices
//    *  endMap = { endIndex: { startIndex: sum } }
//    *
//    * If startMap[start][end] exists, use it.
//    * Else if startMap[start] exists, but end doesn't
//    *  - Find an end that's BEFORE "this" end.
//    *  - Grab that sum, then begin looping from beforeEnd + 1
//    *
//    * Be sure to account for overlap!
//    *  - e.g. if query is [0,5] and we already have [0,2] and [2,5], 2 is counted twice.
//    *  - so we'd return sumMap[0][2] + sumMap[2][5] - sums[2]
//    */
//   const memoizeStart = (start, end, sum) => {
//     if (!has.call(queryByStart, start)) {
//       queryByStart[start] = {}
//     }

//     queryByStart[start][end] = sum
//   }

//   const memoizeEnd = (start, end, sum) => {
//     if (!has.call(queryByEnd, end)) {
//       queryByEnd[end] = {}
//     }

//     queryByEnd[end][start] = sum
//   }

//   const queryByStart = {}
//   const queryByEnd = {}
//   let totalSum = 0
//   let curEnd

//   const sums = queries.map(([start, end]) => {
//     curEnd = start

//     if (has.call(queryByStart, start)) {
//       if (has.call(queryByStart[start], end)) {
//         return queryByStart[start][end]
//       }

//       // Look for an end that's before current end.
//       // Grab that sum, then look for the start from that end
//       // Don't forget:
//       // - memoize
//       // - don't double count

//       // Actually, better yet, maybe we keep a while loop tracking the endIndex.
//       /*
//         while (curEnd !== end) { // continue calculating sum
//           curEnd++
//         }
//       */
//     }

//     // All else fails, do the full lookup
//     const innerSum = nums
//       .slice(start, end + 1)
//       .reduce((acc, val) => acc + val)

//     memoizeStart(start, end, innerSum)
//     memoizeEnd(start, end, innerSum)

//     return innerSum
//   })

//   totalSum = sums.reduce((acc, val) => acc + val)

//   console.log('\nqueryByStart', queryByStart)
//   console.log('queryByEnd', queryByEnd)

//   if (totalSum > 0) {
//     return totalSum % 1000000007
//   }

//   return mod(totalSum, 1000000007)
// }

// Attempt 2 - with memo
// function sumInRange (nums, queries) {
//   const sumMap = {}
//   const sum = queries
//     .map(([start, end]) => {
//       if (sumMap.hasOwnProperty(`${start}:${end}`)) return sumMap[`${start}:${end}`]

//       const innerSum = nums
//         .slice(start, end + 1)
//         .reduce((acc, val) => acc + val)

//       sumMap[`${start}:${end}`] = innerSum

//       return innerSum
//     })
//     .reduce((acc2, val2) => acc2 + val2)

//   if (sum > 0) {
//     return sum % 1000000007
//   }

//   return mod(sum, 1000000007)
// }

// Attempt 1 - Naive
// function sumInRange (nums, queries) {
//   const sum = queries
//     .map((q) => (
//       nums
//         .slice(q[0], q[1] + 1)
//         .reduce((acc, val) => acc + val)
//     ))
//     .reduce((acc2, val2) => acc2 + val2)

//   if (sum > 0) {
//     return sum % 1000000007
//   }

//   return mod(sum, 1000000007)
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
