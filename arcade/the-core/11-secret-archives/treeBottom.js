const assert = require('assert')

function treeBottom (tree) {
  let level = -1
  let digit = ''

  const bottom = tree
    .split('')
    .reduce((acc, val) => {
      if (val === ' ') return acc

      if (/\d/.test(val)) {
        digit += val
      } else {
        if (!acc[level]) acc.push([])
        if (digit) acc[level].push(Number(digit))
        digit = ''
        level = (val === '(') ? level + 1 : level - 1
      }
      return acc
    }, [])

  return bottom.filter(a => a.length > 0).pop()
}

const makeTest = (t, x) => ({ t, x })
const tests = [
  makeTest('(2 (7 (2 () ()) (6 (5 () ()) (11 () ()))) (5 () (9 (4 () ()) ())))', [5, 11, 4]),
  makeTest('(1 () ())', [1]),
  makeTest('(1000 () ())', [1000]),
  makeTest('(413 (683 () ()) (355 (913 (985 () ()) ()) ()))', [985]),
  makeTest('(65 (88 (45 (4 () ()) ()) ()) (1000000000 () ()))', [4]),
  makeTest('(1 (2 (4 (8 () ()) (9 () ())) (5 (10 () ()) (11 () ()))) (3 (6 (12 () ()) (13 () ())) (7 (14 () ()) (15 () ()))))', [8, 9, 10, 11, 12, 13, 14, 15]),
  makeTest('(1 () (2 () (3 () (5 () (8 () (13 () (21 () (34 () ()))))))))', [34])
]

tests.forEach(t => assert.deepStrictEqual(treeBottom(t.t), t.x))
