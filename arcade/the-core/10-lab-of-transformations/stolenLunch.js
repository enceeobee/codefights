const assert = require('assert')

function stolenLunch (note) {
  const subs = 'abcdefghij'
  let decoded = ''
  let val

  for (let i = 0; i < note.length; i += 1) {
    val = note[i]

    if (!isNaN(parseInt(val, 10))) {
      decoded += subs[Number(val)]
    } else if (subs.includes(val)) {
      decoded += subs.indexOf(val)
    } else {
      decoded += val
    }
  }

  return decoded
}

const test = (n, x) => assert.strictEqual(stolenLunch(n), x)

test('n n', 'n n')
test('n4v4r', 'never')
test('you\'ll n4v4r', 'you\'ll never')
test("you'll n4v4r 6u4ss 8t: cdja", "you'll never guess it: 2390")
test('', '')
test('0123456789', 'abcdefghij')
test('jihgfedcba', '9876543210')
test("you won't know!!", "you won't know!!")
test('just 63jd73 some random note jkhdf83 ds823 that you, dfj238 dsf38 little one?, will abjk38 s83    skdu3 29never get!', '9ust gd93hd som4 r0n3om not4 9k735id 3sicd t70t you, 359cdi 3s5di l8ttl4 on4?, w8ll 019kdi sid    sk3ud cjn4v4r 64t!')

console.log('All tests passed.')
