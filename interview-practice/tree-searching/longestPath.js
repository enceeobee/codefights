const assert = require('assert')
/*
  Perhaps we can make a tree, then traverse it,
  keeping track of the longest file path

  Returns:
    - Integer
    - Length of *file* path

  Gotchas
    - No file exists in the file system
      - Return 0
*/
class Node {
  constructor (value, children = null) {
    this.value = value
    this.children = children
  }
}

function longestPath (fileSystem) {
  let longestSoFar = 0

  const tree = buildTree(fileSystem)

  return longestSoFar
}

/*
  user
    \tpictures
      \t\tphoto.png
      \t\tcamera
    \tdocuments
      \t\tlectures
        \t\t\tnotes.txt
*/
function buildTree (fileSystem) {



  console.log(fileSystem.split('\f'))

  const nodes = []
  const tabRegex = /\t/g
  let level
  let match

  fileSystem.split('\f').forEach((node) => {
    match = node.match(tabRegex)

    level = match != null ? match.length : 0

    // nodes[level] = new Node(node.replace(tabRegex, ''))
    if (!nodes[level]) nodes[level] = []

    nodes[level].push(node.replace(tabRegex, ''))
  })

  console.log('nodes', nodes)
}

const makeTest = (f, x) => ({ f, x })
const tests = [
  makeTest('user\f\tpictures\f\tdocuments\f\t\tnotes.txt', 24),
  // makeTest('user\f\tpictures\f\t\tphoto.png\f\t\tcamera\f\tdocuments\f\t\tlectures\f\t\t\tnotes.txt', 33),
  // makeTest('a', 0),
  // makeTest('a.txt', 5),
  // makeTest('a.tar.gz', 8),
  // makeTest('ReadME.TXT', 10),
  // makeTest('file name with  space.txt', 25),
  // makeTest('a\f\tb\f\t\tc', 0),
  // makeTest('a\f\tb\f\t\tc.txt', 9),
  // makeTest('dir\f    file.txt', 12),
  // makeTest('dir\f\tfile.txt', 12),
  // makeTest('dir\f\tfile.txt\f\tfile2.txt', 13)
]

tests.forEach(test => assert.strictEqual(longestPath(test.f), test.x))
