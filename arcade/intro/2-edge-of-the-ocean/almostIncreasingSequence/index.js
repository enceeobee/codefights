// [4, 5, 6, 99, 8]
// [1, 2, 1, 2,]
// [10, 1, 2, 3, 4, 5]
// [1, 2, 3, 4, 3, 6]
function almostIncreasingSequence (seq) {
  'use strict'

  function isIncSeq (sequence) {
    for (let i = 0; i < sequence.length - 1; i += 1) {
      if (sequence[i] >= sequence[i + 1]) return false
    }
    return true
  }

  for (let i = 0; i < seq.length - 1; i += 1) {
    if (seq[i] >= seq[i + 1]) {
      if (isIncSeq(seq.slice(0, i).concat(seq.slice(i + 1)))) return true
      if (isIncSeq(seq.slice(0, i + 1).concat(seq.slice(i + 2)))) return true
    }
  }

  return false
}

console.log(almostIncreasingSequence([4, 5, 6, 99, 8]))
console.log(almostIncreasingSequence([1, 2, 1, 2]))
console.log(almostIncreasingSequence([10, 1, 2, 3, 4, 5]))// true
console.log(almostIncreasingSequence([1, 2, 3, 4, 3, 6]))// true
