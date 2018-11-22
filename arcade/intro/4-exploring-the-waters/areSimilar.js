// Two arrays are called similar if one can be obtained from another
// by swapping at most one pair of elements in one of the arrays.

/*
* New plan!
*
* track where a[i] != b[i];
* if there are two of those, and they match each other (and opposite indices), ret true
*
* */

function areSimilar (a, b) {
  'use strict'
  const inconsistencies = []
  for (let i = 0; i < a.length; i += 1) {
    if (a[i] !== b[i]) inconsistencies.push({ a: a[i], b: b[i] })
    if (inconsistencies.length > 2) return false
  }

  if (inconsistencies.length === 0) return true

  return inconsistencies[0].a === inconsistencies[1].b && inconsistencies[1].a === inconsistencies[0].b
}

console.log(areSimilar([1, 2, 3], [1, 2, 3]))// true
console.log(areSimilar([1, 2, 3], [2, 1, 3]))// true
console.log(areSimilar([1, 2, 2], [2, 1, 1]))// false
console.log(areSimilar([2, 3, 1], [1, 3, 2]))// true
console.log(areSimilar([1, 1, 4], [1, 2, 3]))// false
console.log(areSimilar([3, 5, 1, 4, 2], [2, 5, 1, 4, 3]))// true
