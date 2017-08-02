const assert = require('assert');

function makePermutations(words) {

  return [words];

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
  // This function is flawed.
  // TODO - Find intersection after a starting index
  const findIntersection = (letter = '', crossword = '') => {
    for (let i = 0; i < crossword.length; i += 1) {
      if (crossword[i] === letter) return i;
    }
    return -1;
  }

  const allPerms = makePermutations(words);
  let numXwords = 0;

  allPerms.forEach((permutation) => {

    /**
     * Do this for all permutations of `words`
     * 1. find an intersection between word1 and word2
     * - This intersection will be [0,0]
     * 2. Starting from intersectionIndex + 2, find an intersection between word2 and word3
     * - This intersection will be [0,intersectionIndex + 2ish]
     * 3. Check if word4 aligns with word1 and word3
     * - Starting from intersection2 + 2,
     */
    // let numXwords = 0;
    let intersection1;
    let intersection2;
    let intersection3;

    // const squareCoords1 = [0, 0];
    // let squareCoords2;
    // let squareCoords3;

    // Step 1
    for (let i = 0; i < permutation[0].length - 2; i += 1) {
      intersection1 = findIntersection(permutation[0][i], permutation[1])
      if (intersection1 !== -1) {
        intersection1 = [i, intersection1]
        console.log('intersection1', intersection1);

        // Step 2
        for (let j = intersection1[1] + 2; j < permutation[1].length; j += 1) {
          intersection2 = findIntersection(permutation[1][j], permutation[2]);
          if (intersection2 !== -1) {
            intersection2 = [j, intersection2];
            const yDiff = j - intersection1[1];

            console.log('intersection2', intersection2);

            // Step 3
            for (let k = intersection2[1] + 2; k < permutation[2].length; k += 1) {
              // This is only finding the first intersection. It needs a starting index or some shit.
              // Starting index would be k, right? - NO
              intersection3 = findIntersection(permutation[2][k], permutation[3]);
              const xDiff = k - intersection2[1];
              if (intersection3 !== -1) {
                intersection3 = [k, intersection3]

                console.log('intersection3', intersection3);

                // console.log(intersection1, intersection2, intersection3);

                // Check fourth intersection. If the letter of the first word matches the letter
                // of the fourth word, increment return value!
                const firstWordLetter = permutation[0][i + xDiff];
                const fourthWordLetter = permutation[3][intersection3[1] - yDiff];

                // console.log('xDiff', xDiff);
                // console.log('yDiff', yDiff);
                console.log('firstWordLetter', firstWordLetter, 'fourthwordletter', fourthWordLetter);

                if (firstWordLetter && firstWordLetter === fourthWordLetter) {
                  numXwords += 1;
                  // console.log('numXwords', numXwords)
                }
                // console.log('\n');
              }
            }
          }
        }
      }
      console.log('\n');
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
