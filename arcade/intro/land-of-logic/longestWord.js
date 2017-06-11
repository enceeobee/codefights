const assert = require('assert');

function longestWord(text) {
  'use strict';
  const regex = /([\w]+)/ig;
  const words = [];

  let longest = '';
  let result;

  while (result = regex.exec(text)) {
    if (result[0].length > longest.length) longest = result[0];
  }

  return longest;
}

let text;
let actual;
let expected;

text = "Ready, steady, go!"
expected = 'steady';
actual = longestWord(text);
assert.equal(actual, expected);

console.log('All tests passed.');
