const assert = require('assert')

function buildPalindrome (st) {
  if (st === st.split('').reverse().join('')) return st

  let innerPalindrome = ''
  let midpoint = (st.length % 2 === 1) ? Math.floor(st.length / 2) : st.length / 2 - 1

  for (midpoint; midpoint < st.length; midpoint++) {
    innerPalindrome = st[midpoint]

    let i = 1
    for (i; i < st.length - midpoint; i++) {
      if (st[midpoint - i] === st[midpoint + i]) {
        innerPalindrome = st[midpoint - i] + innerPalindrome + st[midpoint + i]
      } else {
        break
      }
    }

    // We've reached the end of st with a valid inner palindrome
    if (i === st.length - midpoint && innerPalindrome.length > 1) {
      break
    }
  }

  // Didn't find any inner palindromes, and st ends with consecutive letters
  if (midpoint === st.length && st[st.length - 2] === st[st.length - 1]) {
    innerPalindrome += innerPalindrome
  }

  const prefix = st.slice(0, st.length - innerPalindrome.length)

  return prefix + innerPalindrome + prefix.split('').reverse().join('')
}

const makeTest = (s, x) => ({ s, x })
const tests = [
  makeTest('abcdc', 'abcdcba'),
  makeTest('ababab', 'abababa'),
  makeTest('abba', 'abba'),
  makeTest('abaa', 'abaaba'),
  makeTest('aaaaba', 'aaaabaaaa'),
  makeTest('race', 'racecar'),
  makeTest('racec', 'racecar'),
  makeTest('acec', 'aceca'),
  makeTest('raceca', 'racecar'),
  makeTest('racecar', 'racecar'),
  makeTest('abcabc', 'abcabcbacba'),
  makeTest('cbdbedffcg', 'cbdbedffcgcffdebdbc'),
  makeTest('euotmn', 'euotmnmtoue')
]
tests.forEach(test => assert.strictEqual(buildPalindrome(test.s), test.x))

console.log('All tests passed.')
