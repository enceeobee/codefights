const assert = require('assert')

function alphanumericLess (s1, s2) {
  const tokenRe = /[a-z]|[0-9]+/g
  const leadingZeroRe = /^[0]+/g
  const t1 = s1.match(tokenRe)
  const t2 = s2.match(tokenRe)
  let isTie = true
  let tiebreaker

  if (s1 === s2) return false

  const isSorted = t1.every((token, i) => {
    if (i > t2.length - 1) {
      isTie = false
      return true
    }

    // If a letter is compared with another letter, the usual order applies.
    if (isNaN(Number(token)) && isNaN(Number(t2[i]))) {
      isTie = token === t2[i]
      return token <= t2[i]
    }

    // A number is always less than a letter.
    if (!isNaN(Number(token)) && isNaN(Number(t2[i]))) {
      isTie = false
      return true
    }
    if (isNaN(Number(token)) && !isNaN(Number(t2[i]))) return false

    // When two numbers are compared, their values are compared. Leading zeros, if any, are ignored.
    if (!isNaN(Number(token)) && !isNaN(Number(t2[i]))) {
      isTie = Number(token) === Number(t2[i])
      let sT1 = String(token)
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
      if (sT1.length < sT2.length) {
        isTie = false
        return true
      }
      if (sT1.length > sT2.length) {
        isTie = false
        return false
      }

      // Loop over each char and compare them
      for (let j = 0; j < sT1.length; j += 1) {
        if (Number(sT1[j]) > Number(sT2[j])) return false
        if (Number(sT1[j]) < Number(sT2[j])) {
          isTie = false
          return true
        }
      }

      return true
    }

    // Default return
    return false
  })

  if (isTie && tiebreaker === 't2' && t2.length <= t1.length) return false

  return isSorted
}

const test = (s1, s2, x) => assert.equal(alphanumericLess(s1, s2), x)

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
test('19', '20', true)
test('119', '20', false)
test('0000000000000019', '20', true)
test('19', '00020', true)
test('Map', 'Rap', true)
test('ab02', 'ab2', true)
test('1ab02', '1ab2', true)
test('0ab02', '0ab2', true)

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
