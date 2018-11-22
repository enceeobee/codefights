const assert = require('assert')

function addBorder (picture) {
  const border = '*'.repeat(picture[0].length + 2)
  const paddedPic = picture.map(row => `*${row}*`)
  paddedPic.unshift(border)
  paddedPic.push(border)
  return paddedPic
}

const test = (p, x) => assert.strictDeepEqual(addBorder(p), x)

test(['abc',
  'ded'], ['*****',
  '*abc*',
  '*ded*',
  '*****'])
test(['a'], ['***',
  '*a*',
  '***'])

console.log('All test passed.')
