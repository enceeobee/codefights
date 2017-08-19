const assert = require('assert');

function isSubstitutionCipher(string1 = '', string2 = '') {
  if (string1 === string2) return true;

  const bUsed = {};
  const aUsed = {};
  let   s1Letter = '';
  let   s2Letter = '';
  let   letterHasBeenUsed = false;
  let   letterHasNewValue = false;

  for (let i = 0; i < string1.length; i += 1) {
    s1Letter = string1[i];
    s2Letter = string2[i];

    letterHasBeenUsed = (aUsed[s1Letter] || bUsed[s2Letter]);
    letterHasNewValue = (aUsed[s1Letter] !== s2Letter || bUsed[s2Letter] !== s1Letter);

    if (letterHasBeenUsed && letterHasNewValue) return false;

    aUsed[s1Letter] = s2Letter;
    bUsed[s2Letter] = s1Letter;

  }
  return true;
}

test = (s1, s2, expected) => assert.equal(isSubstitutionCipher(s1, s2), expected);

test('aacb', 'aabc', true);// b=c and c=b, so the cipher alphabet would start acb...
test('aa', 'bc', false);// a=b and a=c -- BUST
test('aaxxaaz', 'aazzaay', true);
test('aaxyaa', 'aazzaa', false);
test('aabc', 'aacb', true);
test('dccd', 'zzxx', false);
test('ddcc', 'zzxx', true);
test('aaaabbbbcc', 'cccccccccc', false);
test('abcdefg', 'hijklmn', true);
test('aaabbbccc', 'aaabbbccc', true);
test('a', 'a', true);
test('a', 'b', true);
test('ggfgh', 'ddsdf', true);

console.log('All tests passed.');
