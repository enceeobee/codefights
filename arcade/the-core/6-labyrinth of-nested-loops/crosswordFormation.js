const assert = require('assert');

function crosswordFormation(words) {
  const findIntersection = (letter = '', crossword = '') => {
    for (let i = 0; i < crossword.length; i += 1) {
      if (crossword[i] === letter) return i;
    }
    return -1;
  }

  /**
   * Do this for all permutations of `words`
   * 1. find an intersection between word1 and word2
   * - This intersection will be [0,0]
   * 2. Starting from intersectionIndex + 2, find an intersection between word2 and word3
   * - This intersection will be [0,intersectionIndex + 2ish]
   * 3. Check if word4 aligns with word1 and word3
   * - Starting from intersection2 + 2,
   */
  let numXwords = 0;
  let intersection1;
  let intersection2;
  let intersection3;

  const squareCoords1 = [0, 0];
  let squareCoords2;
  let squareCoords3;

  // Step 1
  for (let i = 0; i < words[0].length; i += 1) {
    intersection1 = findIntersection(words[0][i], words[1])
    if (intersection1 !== -1) {
      intersection1 = [i, intersection1]
      // console.log('first intersection', intersection1);

      // Step 2
      for (let j = intersection1[1] + 2; j < words[1].length; j += 1) {
        intersection2 = findIntersection(words[1][j], words[2]);
        if (intersection2 !== -1) {
          intersection2 = [j, intersection2];
          const yDiff = j - intersection1[1];
          squareCoords2 = [0, yDiff]

          // console.log('testIntersection2', testIntersection2);
          // console.log('second intersection', intersection2);

          // Step 3
          for (let k = intersection2[1] + 2; k < words[2].length; k += 1) {
            intersection3 = findIntersection(words[2][k], words[3]);
            const xDiff = k - intersection1[0];
            if (intersection3 !== -1) {
              intersection3 = [k, intersection3]
              // squareCoords3 = [intersection3[1] - k, squareCoords2[1]];
              squareCoords3 = [xDiff, squareCoords2[1]];
              console.log(intersection1, intersection2, intersection3);
              console.log(squareCoords1, squareCoords2, squareCoords3);
              // console.log('diff in x from first word to fourth word is', intersection3[0] - intersection2[1])

              // Check fourth intersection. If the letter of the first word matches the letter
              // of the fourth word, BOOM!
              const firstWordLetter = words[0][i + xDiff];
              const fourthWordLetter = words[3][words[3].length - yDiff - 1];

              // console.log('diff in Y from first word to third word is', j - intersection1[1])
              console.log('diff in Y from first word to third word is', yDiff);
              console.log('diff in X from second word to fourth word is', xDiff);
              // console.log('Thus, the fourth intersection letter is', words[0][i + intersection3[1] - k])
              console.log('firstWordLetter', firstWordLetter, 'fourthwordletter', fourthWordLetter);
              console.log('\n');
              // console.log('intersection1', intersection1);
              // console.log('intersection2', intersection1);
              // console.log('intersection3', intersection3);
              // [1,2], [7,1], [3,5] ([3,0])
              // TODO - Check fourth intersection also
              let doesFourthIntersectionWork = false;
              if ('something') {
                doesFourthIntersectionWork = true;
              }
              if (doesFourthIntersectionWork) numXwords += 1;
            }
          }
        }
      }
    }
  }
  return numXwords;
}

const test = (words, expected) => assert.equal(crosswordFormation(words), expected);

test(['crossword', 'formation', 'something', 'square'], 6);
// test(['crossword', 'square', 'formation', 'something'], 6);
// test(['anaesthetist',
//  'thatch',
//  'ethnics',
//  'sabulous'], 0);
// test(['eternal',
//  'texas',
//  'chainsaw',
//  'massacre'], 4);
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
