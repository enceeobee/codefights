const assert = require('assert')

function convertString (s, t) {
  if (t.length > s.length) return false

  let lastLettersIndex
  let thisLettersIndex
  for (let i = 0; i < t.length; i += 1) {
    thisLettersIndex = s.indexOf(t[i], lastLettersIndex || 0)

    if (thisLettersIndex === -1) return false
    if (lastLettersIndex && lastLettersIndex > thisLettersIndex) return false

    lastLettersIndex = thisLettersIndex
  }
  return true

  // Works, but exceeds time limit
  /**
    const regexString = t.split('').reduce((acc, val) => {
      return `${acc}[${val}](.+)?`;
    }, '');
    return new RegExp(regexString).test(s);
  */
}

let s
let t
let expected
let actual

// s = 'ceoydefthf5iyg5h5yts';
// t = 'codefights';
// expected = true;
// actual = convertString(s, t);
// assert.strictEqual(actual, expected);

// s = 'addbyca';
// t = 'abcd';
// expected = false;
// actual = convertString(s, t);
// assert.strictEqual(actual, expected);

s = 'gooddaywithcoffee17righteh'
t = 'gowithcoffe1e'
expected = true
actual = convertString(s, t)
assert.strictEqual(actual, expected)

console.log('All tests passed.')
