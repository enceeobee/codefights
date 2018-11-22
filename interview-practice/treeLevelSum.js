const assert = require('assert')

function treeLevelSum (tree, k) {
  'use strict'
  let level = -1
  let digit = ''

  return tree
    .split('')
    .reduce((acc, val) => {
      if (/\d/.test(val)) {
        digit += val
      } else {
        acc[level] = acc[level] || []
        if (digit) acc[level].push(Number(digit))
        digit = ''
        level = (val === '(') ? level + 1 : level - 1
      }
      return acc
    }, [])[k]
    .reduce((acc, val) => acc + val)
}

let tree
let k
let expected
let actual

tree = '(0(5(6()())(14()(9()())))(7(1()())(23()())))'
k = 2
expected = 44
actual = treeLevelSum(tree, k)
assert.strictEqual(actual, expected)

tree = '(3(3()())(1()()))'
k = 1
expected = 4
actual = treeLevelSum(tree, k)
assert.strictEqual(actual, expected)

tree = '(0(5(6()())(4()(9()())))(7(1()())(3()())))'
k = 2
expected = 14
actual = treeLevelSum(tree, k)
assert.strictEqual(actual, expected)

tree = '(3()())'
k = 0
expected = 3
actual = treeLevelSum(tree, k)
assert.strictEqual(actual, expected)

tree = '(0(5()())())'
k = 1
expected = 5
actual = treeLevelSum(tree, k)
assert.strictEqual(actual, expected)

console.log('All tests passed')
