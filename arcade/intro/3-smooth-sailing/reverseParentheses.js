const assert = require('assert');

// Let's try looping!
function reverseParentheses(s) {
  'use strict';

  let modifiedStr = s;
  let capture;
  let openParenIndex;

  while (modifiedStr.indexOf('(') > -1) {
    openParenIndex = modifiedStr.lastIndexOf('(');
    capture = modifiedStr.slice(openParenIndex, modifiedStr.indexOf(')', openParenIndex) + 1);

    modifiedStr = modifiedStr.replace(capture, capture.split('').reverse().join('').replace(/\(|\)/g, ''));

  }

  return modifiedStr;
}

let s = 'a(bc)de';
console.log(reverseParentheses(s)); // acbde
s = 'a(bcdefghijkl(mno)p)q';
console.log(reverseParentheses(s)); // 'apmnolkjihgfedcbq'
s = 'co(de(fight)s)';
console.log(reverseParentheses(s)); // 'cosfighted'

s = 'The ((quick (brown) (fox) jumps over the lazy) dog)';
// The god quick xof( )nworb jumps over the lazy
console.log(reverseParentheses(s));
assert.equal(reverseParentheses(s), 'The god quick nworb xof jumps over the lazy');