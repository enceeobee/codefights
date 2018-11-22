const assert = require('assert')

// Boyer-Moore-Horspool
function strstr (s, x) {
  'use strict'

  const preprocess = (P) => {
    const badMatches = {}
    for (let i = 0; i < P.length - 1; i += 1) badMatches[P[i]] = P.length - i - 1
    badMatches[P[P.length - 1]] = badMatches[P[P.length - 1]] || P.length
    return badMatches
  }

  const xLen = x.length
  const sLen = s.length
  const badMatches = preprocess(x)

  let i = 0
  let j
  let firstLetter

  while (i <= sLen - xLen) {
    j = xLen - 1
    firstLetter = s[i + j]
    while (s[i + j] === x[j]) {
      j -= 1
      if (j < 0) return i
    }
    i += badMatches[firstLetter] || xLen
  }

  return -1
}

// function strstr(s, x) {
//   'use strict';

//   const xLen = x.length;
//   const sLen = s.length;

//   let comparator = s.slice(0, xLen);
//   let i;

//   for (i = 0; i <= sLen - xLen; i += 1) {
//     if (comparator === x) return i;

//     comparator = comparator.replace(/./, '') + s[i + xLen];
//   }
//   return -1;
// }

let s
let x
let expected
let actual

s = 'trusthardtoothbrushes'
x = 'tooth'
expected = 9
actual = strstr(s, x)
assert.strictEqual(actual, expected)

s = 'natefuckingbisbee'
// s = 'natebisbee';
x = 'bisbee'
expected = 11
actual = strstr(s, x)
assert.strictEqual(actual, expected)

s = 'aaaA'
x = 'aaA'
expected = 1
actual = strstr(s, x)
assert.strictEqual(actual, expected)

s = 'GTgpEYIWKIWrlEtByHryETrBeTWNkHutWKOCvVNRSGSxaynjzTatJMKSwCLSCZObaNNGCXQssfEEDDJIPBwtkMmTniKaKfqaOtvO'
x = 'vCLSCZObaNNGCXQssfEEDDJIPBwtkMmTniKa'
expected = -1
actual = strstr(s, x)
assert.strictEqual(actual, expected)

s = 'ATErUUeUkVFVNfxfUKtntOErKmZLUpWpHRASdxjUhzzxygmnNnKabPPgPqyvCLSCZObaNNGCXQssfEEDDJIPBwtkMmTniKapBlrd'
x = 'vCLSCZObaNNGCXQssfEEDDJIPBwtkMmTniKa'
expected = 59
actual = strstr(s, x)
assert.strictEqual(actual, expected)

s = 'ATErUUvCLSCZObaNNGCXQssfEEDDJIPBwtkMmTniKaeUkVFVNfxfUKtntOErKmZLUpWpHRASdxjUhzzxygmnNnKabPPgPqypBlrd'
x = 'vCLSCZObaNNGCXQssfEEDDJIPBwtkMmTniKa'
expected = 6
actual = strstr(s, x)
assert.strictEqual(actual, expected)

s = 'ATErUUvCLSCZObaNNGCXQssfEEDDJIPBwtkMmTniKaeUkVFVNfxfUKtntOErKmZLUpWpHRASdxjUhzzxygmnNnKabPPgPqypBlrd'
x = 'ATErUUvCLSCZObaNNGCXQssfEEDDJIPBwtkMmTniKaeUkVFVNfxfUKtntOErKmZLUpWpHRASdxjUhzzxygmnNnKabPPgPqypBlr'
expected = 0
actual = strstr(s, x)
assert.strictEqual(actual, expected)

s = 'ATErUUvCLSCZObaNNGCXQssfEEDDJIPBwtkMmTniKaeUkVFVNfxfUKtntOErKmZLUpWpHRASdxjUhzzxygmnNnKabPPgPqypBlrd'
x = 'pBlr'
expected = 95
actual = strstr(s, x)
assert.strictEqual(actual, expected)

console.log('All tests passed.')
