const assert = require('assert')

function diffLetters (w1, w2) {
  return w1
    .split('')
    .reduce((acc, val, i) => acc += (val === w2[i]) ? 0 : 1, 0) // eslint-disable-line
}

function wordLadder (beginWord, endWord, wordList) {
  'use strict'

  function buildSeq (bw, ew, seq, wl, allSeq) {
    const nextWords = wl.filter(word => !seq.includes(word) && diffLetters(word, bw) === 1)

    if (nextWords.length === 0) allSeq.push([])
    if (nextWords.includes(ew)) allSeq.push(seq.concat(ew))

    nextWords.forEach(word => buildSeq(word, ew, seq.concat(word), wl, allSeq))

    return allSeq
  }

  const sequences = buildSeq(beginWord, endWord, [beginWord], wordList, [])

  return sequences
    .filter(seq => seq && seq.length > 0)
    .reduce((acc, val) => Math.min(acc, val.length), (sequences[0] || []).length)
}

let beginWord
let endWord
let wordList
let actual
let expected

console.time('wordLadder')

beginWord = 'hit'
endWord = 'log'
wordList = ['hot', 'dot', 'dog', 'lot', 'log', 'cog']
actual = wordLadder(beginWord, endWord, wordList)
expected = 4
assert.strictEqual(actual, expected)

// // "hit" -> "hot" -> "dot" -> "dog" -> "cog"

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

console.timeEnd('wordLadder')
console.log('All tests passed.')
