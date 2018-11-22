const assert = require('assert')

function mostFrequentDigitSum (n) {
  const s = n => String(n).split('').reduce((acc, val) => Number(acc) + Number(val))
  const step = x => x - s(x)

  let curNum = step(n)

  const seq = [n, curNum] // 88, 72, 63, 54, 45, 36, 27, 18, 9, 0;

  while (curNum > 0) {
    curNum = step(curNum)
    seq.push(curNum)
  }

  const seq2 = seq.map(n => s(n))
  const nums = seq2.reduce((acc, val) => {
    if (!acc[val]) acc[val] = 0
    acc[val] += 1
    return acc
  }, {})

  const maxNum = Object.keys(nums).reduce((acc, val) => nums[val] > acc ? nums[val] : acc, 0)
  const maxNums = Object.keys(nums).filter(key => nums[key] === maxNum).map(n => Number(n))

  return Math.max(...maxNums)
}

const test = (n, expected) => assert.strictEqual(mostFrequentDigitSum(n), expected)

test(88, 9)
test(8, 8)
test(1, 1)
test(17, 9)
test(239, 9)
test(994, 9)
test(99999, 18)
