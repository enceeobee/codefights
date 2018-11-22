const assert = require('assert')
/**
   * The trick is that both parent[0] and parent[newRoot] need to keep their existing children
   * Like, the tree doesn't physically change, it just moves/morphs/shifts
   *
   * WHAT ARE THE FACTS?
   *
   * New root goes to top (set parent[newRoot] = newRoot)
   * All nodes connected to newRoot are now its children
   *  * this cascades: all nodes connected to these nodes become children too
   * Once we make it back down to the original root, no more changes are required (all children here will be unaffected)
   *
   * So, it sounds like we can do this recursively?
   *
   * ---
   *
   * Find the connected nodes of newRoot
   *  - All connected nodes will remain connected, but shifted
   *  -
   *
   * Set newParent[i] to i
   *
   * Any children of i can be left alone
   *
   * The old root will now be set to one of its former children
   *
   */

function changeRoot (parent, newRoot) {
  const newParents = parent.map(p => p)
  const alreadyArranged = {}

  newParents[newRoot] = newRoot
  rearrangeNodes(newRoot, getConnectedNodes(parent, newRoot))

  function rearrangeNodes (parent, nodes) {
    let node
    let connectedNodes
    nodes = nodes.filter(node => !alreadyArranged[node])

    for (let i = 0; i < nodes.length; i++) {
      node = nodes[i]
      connectedNodes = getConnectedNodes(newParents, node).filter(node => !alreadyArranged[node])

      if (node === newRoot) return true

      newParents[node] = parent
      alreadyArranged[node] = true

      rearrangeNodes(node, connectedNodes)
    }

    return false
  }

  return newParents
}

function getConnectedNodes (parents, value) {
  return parents.reduce((acc, parent, i) => {
    if (parent === value) acc.push(i)
    else if (i === value) acc.push(parent)

    return acc
  }, [])
}

const tests = [
  {
    parent: [0, 0, 0, 1], // connectedNodes = [0,3]
    newRoot: 1,
    expected: [1, 1, 0, 1]
  },
  /**
   *   3
   *    \
   *     1
   *      \
   *       0
   *        \
   *         2
   */
  {
    parent: [0, 0, 0, 1], // custom test
    newRoot: 3,
    expected: [1, 3, 0, 3]
  },
  {
    parent: [0, 0, 0, 1, 1, 1, 2, 2, 7],
    newRoot: 7,
    expected: [2, 0, 7, 1, 1, 1, 2, 7, 7]
  },
  {
    parent: [0, 0, 0, 1, 1, 1, 2, 2, 7, 7],
    newRoot: 2,
    expected: [2, 0, 2, 1, 1, 1, 2, 2, 7, 7]
  },
  /**
   *       2
   *        \
   *         3
   *        /\
   *       0  1
   *      /
   *     4
   * ----
   *        0
   *       /\
   *      4  3
   *         /\
   *        1  2
   * --- I made: ----
   *        0
   *       /\
   *      4  3   2
   *         /  /
   *        1  2
   */
  {
    parent: [3, 3, 2, 2, 0],
    newRoot: 0,
    expected: [0, 3, 3, 0, 0]
  },
  {
    parent: [8, 6, 8, 8, 7, 6, 8, 8, 8, 7],
    newRoot: 7,
    expected: [8, 6, 8, 8, 7, 6, 8, 7, 7, 7]
  },
  {
    parent: [5, 3, 0, 5, 10, 5, 5, 0, 10, 10, 0, 13, 3, 3, 2],
    newRoot: 8,
    expected: [10, 3, 0, 5, 10, 0, 5, 0, 8, 10, 8, 13, 3, 3, 2]
  },
  {
    parent: [5, 18, 18, 1, 19, 19, 0, 2, 4, 2, 11, 11, 1, 1, 5, 2, 18, 4, 4, 11],
    newRoot: 2,
    expected: [5, 18, 2, 1, 18, 19, 0, 2, 4, 2, 11, 19, 1, 1, 5, 2, 18, 4, 2, 4]
  }
]

assert.strictDeepEqual(getConnectedNodes(tests[0].parent, 1), [0, 3])
assert.strictDeepEqual(getConnectedNodes(tests[2].parent, 2), [0, 6, 7])

tests.forEach(({ parent, newRoot, expected }) => assert.strictDeepEqual(changeRoot(parent, newRoot), expected))
