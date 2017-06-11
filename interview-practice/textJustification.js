const assert = require('assert');

function textJustification(words, L) {
  'use strict';
  const lines = [];

  let line = '';
  words.forEach(word => {
    if (line === '') {
      line = word;
    } else if ((line + word).length < L) {
      line = `${line} ${word}`.trim();
    } else {
      lines.push(line);
      line = word;
    }
  });

  // Add any remaining lines
  lines.push(line.trim());

  // Now, justify
  const justified = lines.map((line, i) => {
    // Handle single words, or last line
    if (!/ /.test(line) || i === lines.length - 1) return line + ' '.repeat(L - line.length);

    let spaceReplace = ' ';
    let replaceRegex;

    while (line.length < L) {
      replaceRegex = new RegExp(`\\S${spaceReplace}\\S`);

      if (!replaceRegex.test(line)) {
        spaceReplace += ' ';
        replaceRegex = new RegExp(`\\S${spaceReplace}\\S`);
      }
      line = line.replace(replaceRegex, match => match.replace(spaceReplace, `${spaceReplace} `));
    }
    return line;
  });

  return justified;
}

let words = ['This', 'is', 'an', 'example', 'of', 'text', 'justification.'];
let L = 16;
let expected = ["This    is    an",
                "example  of text",
                "justification.  "];
let actual = textJustification(words, L);
assert.deepEqual(actual, expected);

// console.log(textJustification(words, L));
// console.log(textJustification([''], L));

words = ["Two", "words."]
L =11;
expected = ["Two words. "];
actual = textJustification(words, L);
// assert.deepEqual(actual, expected);


words = ['four', 'butt', 'a', 'la', 'the', 'moss'];
L = 4;
// console.log(textJustification(words, L));
expected =  ['four', 'butt', 'a la', 'the ', 'moss' ];
actual = textJustification(words, L);
// assert.deepEqual(actual, expected);


words = ["Two",
 "words."];
L = 10;
expected = ["Two words."];
actual = textJustification(words, L);
assert.deepEqual(actual, expected);


words = ["Two",
 "words."];
L = 9;
expected = ["Two      ",
 "words.   "];
actual = textJustification(words, L);
assert.deepEqual(actual, expected);


words = ["a",
 "b",
 "b",
 "longword"];
L = 8;
expected = ["a   b  b",
 "longword"];
actual = textJustification(words, L);
assert.deepEqual(actual, expected);


words = ["vba",
 "gaff",
 "ye",
 "gs",
 "cthj",
 "hf",
 "vetjj",
 "jm",
 "k",
 "f",
 "cgbf",
 "zzz"];
L = 8;
expected = ["vba gaff",
 "ye    gs",
 "cthj  hf",
 "vetjj jm",
 "k f cgbf",
 "zzz     "];
actual = textJustification(words, L);
assert.deepEqual(actual, expected);


words = ["Given",
 "an",
 "array",
 "of",
 "words",
 "and",
 "a",
 "length"];
L = 9;
expected = ["Given  an",
 "array  of",
 "words and",
 "a length "];
actual = textJustification(words, L);
assert.deepEqual(actual, expected);

words = ["Extra",
 "spaces",
 "between",
 "words",
 "should",
 "be",
 "distributed",
 "as",
 "evenly",
 "as",
 "possible"];
 L = 20;
//  console.log(textJustification(words, L));
expected = [ 'Extra spaces between',
  'words    should   be',
  'distributed       as',
  'evenly as possible  ' ];
actual = textJustification(words, L);
assert.deepEqual(actual, expected);


words = [""];
L = 2;
expected = ["  "];
actual = textJustification(words, L);
assert.deepEqual(actual, expected);


words = ["a"];
L = 1;
expected = ["a"];
actual = textJustification(words, L);
assert.deepEqual(actual, expected);


words = ["a"];
L = 2;
expected = ["a "];
actual = textJustification(words, L);
assert.deepEqual(actual, expected);


words = ["a",
 "b",
 "c",
 "d",
 "e"];
L = 1;
expected = ["a",
 "b",
 "c",
 "d",
 "e"];
actual = textJustification(words, L);
assert.deepEqual(actual, expected);


words = ["a",
 "b",
 "c",
 "d",
 "e"];
L = 3;
expected = ["a b",
 "c d",
 "e  "];
actual = textJustification(words, L);
assert.deepEqual(actual, expected);


words = ['fuck'];
L =

console.log('All tests passed');