const assert = require('assert')

const create = require('./create')

function addTwoHugeNumbers (a, b) {
  const aNums = []
  const bNums = []
  let aNode = a
  let bNode = b

  while (aNode || bNode) {
    if (aNode) {
      aNums.push(aNode.value)
      aNode = aNode.next
    }

    if (bNode) {
      bNums.push(bNode.value)
      bNode = bNode.next
    }
  }

  const sums = []
  let aNum
  let bNum
  let sum
  let numberStart

  while (aNums.length > 0 || bNums.length > 0) {
    aNum = aNums.pop() || 0
    bNum = bNums.pop() || 0

    sum = aNum + bNum

    if (sum <= 9999) {
      sums.unshift(sum)
    } else {
      numberStart = Number(String(sum).slice(0, -4))
      sums.unshift(Number(String(sum).slice(-4)))

      if (aNums.length > 0) aNums[aNums.length - 1] += numberStart
      else if (bNums.length > 0) bNums[bNums.length - 1] += numberStart
      else aNums.push(numberStart)
    }
  }

  return sums
}

const makeTest = (a, b, x) => ({
  a: create(a),
  b: create(b),
  x
})
const tests = [
  makeTest([2], [4], [6]),
  makeTest([9999], [2], [1, 1]), // 10,001
  makeTest([1, 2], [4], [1, 6]), // 10,002 + 4 = 10,006
  // 1,2; 4 => nn.next = athn(a.next, b)
  // 2; 4 => nn.value = 6; nn.next.value = 6
  // check next value; if it's > 9999, update nn.value

  makeTest([1, 9999], [4], [2, 3]), // 19999 + 4 = 20003
  makeTest([3], [1, 9999], [2, 2]), // 3 + 19999 = 20002
  // 1,9999; 4 => nn = { value: 1, next: nn.next = [1, 3])
  // nn.value = TBD => 1; 1 => 2

  makeTest([4], [1, 2], [1, 6]), // 4 + 10,002 = 10, 006

  makeTest([1, 2], [3, 4], [4, 6]), // 10002 + 30004 = 40006
  // 1,2; 3,4 => a.next, b.next
  // 2; 4 => 6; so a.next.value = 6
  // 1; 3 => 4; so a.value = 4
  // return a => [4, 6]

  makeTest([9876, 5432, 1999], [1, 8001], [9876, 5434, 0]), // 987,654,321,999 + 18,001 = 987,654,340,000
  makeTest([123, 4, 5], [100, 100, 100], [223, 104, 105]),
  makeTest([0], [0], [0]),
  makeTest([1234, 1234, 0], [0], [1234, 1234, 0]),
  makeTest([0], [1234, 123, 0], [1234, 123, 0]),
  makeTest([1], [9998, 9999, 9999, 9999, 9999, 9999], [9999, 0, 0, 0, 0, 0]),
  makeTest([1], [9999, 9999, 9999, 9999, 9999, 9999], [1, 0, 0, 0, 0, 0, 0]),
  makeTest([8339, 4510], [2309], [8339, 6819])
]

tests.forEach(({ a, b, x }) => assert.deepStrictEqual(addTwoHugeNumbers(a, b), x))

console.log('Solved addTwoHugeNumbers')
