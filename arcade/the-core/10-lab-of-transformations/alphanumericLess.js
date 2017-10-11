const assert = require('assert')

function alphanumericLess (s1, s2) {
  const tokenRe = /[a-z]|[0-9]+/g
  const t1 = s1.match(tokenRe)
  const t2 = s2.match(tokenRe)
  let tokenLeadingZeros
  let t2TokenLeadingZeros
  let t1HasMoreLeadingZeros

  const isSortedThroughA = t1.every((token, i) => {
    if (i > t2.length - 1) return true

    // If a letter is compared with another letter, the usual order applies.
    if (isNaN(Number(token)) && isNaN(Number(t2[i]))) return token <= t2[i]

    // A number is always less than a letter.
    if (!isNaN(Number(token)) && isNaN(Number(t2[i]))) return true
    if (isNaN(Number(token)) && !isNaN(Number(t2[i]))) return false

    // When two numbers are compared, their values are compared. Leading zeros, if any, are ignored.
    if (!isNaN(Number(token)) && !isNaN(Number(t2[i]))) {
      // Check leading zero stuff
      if (Number(token) === Number(t2[i]) && token !== t2[i]) {
        tokenLeadingZeros = (token.match(/^0+/g) || [])[0].length
        t2TokenLeadingZeros = (t2[i].match(/^0+/g) || [])[0].length
        t1HasMoreLeadingZeros = tokenLeadingZeros > t2TokenLeadingZeros
      }
      return Number(token) <= Number(t2[i])
    }

    // Default return
    return false
  })

  if (!isSortedThroughA) return false
  if (t2.length !== t1.length) return (t2.length > t1.length)

  /**
   * If the two strings s1 and s2 appear to be equal, consider the smallest index i such that
   * tokens(s1)[i] and tokens(s2)[i] differ only by the number of leading zeros. If no
   * such i exists, the strings are indeed equal. Otherwise, the string whose ith token
   * has more leading zeros is considered less.
   */
  if (tokenLeadingZeros && !t1HasMoreLeadingZeros) return false
  // for (let i = 0; i < t1.length; i += 1) {
  //   if ((t1[i][0] === '0' || t2[i][0] === '0') && Number(t1[i]) === Number(t2[i])) {
  //     console.log('t1[i]', t1[i], 't2[i]', t2[i])

  //     // return 'a has more zeros'
  //     for (let j = 0; j < t1[i].length; j += 1) {
  //       if (t1[i] === '0' && t2[i] !== '0') return true
  //     }
  //     return false
  //   }
  // }

  return true
}

const test = (s1, s2, x) => assert.equal(alphanumericLess(s1, s2), x)

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

console.log('All tests passed.')
