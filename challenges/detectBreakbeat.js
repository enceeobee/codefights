const { strictEqual } = require('assert')

function detectBreakbeat (pattern) {
  const measure = pattern.split(' ')
  const measureLen = measure.length

  // We need 8th notes to make a break beat
  if (measureLen < 8) return false

  const lenDiv4 = measureLen / 4
  const beats = [0, lenDiv4, lenDiv4 * 2, lenDiv4 * 3]

  // Check that the snare hits match, and are on beats 2 and 4
  if (measure[beats[1]] !== measure[beats[3]]) return false

  // Check that the 2nd and 4th beats aren't rests
  if (measure[beats[1]] === '~' || measure[beats[3]] === '~') return false

  // Check that the snare hits aren't the same as the kick
  if (measure[beats[1]] === measure[0] || measure[beats[3]] === measure[0]) return false

  // If there isn't a bass kick on the 1, return false
  if (measure[0] === '~') return false

  // Check bass beats
  if (measure[0] !== measure[(measureLen / 8) * 3] && measure[0] !== measure[(measureLen / 8) * 5]) return false

  return true
}

const makeTest = (p, x) => ({ p, x })
const tests = [
  makeTest('bd sn bd sn', false),
  makeTest('clubkick:2 ~ hc ~ ~ clubkick:2 hc ~', true),
  makeTest('x x y x ~ x y z', true),
  makeTest('subkick hh ~ hh clap hh subkick hh ~ hh subkick hh clap ~ hh hh', true),
  makeTest('sn ~ ~ sn ~ ~ sn ~', false),
  makeTest('bd cp bd bd cp bd bd cp', false),
  makeTest('kick kick ~ kick sn kick kick ~ crash ~ kick kick clap ~ kick crash', false),
  makeTest('bd hc db sn bd ~ bd bd cp ~ sn db bd db hc cp cp hc cp ~ bd cp db hc cp cs bd cp cp cp cs bd', true),
  makeTest('bd bd bd ~ ~ sn bd bd cp ~ bd ~ ~ sn cp cp', false),
  makeTest('hardkick:0 cy clap hardkick:3 cy hardkick:3 clap cy', false),
  makeTest('bd ~ sn bd ~ bd sn ~ bd ~ sn ~ ~ bd sn ~', false)
]
tests.forEach(t => strictEqual(detectBreakbeat(t.p), t.x))
