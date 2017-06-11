const assert = require('assert');

function deleteDigit(n) {
  return String(n).split('').reduce((acc, val) => (
    Math.max(acc, Number(String(n).replace(val, '')))
  ), 0);
}

let n = 152;
let expected = 52;
let actual = deleteDigit(n);
assert.equal(actual, expected);

console.log('All tests passed.');
