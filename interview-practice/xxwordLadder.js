const assert = require('assert');

function diffLetters(w1, w2) {
  return w1
    .split('')
    .reduce((acc, val, i) => acc += (val === w2[i]) ? 0 : 1, 0);
}

function wordLadder(bw, ew, wl) {
  'use strict';

  // "hit" -> "hot" -> "dot" -> "dog" -> "cog"
  function numSteps(beginWord, endWord, wordList, steps, usedWords) {

    console.log('beginWord', beginWord);
    console.log('steps', steps);

    if (beginWord === endWord) return steps;

    usedWords[beginWord] = beginWord;

    let nextWords = wordList
      .filter(word => !usedWords[word] && diffLetters(word, beginWord) === 1);

    console.log('nextWords', nextWords);

    // if (!nextWords.includes(endWord)) {
      // steps += 1;
      for (let i = 0; i < nextWords.length; i += 1) {
        return numSteps(nextWords[i], endWord, wordList, steps + 1, usedWords);
      }
    // }
    return 0;
  }

  return numSteps(bw, ew, wl, 0, {});

  // console.log('FOUND IT');
  // return steps + 1;

  // if (nextWords.length === 0) return 0;

  // steps += 1;

  // return nextWords.forEach(word => wordLadder(word, endWord, wordList));
  // for (let i = 0; i < nextWords.length; i += 1) {
  //   steps += wordLadder(nextWords[i], endWord, wordList);
  // }
}

// function wordLadder(beginWord, endWord, wordList, steps) {
//   'use strict';
//
//   if (steps == undefined) steps = 0;
//
//   console.log('beginWord', beginWord);
//   console.log('steps', steps);
//
//   if (beginWord === endWord) return steps;
//
//   usedWords[beginWord] = beginWord;
//
//   let nextWords = wordList
//     .filter(word => !usedWords[word] && diffLetters(word, beginWord) === 1);
//
//   console.log('nextWords', nextWords);
//
//   if (!nextWords.includes(endWord)) {
//     // steps += 1;
//     for (let i = 0; i < nextWords.length; i += 1) {
//       return wordLadder(nextWords[i], endWord, wordList, steps + 1);
//     }
//   }
//
//   // console.log('FOUND IT');
//   // return steps + 1;
//
//   // if (nextWords.length === 0) return 0;
//
//   // steps += 1;
//
//   // return nextWords.forEach(word => wordLadder(word, endWord, wordList));
//   // for (let i = 0; i < nextWords.length; i += 1) {
//   //   steps += wordLadder(nextWords[i], endWord, wordList);
//   // }
// }

let beginWord;
let endWord;
let wordList;
let actual;
let expected;

// "hit" -> "hot" -> "dot" -> "dog" -> "cog"
beginWord = 'hit';
endWord = 'cog';
wordList = ['hot', 'dot', 'dog', 'lot', 'log', 'cog'];
actual = wordLadder(beginWord, endWord, wordList);
expected = 5;
assert.equal(actual, expected);

// wordList = ['hot',
//  'dot',
//  'dog',
//  'lot',
//  'log'];
// actual = wordLadder(beginWord, endWord, wordList);
// expected = 0;

// beginWord = 'a';
// endWord = 'c';
// wordList = ['a',
//  'b',
//  'c'];
// actual = wordLadder(beginWord, endWord, wordList);
// expected = 2;
//
beginWord = 'hot';
endWord = 'dog';
wordList = ['hot',
 'dog'];
actual = wordLadder(beginWord, endWord, wordList);
expected = 0;
assert.equal(actual, expected);
//
// wordList = ['hot',
//  'cog',
//  'dog',
//  'tot',
//  'hog',
//  'hop',
//  'pot',
//  'dot'];
//  expected = 3;
//  actual = wordLadder(beginWord, endWord, wordList);

console.log('All tests passed.');
