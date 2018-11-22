function commonCharacterCount (s1, s2) {
  'use strict'

  let compareString = s1
  let foundIndex

  return s2.split('').reduce((acc, val) => {
    foundIndex = compareString.indexOf(val)

    if (foundIndex > -1) {
      compareString = compareString.slice(0, foundIndex) + compareString.slice(foundIndex + 1)
      return acc + 1
    }

    return acc
  }, 0)
}

console.log(commonCharacterCount('aabbcc', 'adcaa')) // 3; two 'a's, and one 'c'
console.log(commonCharacterCount('zzzz', 'zzzzzzz')) // 4
