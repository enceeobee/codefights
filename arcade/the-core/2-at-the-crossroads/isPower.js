const assert = require('assert')
// .25-.31 ms
// function isPower(n) {
//   'use strict';
//   // 125
//   // squareRoot = 11
//   const squareRoot = Math.floor(Math.sqrt(n));

//   let powered;

//   for (let exp = 2; exp <= squareRoot; exp += 1) {
//     // 2; 3
//     for (let base = squareRoot; base > 1; base -= 1) {
//       // 11; 11
//       powered = Math.pow(base, exp);
//       // 11^2 = 121; 11^3 = 1331; 10^3 = 1000; 9^3 = 729
//       if (powered < n) continue;
//       else if (powered === n) return true;
//     }
//   }

//   return false;
// }

// .19 - .20 ms
// function isPower(n) {
//   'use strict';
//   const squareRoot = Math.floor(Math.sqrt(n));
//   let divided;

//   for (let i = squareRoot; i > 1; i -= 1) {
//     divided = n;
//     // 125 / 11 = 11.345e45
//     // 125 / 10 = 12.5
//     // ...
//     // 125 / 5 = 25 / 5 = 5 -> divided === i
//     /**
//      * 256
//      */
//     while (divided % i === 0) {
//       divided /= i;
//       if (divided === i) return true;
//       // if ((divided /= i) === i) return true;
//     }
//     // while (divided % i === 0) if ((divided /= i) === i) return true;
//   }
//   return false;
// }

function isPower (n) {
  'use strict'

  // Yeah yeah...
  if (n === 1) return true

  const squareRoot = Math.floor(Math.sqrt(n))
  let divided = n

  for (let i = squareRoot; i > 1 && divided >= i; i -= 1) {
    divided = n
    while (divided % i === 0) if ((divided /= i) === i) return true
  }
  return false
}

let n
let expected
let actual

console.time('tests')

n = 125
expected = true
actual = isPower(n)
assert.strictEqual(actual, expected)

n = 100
expected = true
actual = isPower(n)
assert.strictEqual(actual, expected)

n = 11
expected = false
actual = isPower(n)
assert.strictEqual(actual, expected)

n = 324
expected = true
actual = isPower(n)
assert.strictEqual(actual, expected)

n = 12
expected = false
actual = isPower(n)
assert.strictEqual(actual, expected)

n = 1
expected = true
actual = isPower(n)
assert.strictEqual(actual, expected)

n = 2
expected = false
actual = isPower(n)
assert.strictEqual(actual, expected)

n = 3
expected = false
actual = isPower(n)
assert.strictEqual(actual, expected)

n = 4
expected = true
actual = isPower(n)
assert.strictEqual(actual, expected)

n = 8
expected = true
actual = isPower(n)
assert.strictEqual(actual, expected)

n = 9
expected = true
actual = isPower(n)
assert.strictEqual(actual, expected)

n = 121
expected = true
actual = isPower(n)
assert.strictEqual(actual, expected)

n = 289
expected = true
actual = isPower(n)
assert.strictEqual(actual, expected)

n = 256
expected = true
actual = isPower(n)
assert.strictEqual(actual, expected)

n = 350
expected = false
actual = isPower(n)
assert.strictEqual(actual, expected)

n = 49
expected = true
actual = isPower(n)
assert.strictEqual(actual, expected)

n = 72
expected = false
actual = isPower(n)
assert.strictEqual(actual, expected)

console.timeEnd('tests')
console.log('All tests passed.')
