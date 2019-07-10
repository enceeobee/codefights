const assert = require('assert')

// Definition for binary tree:
// function Tree(x) {
//   this.value = x;
//   this.left = null;
//   this.right = null;
// }

const getRightmost = t => (!t.right) ? t.value : getRightmost(t.right)

function deleteFromBST (t, queries) {
  if (!t) return null
  if (!queries || queries.length === 0) return t

  for (let query of queries) {
    if (t.value === query) {
      if (t.left) {
        t.value = getRightmost(t.left)
        t.left = deleteFromBST(t.left, [t.value])
        continue
      }

      if (t.right) {
        t = t.right
        continue
      }

      return null
    } else if (query < t.value) {
      t.left = deleteFromBST(t.left, [query])
    } else {
      t.right = deleteFromBST(t.right, [query])
    }
  }

  return t
}

/**
 *  If there is no x in t, nothing happens;
    Otherwise, let t' be a subtree of t such that t'.value = x.
      If t' has a left subtree, remove the rightmost node from it and put it at the root of t';
      Otherwise, remove the root of t' and its right subtree becomes the new t's root.

  ---

  If you draw and test it after switching "40" with the root "50",
  most algorithms including my previous one would also switch "36" with "40",
  which was "RightMost" of "50", and make "36" the root of "32" and "34" which is wrong!

  In this example if you change your code to the above notes, "40" will switch "50", and
  "40" 's left subtree will become the right child of its parent which is "30".

  Hope that helps.

  ---

  When t.value == q, you need to find the rightmost node of the left child.
  Do not use recursion to delete the rightmost node and move its value to t.
  That does preserve the BST property, but does not follow the algorithm prescribed in this problem.

  Instead, find the right most node X, and update the pointer leading to it from its parent to point to X.left.

  Note that X could be parent.left or parent.right. It is parent.left when t.value == q and t.left.right == null (and t.left == X)
 */

// let queries = [50, 70, 40]
// let tree = {
//   value: 50,
//   left: {
//     value: 30,
//     left: { value: 20 },
//     right: {
//       value: 40,
//       left: {
//         value: 32,
//         left: { },
//         right: {
//           value: 34,
//           left: { },
//           right: {
//             value: 36,
//             left: { },
//             right: { }
//           }
//         }
//       },
//       right: { }
//     }
//   },
//   right: {
//     value: 70,
//     left: {
//       value: 60,
//       left: { },
//       right: { }
//     },
//     right: {
//       value: 80,
//       left: {
//         value: 75,
//         left: { },
//         right: { }
//       },
//       right: { }
//     }
//   }
// }

const makeTest = (t, q, x) => ({ t, q, x })
const tests = [
  makeTest(
    { value: 4, left: { value: 2, left: { value: 1, left: null, right: null }, right: { value: 3, left: null, right: null } }, right: null },
    [4],
    { value: 3, left: { value: 2, left: { value: 1, left: null, right: null }, right: null }, right: null }),
  makeTest(
    {
      value: 5,
      left: {
        value: 2,
        left: {
          value: 1,
          left: null,
          right: null
        },
        right: {
          value: 3,
          left: null,
          right: {
            value: 4,
            left: null,
            right: null
          }
        }
      },
      right: {
        value: 6,
        left: null,
        right: null
      }
    },
    [5],
    {
      value: 4,
      left: {
        value: 2,
        left: {
          value: 1,
          left: null,
          right: null
        },
        right: {
          value: 3,
          left: null,
          right: null
        }
      },
      right: {
        value: 6,
        left: null,
        right: null
      }
    }
  ),

  makeTest(
    {
      value: 3,
      left: {
        value: 2,
        left: null,
        right: null
      },
      right: {
        value: 5,
        left: null,
        right: null
      }
    },
    [3],
    {
      value: 2,
      left: null,
      right: {
        value: 5,
        left: null,
        right: null
      }
    }
  ),

  makeTest(
    {
      value: 5,
      left: {
        value: 2,
        left: {
          value: 1,
          left: null,
          right: null
        },
        right: {
          value: 4,
          left: {
            value: 3,
            left: null,
            right: null
          },
          right: null
        }
      },
      right: {
        value: 6,
        left: null,
        right: null
      }
    },
    [5],
    {
      value: 4,
      left: {
        value: 2,
        left: {
          value: 1,
          left: null,
          right: null
        },
        right: {
          value: 3,
          left: null,
          right: null
        }
      },
      right: {
        value: 6,
        left: null,
        right: null
      }
    }
  )
]

tests.forEach(t => assert.deepStrictEqual(deleteFromBST(t.t, t.q), t.x))
