const assert = require('assert');

function makePermutations(words) {
  var permArr = [],
    usedChars = [];

  function permute(input) {
    var i, ch;
    for (i = 0; i < input.length; i++) {
      ch = input.splice(i, 1)[0];
      usedChars.push(ch);

      if (input.length == 0) permArr.push(usedChars.slice());

      permute(input);
      input.splice(i, 0, ch);
      usedChars.pop();
    }
    return permArr
  };

  return permute(words);
}

function crosswordFormation(words) {
  // const allPerms = makePermutations(words);
  const allPerms = [words];
  let numXwords = 0;

  allPerms.forEach((permutation) => {
    const [firstWord, secondWord, thirdWord, fourthWord] = permutation;
    let indexOfFwLetterInSw = -1;
    // Check if each letter in first word exists in second word
    for (let fwi = 0; fwi < firstWord.length; fwi += 1) {
      indexOfFwLetterInSw = secondWord.indexOf(firstWord[fwi], indexOfFwLetterInSw + 1);
      if (indexOfFwLetterInSw > -1) {

      }
    }
  });

  return numXwords;
}

const test = (words, expected) => assert.equal(crosswordFormation(words), expected);

// TEST tests:
// test(['crossword', 'formation', 'something', 'square'], 1);
// test(['crossword', 'formation', 'square', 'something'], 1);
// test(['crossword', 'square', 'something', 'formation'], 1);

// test(['formation', 'crossword', 'square', 'something'], 1);
// test(['formation', 'crossword', 'something', 'square'], 1);
// test(['square', 'crossword', 'formation', 'something'], 1);

// test(['square', 'crossword', 'something', 'formation'], 0);
// End test tests

// test(['crossword', 'square', 'formation', 'something'], 6);
// test(['anaesthetist',
//  'thatch',
//  'ethnics',
//  'sabulous'], 0);
test(['eternal',
 'texas',
 'chainsaw',
 'massacre'], 4);
// test(['africa',
//  'america',
//  'australia',
//  'antarctica'], 62);
// test(['phenomenon',
//  'remuneration',
//  'particularly',
//  'pronunciation'], 62);
// test(['onomatopoeia',
//  'philosophical',
//  'provocatively',
//  'thesaurus'], 20);

console.log('All tests passed.');
