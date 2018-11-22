const assert = require('assert')

function alphanumericLess (s1, s2) {
  const tokenRe = /[a-z]|[0-9]+/gi
  const leadingZeroRe = /^[0]+/g
  const t1 = s1.match(tokenRe)
  const t2 = s2.match(tokenRe)
  let tiebreaker

  if (s1 === s2) return false

  for (let i = 0; i < t1.length; i += 1) {
    // We've reached the end of s2 tokens
    if (i > t2.length - 1) return true

    // If a letter is compared with another letter, the usual order applies.
    if (isNaN(Number(t1[i])) && isNaN(Number(t2[i])) && t1[i] !== t2[i]) return (t1[i] < t2[i])

    // A number is always less than a letter.
    if (!isNaN(Number(t1[i])) && isNaN(Number(t2[i]))) return true

    // When two numbers are compared, their values are compared. Leading zeros, if any, are ignored.
    if (!isNaN(Number(t1[i])) && !isNaN(Number(t2[i]))) {
      let sT1 = String(t1[i])
      let sT2 = String(t2[i])

      // Account for leading zeros, set tiebreaker, then remove the zeros
      if ((sT1[0] === '0' || sT2[0] === '0') && !tiebreaker) {
        // The string whose ith token has more leading zeros is considered less.
        const t1zeros = (sT1.match(leadingZeroRe) || [''])[0]
        const t2zeros = (sT2.match(leadingZeroRe) || [''])[0]

        if (t1zeros.length !== t2zeros.length) tiebreaker = (t1zeros.length > t2zeros.length) ? 't1' : 't2'
      }

      sT1 = sT1.replace(leadingZeroRe, '')
      sT2 = sT2.replace(leadingZeroRe, '')

      // Different magnitude nums
      if (sT1.length !== sT2.length) return (sT1.length < sT2.length)

      // Loop over each char and compare them
      for (let j = 0; j < sT1.length; j += 1) {
        if (Number(sT1[j]) !== Number(sT2[j])) return (Number(sT1[j]) < Number(sT2[j]))
      }
    }
  }

  if (tiebreaker === 't1') return true
  if (t1.length < t2.length) return true

  return false
}

const test = (s1, s2, x) => assert.strictEqual(alphanumericLess(s1, s2), x)

test('a', 'a', false)
test('a', 'b', true)
test('b', 'a', false)
test('z', '0', false)
test('0', 'z', true)
test('999999', 'a', true)
test('a', '999999', false)
test('a', 'a1', true)
test('ab', 'a1', false)
test('b', 'a1', false)
test('x11y012', 'x011y13', true)
test('ab000144', 'ab144', true)// If the two strings s1 and s2 appear to be equal, consider the smallest index i such that tokens(s1)[i] and tokens(s2)[i] (where tokens(s)[i] is the ith token of string s) differ only by the number of leading zeros. If no such i exists, the strings are indeed equal. Otherwise, the string whose ith token has more leading zeros is considered less.
test('ab144', 'ab000144', false)
test('000', '0000', false)// ... more leading zeros is considered less.
test('abc123', 'abc123', false)
test('zza1233', 'zza1234', true)
test('zzz1', 'zzz1', false)
test('00', 'a2', true)
test('000000', 'a2', true)
test('1000000000000000000000000000000000000000000000000000000001', '1000000000000000000000000000000000000000000000000000000000', false)
test('1000000000000000000000000000000000000000000000000000000001', '1000000000000000000000000000000000000000000000000000000002', true)
test('100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001', '100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000', false)
test('100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001', '100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002', true)
test('19', '20', true)
test('119', '20', false)
test('0000000000000019', '20', true)
test('19', '00020', true)
test('Map', 'Rap', true)
test('ab02', 'ab2', true)
test('1ab02', '1ab2', true)
test('0ab02', '0ab2', true)

// Hidden tests that were failing :(
test('x817skjd8309218xn', 'x817sljd8309217xn', true) // OHHHH, so you quit as soon as a token in s1 is less than s2
test('a9', 'b1', true)
test('lckj0982871kdj12819', 'lckj00982871skdj12820', true)

/**
  "a" < "a1" < "ab"
  "ab42" < "ab000144" < "ab00144" < "ab144" < "ab000144x"
  "x11y012" < "x011y13"
 */
test('a', 'a1', true)
test('a1', 'ab', true)

test('ab42', 'ab000144', true)
test('ab000144', 'ab00144', true)
test('ab00144', 'ab144', true)
test('ab144', 'ab000144x', true)

test('x11y012', 'x011y13', true)

console.log('All tests passed.')
