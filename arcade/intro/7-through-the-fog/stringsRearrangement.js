const assert = require('assert');

/**
 * Given an array of equal-length strings, check if it is possible to rearrange the strings in such a way
 * that after the rearrangement the strings at consecutive positions would differ by exactly one character.
 *
 * For each el in a, start building a sequence.
   If `a` string differs by one char, append it to the seq
   If we make it through all the remaining strings (i.e. the seq completes), we can return true
 *
 * @param a
 */
function stringsRearrangement(a) {
  function buildSeq(seq, remainingVals) {
    const currentVal = seq[seq.length - 1];
    // Could this be a problem? What if there are multiple remaining vals, and the zeroeth doesn't work, but the first does?
    // HA! That was indeed the issue...
    // const nextVal = remainingVals.filter(val => val.split('').filter((c, i) => c !== currentVal[i]).length === 1)[0];
    const nextVal = remainingVals.filter(val => val.split('').filter((c, i) => c !== currentVal[i]).length === 1).pop();
    const nextValIndex = remainingVals.indexOf(nextVal);

    // console.log('currentVal', currentVal, 'remainingVals', remainingVals, 'nextVal', nextVal);

    return (!nextVal) ? seq : buildSeq(seq.concat(nextVal), remainingVals.slice(0, nextValIndex).concat(remainingVals.slice(nextValIndex + 1)));
  }

  return a.some((el, i) => buildSeq([el], a.slice(0, i).concat(a.slice(i + 1))).length === a.length);
}

let a;
let actual;
let expected;

a = ['a', 'b', 'a'];
actual = stringsRearrangement(a);
expected = true;
assert.equal(actual, expected);

a = ['aaa', 'aaa', 'aaa'];
actual = stringsRearrangement(a);
expected = false;
assert.equal(actual, expected);

a = ['aaa', 'aaa', 'aaa', 'aba', 'aba', 'aac'];
actual = stringsRearrangement(a);
expected = true;
assert.equal(actual, expected);

a = ['aba', 'bbb', 'bab'];
actual = stringsRearrangement(a);
expected = false;
assert.equal(actual, expected);

// // This must be rearranged; bb -> ab -> aa (or the reverse)
a = ['ab', 'bb', 'aa'];
actual = stringsRearrangement(a);
expected = true;
assert.equal(actual, expected);

a = ['q', 'q'];
actual = stringsRearrangement(a);
expected = false;
assert.equal(actual, expected);

a = ['zzzzab', 'zzzzbb', 'zzzzaa'];
actual = stringsRearrangement(a);
expected = true;
assert.equal(actual, expected);

a = ['zzzzab', 'zzzzbb', 'zzzzcb'];
actual = stringsRearrangement(a);
expected = true;
assert.equal(actual, expected);

a = ['ab', 'ad', 'ef', 'eg'];
actual = stringsRearrangement(a);
expected = false;
assert.equal(actual, expected);

a = ['abc', 'abx', 'axx', 'abc'];
actual = stringsRearrangement(a);
expected = false;
assert.equal(actual, expected);

a = ['abc', 'abx', 'axx', 'abx', 'abc'];
actual = stringsRearrangement(a);
expected = true;
assert.equal(actual, expected);

a = ['abc', 'axx', 'abx', 'abx', 'abc'];
actual = stringsRearrangement(a);
expected = true;
assert.equal(actual, expected);

a = ['f', 'g', 'a', 'h'];
actual = stringsRearrangement(a);
expected = true;
assert.equal(actual, expected);

a = ['far', 'bar', 'far', 'bar', 'rar', 'raz'];
actual = stringsRearrangement(a);
expected = true;
assert.equal(actual, expected);

console.log('All tests passed.');
