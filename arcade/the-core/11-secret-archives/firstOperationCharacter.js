const assert = require('assert')

/*
  I suggest we start by finding the most deeply nested parens.

  If there are multiple expressions in equally nested parens,
  we'll have to analyze them all and prioritize * over +

  ---

  Maybe we can do this linearly:
    - Split the expr into chars, and reduce it for the answer
    - Use acc to track the answer index
      - when we come upon *|+, check parenCount, and perhaps set a new acc
      - 'nestedCount' tracks how many opening parens we currently have.

  firstOp = {
    index: number,
    parens: number,
    op: '+' or '*'
  }
*/

function firstOperationCharacter (expr) {
  let parens = 0

  return expr.split('').reduce((acc, val, i) => {
    switch (val) {
      case '(': {
        parens++
        break
      }

      case ')': {
        parens--
        break
      }

      case '*': {
        if (parens > acc.parens || (parens === acc.parens && acc.op !== '*')) {
          acc = { parens, index: i, op: '*' }
        }
        break
      }

      case '+': {
        if (parens > acc.parens || (parens === 0 && !acc.op)) {
          acc = { parens, index: i, op: '+' }
        }
        break
      }
    }

    return acc
  }, { parens: 0 }).index
}

const makeTest = (e, x) => ({ e, x })
const tests = [
  makeTest('(2 + 2) * 2', 3),
  makeTest('2 + 2 * 2', 6),
  makeTest('((2 + 2) * 2) * 3 + (2 + (2 * 2))', 28),
  makeTest('2+((22+2222)+(2222+222))', 6),
  makeTest('2 + 3 * 45 * 56 + 198 + 10938 * 102938 + 5', 6),
  makeTest('1022224552222222 * 3', 17),
  makeTest('1 * 1 * 1 * (1 + 1)', 15),
  makeTest('1+(1*(1+1))', 7),
  makeTest('2 + 3 * 56 + (47 * 2 + (12 * 45 * 1) + 0 + 7)', 27)
]

tests.forEach(t => assert.strictEqual(firstOperationCharacter(t.e), t.x))
