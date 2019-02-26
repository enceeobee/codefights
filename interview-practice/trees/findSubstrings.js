const assert = require('assert')
const test = require('./test-17.json')

/*
  Create a map of parts
  Loop words:

  for each word, loop from i=0 to word.len, and check the map
  for the substring for word[0] to word[i]

  If we find one, mark its length.

  If we find another one, check that it's longer than the current match

  Finally, replace the `part` with `[part]`

  i.e. move left to right, long to short

  e.g. melon:
    - Best match is 'melo', then 'elon', then 'mel', 'elo', 'lon'
    - start at len - 2, and move from index 0 to whatever ('melo' and 'elon')

  wordLen = 5
  melo - word.slice(0, 0 + 4)
  elon - word.slice(1, 1 + 4)

  mel - word.slice(0, 0 + 3)
  elo - word.slice(1, 1 + 3)
  lon - word.slice(2, 2 + 3)

  me - (0, 0 + 2)
  el - (1, 1 + 2)...
  lo
  on

  m - (0, 0 + 1)
  e - (1, 1 + 1)
  l
  o
  n

  outer loop = 4,3,2,1
  innter loop = 0,1; 0,1,2; 0,1,2,3; 0,1,2,3,4

  return immediately
*/
function findSubstrings (words, parts) {
  if (words.length === 0 || parts.length === 0) return words

  const partsMap = parts.reduce((acc, val) => {
    acc[val] = true
    return acc
  }, {})

  let currentSlice = ''
  let wordLen
  const substrings = words.map((word) => {
    if (word.length < 6 && partsMap[word]) return `[${word}]`

    wordLen = word.length

    for (let sliceLength = Math.min(wordLen - 1, 5); sliceLength >= 1; sliceLength--) {
      for (let startIndex = 0; startIndex <= wordLen - sliceLength; startIndex++) {
        currentSlice = word.slice(startIndex, startIndex + sliceLength)

        if (partsMap[currentSlice]) return word.replace(currentSlice, `[${currentSlice}]`)
      }
    }

    return word
  })

  return substrings
}

assert.deepStrictEqual(findSubstrings(test.input.words, test.input.parts), test.output)
