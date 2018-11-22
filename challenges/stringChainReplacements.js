/* eslint-disable */
const assert = require('assert')

/*
  * Let's try always setting the last char equal to the
  * first char of the next word, unless the next word
  * is one char and is equal to the first char of the next
  * next word
  *
  * ALLOW ME TO REPHRASE
  *
  * Set the last char of the last word equal to the first char
  * of the current word
  */

/*
  * If we have one-chars in a row, they all need to become
  * the same letter, so having a record of the most common
  * starts and ends helps.
  *
  * So really, we keep going through single-chars until we find
  * two back-to-back, and change the whole string to the back-to-back
  * value. If we don't have back-to-backs, see if the word before the
  * string ends with one of the chars, or the next word starts with
  * one of the string chars. If so, the string all becomes that value.
  *
  * If the word before the string and the word after the string both
  * link with the same letter, it's a compelling case to use that
  * letter as the string replacement, but it'd have to be fewer
  * replacements than if the whole string converted to a letter contained
  * within the string.
  */

/*
  * If there isn't a word that begins with the current last letter,
  * change that last letter to be the first letter of the next word, unless
  * the last word ends with that letter
  *
  *
  */
/*
function stringChainReplacements (stringArray) {
  const strings = stringArray.map(w => (w.length === 1) ? w : w[0] + w.slice(-1))
  let replacements = 0

  const endingIn = {
    c: [0, 3],
    a: [1],
    b: [2],
    f: [4],
    g: [5],
    i: [6]
  }
  const beginningWith = {
    a: [0, 1],
    b: [2],
    c: [3],
    d: [4],
    g: [5, 6]
  }
  const letters = {
    a: {
      included: 2,
      begins: [0, 1],
      ends: [1]
    }
  }

  // const mostStarts = 'g'nextWordIsOneChar
  // const mostEnds = 'c'

  replacements = strings.reduce((acc, val, i) => {
    if (i >= strings.length - 1) return acc

    let nextWord = strings[i + 1]
    let nextWordIsOneChar = nextWord.length === 1
    let nextWordEqualsNextFirstChar = (i < strings.length - 2) && (nextWord === strings[i + 2][0])

    console.log('i', i, 'nextWord', nextWord, nextWordIsOneChar, nextWordEqualsNextFirstChar)

    if (!(nextWordIsOneChar && nextWordEqualsNextFirstChar)) acc++

    return acc
  }, 0)

  // So it's this number minus how many single-char-chains there are with
  // a valid letter (i.e. that can chain to the prev or next word)

  return replacements
}
*/

// function stringChainReplacements (strings) {
//   // const strings = stringArray.map(w => (w.length === 1) ? w : w[0] + w.slice(-1))
//   let lastMultiLetterIndex = -1
//   let nextMultiLetterIndex = -1

//   let mismatches = strings.reduce((acc, val, i) => {
//     if (i >= strings.length - 1) return acc
//     if (val.slice(-1) !== strings[i + 1][0]) acc++

//     return acc
//   }, 0)

//   // Now determine if we have single words that match a prev or next word's letter
//   // If it matches one or the other, subtract one from mismatches (i.e. ac, a, b, c, df; 'c' matches prev word)
//   // If it matches both, subtract two (i.e. ac, a, b, c, cf; 'c' matches both words)
//   //
//   // Maybe we determine which letter is most common in the chain, then use that as the substitution
//   // e.g. -> ac, a, b, c, df; 'c' is most common (last letter of first word, and in the single-letter chain)

//   console.log('mismatches', mismatches)

//   // This handles subtracting mismatches, but we also need to add mismatches
//   for (let i = 0; i < strings.length; i++) {
//     // Seek the next multi-letter word, and check matches
//     for (let j = i + 1; j < strings.length; j++) {
//       if (strings[j].length > 1) {
//         nextMultiLetterIndex = j
//         break
//       }
//     }

//     if (strings[i].length > 1) {
//       lastMultiLetterIndex = i
//     } else {
//       const hasLastMultiLetter = lastMultiLetterIndex > -1

//       if (hasLastMultiLetter) {
//         const lettersMatch = strings[i] === strings[lastMultiLetterIndex].slice(-1)
//         const lettersAreConsecutive = i - lastMultiLetterIndex === 1
//         if (lettersMatch && !lettersAreConsecutive) {
//           console.log(strings[i], 'matches last letter of', strings[lastMultiLetterIndex])
//           mismatches--
//         }
//       }

//       if (nextMultiLetterIndex > 0) {
//         if (strings[i] === strings[nextMultiLetterIndex][0] && (nextMultiLetterIndex - i > 1)) {
//           console.log(strings[i], 'matches first letter of', strings[nextMultiLetterIndex])
//           // If we already have a single word matching the lastMultiLetter word, increase instead of decrease!
//           // Goddammit, this is where it gets confusing.
//           mismatches--
//         }
//         if (strings[lastMultiLetterIndex] && strings[lastMultiLetterIndex].slice(-1) === strings[nextMultiLetterIndex][0] && lastMultiLetterIndex !== nextMultiLetterIndex) {
//           console.log('last letter of', strings[lastMultiLetterIndex], 'matches first letter of', strings[nextMultiLetterIndex])
//           mismatches--
//         }
//       }
//     }
//   }

//   return mismatches
// }

// const isValidChain = strs => (
//   strs.every((s, i) => (i >= strs.length - 1) || s.slice(-1) === strs[i + 1][0])
// )

// function isValidChain (strings) {
//   return strings.every((s, i) => {
//     // if (i >= strings.length - 1) return true
//     // return s[s.length - 1] === strings[i + 1][0]
//     return (i >= strings.length - 1) || s.slice(-1) === strings[i + 1][0]
//   })
// }

// console.log('isValidChain', isValidChain(['abc', 'cde', 'efg', 'ghi']))

function stringChainReplacements (strings) {
  let replacements = 0
  let lastGroupIndex = -1
  let nextGroupIndex = -1

  // let replacements = strings.reduce((acc, val, i) => {
  //   if (i >= strings.length - 1) return acc
  //   if (val.slice(-1) !== strings[i + 1][0]) acc++

  //   return acc
  // }, 0)

  // When we come across a single letter, find the string of
  // multi, s, i, n, g, l, e, multi and determine which letters
  // have the most occurrences (in this case 'i', last letter of multi as well as a single 'i')

  // If a single letter has the strongest value, every other letter will be replaced with that
  // If two letters are tied, it doesn't really matter (i.e. makeTest(['knplki', 'i', 'x', 'g', 'gifguc'], 3),)

  const findNextGroup = (startIndex) => {
    for (let i = startIndex; i < strings.length; i++) {
      if (strings[i].length > 1) return i
    }
  }

  let inSingleString = false
  strings.forEach((str, i) => {
    nextGroupIndex = findNextGroup(i)

    /*
      Scenarios:
        * single -> group; if letter isn't strongestLetter, increment replacements
        * single -> single; if letter isn't strongestLetter, increment replacements
        * group -> group; if letters don't match, increment replacements
        * group -> single; determine the single string and strongestLetter; if group[last] isn't strongestLetter, increment replacements
    */

    if (str.length > 1) {
      lastGroupIndex = i
    }
  })

  return replacements
}

const makeTest = (s, x) => ({ s, x })
const tests = [
  makeTest(['ac', 'df', 'gi'], 2), // These are just `return numMismatches`
  makeTest(['abc', 'def', 'ghi'], 2),
  makeTest(['ac', 'a', 'b', 'c', 'df', 'g', 'gi'], 4), // So the key is to get numMismatches + singleLetterShit
  makeTest(['abc', 'a', 'b', 'c', 'def', 'g', 'ghi'], 4),
  makeTest(['abc', 'cde', 'efg', 'ghi'], 0),
  makeTest(['q', 'p', 'r', 'qrpst', 'tv', 'a'], 3),
  makeTest(['q', 'p', 'r', 'qt', 'tv', 'a'], 3),
  makeTest(['abc', 'cde', 'fgh'], 1),
  makeTest(['abcdefg', 'abcdefg', 'abcdefg'], 2),
  makeTest(['ab', 'cd', 'ef'], 2),
  makeTest(['xyz', 'a', 'zyx'], 1),
  makeTest(['abc', 'de', 'eghijklmnop'], 1),

  makeTest(['xt', 'x', 'fqrhsqxwt', 'tontq', 'nk', 'knplki', 'i', 'x', 'g', 'gifguc', 'e'], 7),
  makeTest(['knplki', 'i', 'x', 'g', 'gifguc'], 3),
  makeTest(['knplki', 'i', 'g', 'g', 'gifguc'], 2),
  makeTest(['knplki', 'g', 'i', 'g', 'gifguc'], 2),

  makeTest(['hwsxioizdbobusbwodxqjjbbeucfudxoveurbszeoywebrvifrtrvbyzjhpkqbumrqjzqodxwismuaoahpsjb',
    'wunrwstjxvyaptbcmrrbogvyqc',
    'g',
    'h',
    'x',
    'ibunxmrvvwvfjgtpezkwpglxnjeqwvgcttqcrbfkadishoqsrrtckrouogzjbfonsrbulvwawihkqrvytfetuqotedhdcxvvc',
    's',
    'sdryohmrmqabqoxcjx',
    'trqoxbvtohhsufkofjtagtboyqawcxzbazirrsurxigxldxchmdlpudjknpiepnnfblbnojppvvqwticrqxnsr',
    'heneeybbrapimrpvgxifmntofzqgbhvtifaiymcdsqkotnthokqphtkqmxmexfbifehsqwemtvkmqzxhuzcnzgxzomypcxh',
    'nrgldfifygyvemgotlphtuuypebdnlahhgtlchjjenshurwuzcoolwftmqibnxxkpuqnd'], 9),
  makeTest(['n',
    'b',
    'v',
    'v',
    'f',
    'tygtb',
    'pyfluoh',
    'hxmlrihac',
    'fvqf',
    'jqx',
    'l'], 8),

  // Custom
  makeTest(['a', 'bb', 'a'], 2),
  makeTest(['multi', 's', 'i', 'n', 'g', 'l', 'e', 'multi'], 6)
]

tests.forEach((test, i) => {
  console.log('test', i)
  assert.strictEqual(test.x, stringChainReplacements(test.s))
})
