const assert = require('assert');

function lineEncoding(s) {
  'use strict';
  let numLetters = 1;
  let encodedString = '';

  for (let i = 0; i < s.length; i += 1) {
    if (s[i] === s[i + 1]) {
      numLetters += 1;
    } else {
      encodedString += ((numLetters > 1) ? numLetters : '') + s[i];
      numLetters = 1;
    }
  }

  return encodedString;
}

let s = 'aabbbc';
let expected = '2a3bc';
let actual = lineEncoding(s);
assert.equal(actual, expected);

s = 'abbcabb';
expected = 'a2bca2b';
actual = lineEncoding(s);
assert.equal(actual, expected);

s = 'abcd';
expected = 'abcd';
actual = lineEncoding(s);
assert.equal(actual, expected);

console.log('All tests passed.');
