const assert = require('assert')

function buildPalindrome (st) {
  'use strict'

  let half = Math.floor(st.length / 2)
  let isPal = false
  let pal = st
  let i

  // original string is palindromic
  if (st.slice(0, half + 1) === st.slice(half).split('').reverse().join('')) return st

  while (!isPal) {
    for (i = 1; i < half; i += 1) {
      if (!pal[half + i]) {
        isPal = true
        break
      } else {
        isPal = (pal[half - i] === pal[half + i])
      }
      // isPal = (!pal[half + i]) || (pal[half - i] === pal[half + i]);
      // if (isPal) break;
    }

    half += 1
  }

  return pal + pal.slice(0, half - i).split('').reverse().join('')
}

let st = 'abcdc'
let expected = 'abcdcba'
let actual = buildPalindrome(st)
assert.strictEqual(actual, expected)

st = 'ababab'
expected = 'abababa'
actual = buildPalindrome(st)
assert.strictEqual(actual, expected)

st = 'race'
expected = 'racecar'
actual = buildPalindrome(st)
assert.strictEqual(actual, expected)

st = 'racec'
expected = 'racecar'
actual = buildPalindrome(st)
assert.strictEqual(actual, expected)

st = 'acec'
expected = 'aceca'
actual = buildPalindrome(st)
assert.strictEqual(actual, expected)

st = 'raceca'
expected = 'racecar'
actual = buildPalindrome(st)
assert.strictEqual(actual, expected)

st = 'racecar'
expected = 'racecar'
actual = buildPalindrome(st)
assert.strictEqual(actual, expected)

console.log('All tests passed.')
