const assert = require('assert');

function isBeautifulString(inputString) {
  'use strict';
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const counts = {};
  for (let i = 0; i < inputString.length; i += 1) {
    counts[inputString[i]] = (counts[inputString[i]]) ? counts[inputString[i]] + 1 : 1;
  }

  return alphabet.split('').every((letter, i) => (counts[letter] || 0) >= (counts[alphabet[i + 1]] || 0));
}

let s = 'bbbaacdafe';
let actual = isBeautifulString(s);
let expected = true;

assert.equal(actual, expected);

console.log('all tests passed');
