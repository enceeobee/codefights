const assert = require('assert')

function higherVersion (ver1, ver2) {
  const v1 = ver1.split('.').map(v => Number(v))
  const v2 = ver2.split('.').map(v => Number(v))

  for (let i = 0; i < v1.length; i += 1) {
    if (v1[i] !== v2[i]) return (v1[i] > v2[i])
  }
  return false
}
const test = (v1, v2, x) => assert.strictEqual(higherVersion(v1, v2), x)

test('1.2.2', '2.2.0', false)
test('1.2.2', '1.22.0', false)
test('1.2.2', '1.2.0', true)
test('1.0.5', '1.1.0', false)
test('1.1.0', '1.1.5', false)
test('0.1.0', '0.1.5', false)
test('0.1.5', '0.1.5', false)
test('0.1.5', '0.1.0', true)
test('0.0.5', '0.0.0', true)
test('0', '0', false)
test('4.3.22.1', '4.3.22.1', false)
test('1.10.2', '1.2.10', true)

console.log('All tests passed.')
