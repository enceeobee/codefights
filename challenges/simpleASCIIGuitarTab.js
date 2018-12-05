const assert = require('assert')

function simpleASCIIGuitarTab (notes) {
  const fretNotes = generateFretNotes()
  const tab = [
    'e ||',
    'B ||',
    'G ||',
    'D ||',
    'A ||',
    'E ||'
  ]

  let string
  let fretted

  notes.split(' ').forEach((note, i, a) => {
    fretted = fretNotes[note]
    string = fretted[0] - 1

    for (let j = 0; j < 6; j++) {
      tab[j] = tab[j].slice(0, -1) + '-' + (string === j ? fretted[1] : '-') + (i === a.length - 1 ? '-' : '') + tab[j].slice(-1)
    }
  })

  return tab
}

function generateFretNotes () {
  const intervals = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
  const fretNotes = {}
  let octave = 2
  let noteIndex = 4 // 'E'

  for (let string = 6; string > 0; string--) {
    let maxFrets = 5
    if (string === 3) maxFrets = 4
    if (string === 1) maxFrets = 24

    for (let i = 0; i < maxFrets; i++) {
      fretNotes[intervals[noteIndex] + octave] = [string, i]
      noteIndex = (noteIndex === intervals.length - 1) ? 0 : noteIndex + 1
      if (noteIndex === 0) octave++
    }
  }

  return fretNotes
}

const makeTest = (n, x) => ({ n, x })
const tests = [
  makeTest('G4',
    ['e |-3-|',
      'B |---|',
      'G |---|',
      'D |---|',
      'A |---|',
      'E |---|']),

  makeTest('A2',
    ['e |---|',
      'B |---|',
      'G |---|',
      'D |---|',
      'A |-0-|',
      'E |---|']),

  makeTest('E2 G3 B3 E4 B3 G3',
    [
      'e |-------0-----|',
      'B |-----0---0---|',
      'G |---0-------0-|',
      'D |-------------|',
      'A |-------------|',
      'E |-0-----------|']),

  makeTest('D4 C#4 B3 A3 G3 F#3 E3 D3',
    ['e |-----------------|',
      'B |-3-2-0-----------|',
      'G |-------2-0-------|',
      'D |-----------4-2-0-|',
      'A |-----------------|',
      'E |-----------------|']),

  makeTest('E2 F2 F#2 G2 G#2 A2 A#2 B2 C3 C#3 D3 D#3 E3 F3 F#3 G3 G#3 A3 A#3 B3 C4 C#4 D4 D#4 E4 F4 F#4 G4 G#4',
    ['e |-------------------------------------------------0-1-2-3-4-|',
      'B |---------------------------------------0-1-2-3-4-----------|',
      'G |-------------------------------0-1-2-3---------------------|',
      'D |---------------------0-1-2-3-4-----------------------------|',
      'A |-----------0-1-2-3-4---------------------------------------|',
      'E |-0-1-2-3-4-------------------------------------------------|']),

  makeTest('C3 C3 G3 G3 A3 D#3', ['e |-------------|',
    'B |-------------|',
    'G |-----0-0-2---|',
    'D |-----------1-|',
    'A |-3-3---------|',
    'E |-------------|']),

  makeTest('E2 E2 E3 E4 F#4 G#4 E2 G#4 G#3',
    ['e |-------0-2-4---4---|',
      'B |-------------------|',
      'G |-----------------1-|',
      'D |-----2-------------|',
      'A |-------------------|',
      'E |-0-0---------0-----|'])
]
tests.forEach(t => assert.deepStrictEqual(simpleASCIIGuitarTab(t.n), t.x))
