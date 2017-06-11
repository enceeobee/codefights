const assert = require('assert');

function diffLetters(w1, w2) {
  return w1
    .split('')
    .reduce((acc, val, i) => acc += (val === w2[i]) ? 0 : 1, 0);
}

function wordLadder(beginWord, endWord, wordList) {
  'use strict';
  const nextWordsMemo = {};
  wordList.forEach(word => nextWordsMemo[word] = {});

  function buildSeq(bw, ew, seq, wl, allSeq) {
    const nextWords = nextWordsMemo[bw][seq]
      || wl.filter(word => !seq.includes(word) && diffLetters(word, bw) === 1);

    if (!nextWordsMemo[bw][seq]) nextWordsMemo[bw][seq] = nextWords;

    // console.log('nextWords', nextWords);

    if (nextWords.length === 0) allSeq.push([]);
    if (nextWords.includes(ew)) allSeq.push(seq.concat(ew));

    nextWords.forEach(word => buildSeq(word, ew, seq.concat(word), wl, allSeq));

    return allSeq;
  }

  const sequences = buildSeq(beginWord, endWord, [beginWord], wordList, []);

  return sequences
    .filter(seq => seq && seq.length > 0)
    .reduce((acc, val) => Math.min(acc, val.length), (sequences[0] || []).length);
}


console.time('wordLadder');

let beginWord;
let endWord;
let wordList;
let actual;
let expected;

beginWord = 'hit';
endWord = 'log';
wordList = ['hot', 'dot', 'dog', 'lot', 'log', 'cog'];
actual = wordLadder(beginWord, endWord, wordList);
expected = 4;
assert.equal(actual, expected);

// "hit" -> "hot" -> "dot" -> "dog" -> "cog"

beginWord = 'hit';
endWord = 'cog';
wordList = ['hot', 'dot', 'dog', 'lot', 'log', 'cog'];
actual = wordLadder(beginWord, endWord, wordList);
expected = 5;
assert.equal(actual, expected);

beginWord = 'hit';
endWord = 'cog';
wordList = ['hot',
 'dot',
 'dog',
 'lot',
 'log'];
actual = wordLadder(beginWord, endWord, wordList);
expected = 0;
assert.equal(actual, expected);
//
beginWord = 'a';
endWord = 'c';
wordList = ['a', 'b', 'c'];
actual = wordLadder(beginWord, endWord, wordList);
expected = 2;
assert.equal(actual, expected);

// nextWordsMemo
// with:
// nextWordsMemo { a: [ 'b', 'c' ] }
// nextWordsMemo { a: [ 'b', 'c' ], b: [ 'c' ] }
// nextWordsMemo { a: [ 'b', 'c' ], b: [ 'c' ], c: [] }
// nextWordsMemo { a: [ 'b', 'c' ], b: [ 'c' ], c: [] }
//
// without
//nextWordsMemo { a: [ 'b', 'c' ] }
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
//nextWords [ 'b', 'c' ]
// nextWords [ 'c' ]
// nextWords []
// nextWords [ 'b' ]
// nextWords []


beginWord = 'hot';
endWord = 'dog';
wordList = ['hot',
 'dog'];
actual = wordLadder(beginWord, endWord, wordList);
expected = 0;
assert.equal(actual, expected);

wordList = ['hot',
 'cog',
 'dog',
 'tot',
 'hog',
 'hop',
 'pot',
 'dot'];
 expected = 3;
 actual = wordLadder(beginWord, endWord, wordList);

console.log('All tests passed.');
console.timeEnd('wordLadder');
