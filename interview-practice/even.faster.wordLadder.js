const assert = require('assert')

function offByOne (w1, w2) {
  'use strict'
  let numOff = 0
  for (let i = 0; i < w1.length; i += 1) {
    if (w1[i] !== w2[i]) numOff += 1
    if (numOff > 1) return false
  }
  return numOff === 1
}

function wordLadder (beginWord, endWord, wordList) {
  'use strict'

  function buildSeq (bw, ew, seq, wl, allSeq) {
    const nextWords = {}

    for (let i = 0; i < wl.length; i += 1) {
      if (!seq.includes(wl[i]) && offByOne(wl[i], bw)) nextWords[wl[i]] = wl[i]
    }

    if (nextWords[ew]) allSeq.push(seq.concat(ew))
    else {
      for (let nextWord in nextWords) {
        buildSeq(nextWord, ew, seq.concat(nextWord), wl, allSeq)
      }
    }

    return allSeq
  }

  const sequences = buildSeq(beginWord, endWord, [beginWord], wordList, [])

  return sequences
    .reduce((acc, val) => Math.min(acc, val.length), (sequences[0] || []).length)
}

console.time('wordLadder')

let beginWord
let endWord
let wordList
let actual
let expected

beginWord = 'hit'
endWord = 'log'
wordList = ['hot', 'dot', 'dog', 'lot', 'log', 'cog']
actual = wordLadder(beginWord, endWord, wordList)
expected = 4
assert.strictEqual(actual, expected)

// // 'hit' -> 'hot' -> 'dot' -> 'dog' -> 'cog'

beginWord = 'hit'
endWord = 'cog'
wordList = ['hot', 'dot', 'dog', 'lot', 'log', 'cog']
actual = wordLadder(beginWord, endWord, wordList)
expected = 5
assert.strictEqual(actual, expected)

beginWord = 'hit'
endWord = 'cog'
wordList = ['hot',
  'dot',
  'dog',
  'lot',
  'log']
actual = wordLadder(beginWord, endWord, wordList)
expected = 0
assert.strictEqual(actual, expected)
//
beginWord = 'a'
endWord = 'c'
wordList = ['a', 'b', 'c']
actual = wordLadder(beginWord, endWord, wordList)
expected = 2
assert.strictEqual(actual, expected)

// nextWordsMemo
// with:
// nextWordsMemo { a: [ 'b', 'c' ] }
// nextWordsMemo { a: [ 'b', 'c' ], b: [ 'c' ] }
// nextWordsMemo { a: [ 'b', 'c' ], b: [ 'c' ], c: [] }
// nextWordsMemo { a: [ 'b', 'c' ], b: [ 'c' ], c: [] }
//
// without
// nextWordsMemo { a: [ 'b', 'c' ] }
// nextWordsMemo { a: [ 'b', 'c' ], b: [ 'c' ] }
// nextWordsMemo { a: [ 'b', 'c' ], b: [ 'c' ], c: [] }
// nextWordsMemo { a: [ 'b', 'c' ], b: [ 'c' ], c: [] }
// nextWordsMemo { a: [ 'b', 'c' ], b: [ 'c' ], c: [] }

// nextWords
// with:
// nextWords [ 'b', 'c' ]
// nextWords [ 'c' ]
// nextWords []
// nextWords []
//
// without
// nextWords [ 'b', 'c' ]
// nextWords [ 'c' ]
// nextWords []
// nextWords [ 'b' ] // this happens because it's a difference sequence
// nextWords []

beginWord = 'hot'
endWord = 'dog'
wordList = ['hot',
  'dog']
actual = wordLadder(beginWord, endWord, wordList)
expected = 0
assert.strictEqual(actual, expected)

wordList = ['hot',
  'cog',
  'dog',
  'tot',
  'hog',
  'hop',
  'pot',
  'dot']
expected = 3
actual = wordLadder(beginWord, endWord, wordList)

beginWord = 'teach'
endWord = 'place'
wordList = ['peale',
  'wilts',
  'place',
  'fetch',
  'purer',
  'pooch',
  'peace',
  'poach',
  'berra',
  'teach',
  'rheum',
  'peach']
actual = wordLadder(beginWord, endWord, wordList)
expected = 4
assert.strictEqual(actual, expected)

console.timeEnd('wordLadder')
console.log('All tests passed.')
