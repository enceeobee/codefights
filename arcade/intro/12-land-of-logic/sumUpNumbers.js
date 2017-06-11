const assert = require('assert');

function sumUpNumbers(s) {
  return (s.match(/([\d]+)/g) || []).reduce((acc, val) => acc + Number(val), 0);
}

let s;
let actual;
let expected;

s = '2 apples, 12 oranges';
expected = 14;
actual = sumUpNumbers(s);
assert.equal(actual, expected);

console.log('All tests passed.');
