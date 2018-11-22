const assert = require('assert')

function constructSquare (s) {
  const makeMap = value => (
    String(value).split('')
      .reduce((acc, val) => {
        if (!acc.includes(val)) acc.push(val)
        return acc
      }, [])
      .map(key => String(value).match(new RegExp(key, 'g')).length)
      .sort((a, b) => a - b)
  )
  const checkDoesMatch = (sMap, nMap) => sMap.length === nMap.length && sMap.every((val, i) => val === nMap[i])
  const sMap = makeMap(s)

  let highSquare = 0
  let curSqrt = Math.floor(Math.sqrt((Math.pow(10, s.length - 1))))
  let curSquare = curSqrt * curSqrt

  while (String(curSquare).length <= s.length) {
    if (checkDoesMatch(sMap, makeMap(curSquare)) && curSquare > highSquare) {
      highSquare = curSquare
    }
    curSqrt += 1
    curSquare = curSqrt * curSqrt
  }

  return highSquare || -1
}

const test = (s, expected) => assert.strictEqual(constructSquare(s), expected)

test('ab', 81)
test('zzz', -1)
test('aba', 900)
test('abcbbb', 810000)
test('abc', 961)
test('aaaabbcde', 999950884)

console.log('All tests passed.')
