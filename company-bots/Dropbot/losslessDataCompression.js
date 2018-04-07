const assert = require('assert')

function losslessDataCompression (inputString, width) {
  const s = inputString
  let result = ''

  let win
  let maxLen
  let minStartIndex
  let pairs
  let sub

  for (let i = 0; i < s.length; i++) {
    win = s.substring(i - width, i)
    maxLen = 0
    minStartIndex = Infinity
    pairs = []

    for (let startIndex = Math.max(0, i - width); startIndex < i; startIndex++) {
      for (let len = 1; len <= win.length; len++) {
        sub = s.substring(startIndex, startIndex + len)
        if (sub === s.substring(i, i + len) && win.includes(sub)) {
          pairs.push({ len, startIndex })
          if (len > maxLen) {
            maxLen = len
          }
          if (startIndex < minStartIndex) {
            minStartIndex = startIndex
          }
        }
      }
    }

    // Add to result
    if (maxLen === 0) result += s[i]
    else {
      let thePair = pairs.filter(pair => pair.len === maxLen)
      if (thePair.length > 1) thePair.filter(pair => pair.startIndex === minStartIndex)

      result += `(${thePair[0].startIndex},${thePair[0].len})`

      i += thePair[0].len - 1
    }
  }

  return result
}

assert.equal(losslessDataCompression('abacabadabacaba', 7), 'ab(0,1)c(0,3)d(4,3)c(8,3)')
assert.equal(losslessDataCompression('abacabadabacaba', 8), 'ab(0,1)c(0,3)d(0,7)')
assert.equal(losslessDataCompression('aaaaaaaaaaaaaaaaaaaaaaaaaaaa', 12), 'a(0,1)(0,2)(0,4)(0,8)(4,12)')
assert.equal(losslessDataCompression('aaabbbaaabbb', 1), 'a(0,1)(1,1)b(3,1)(4,1)a(6,1)(7,1)b(9,1)(10,1)')
assert.equal(losslessDataCompression('y', 1), 'y')
assert.equal(losslessDataCompression('codefights', 20), 'codefights')
assert.equal(losslessDataCompression('natebisbee', 3), 'natebis(4,1)e(8,1)')
assert.equal(losslessDataCompression('natebisbee', 5), 'natebis(4,1)(3,1)(8,1)')
