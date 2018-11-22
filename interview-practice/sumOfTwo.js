const aArray = []
const bArray = []

for (let n = 1; n < 100001; n += 1) {
  aArray.push(n)
  bArray.push(n)
  // aArray.unshift(n);
  // bArray.unshift(n);
}

console.time('sumOfTwo')
/* function sumOfTwo(a, b, v) {
  'use strict';

  const intSort = (a, b) => a - b;
  const sortedA = a.sort(intSort);
  const sortedB = b.sort(intSort);
  const aLen = a.length;

  function binarySearch(value, array) {
    if (array.length <= 1) return false;

    const halfIndex = Math.floor(array.length / 2);
    const halfVal = array[halfIndex];

    if (value === halfVal) return true;
    if (value < halfVal) return binarySearch(value, array.slice(0, halfIndex));
    return binarySearch(value, array.slice(halfIndex));
  }

  for (let i = 0; i < aLen; i += 1) {
      if (sortedA[i] + sortedB[0] > v) continue;
      if (binarySearch(v - sortedA[i], sortedB)) return true;
  }

  return false;
} */

function sumOfTwo (a, b, v) {
  'use strict'

  const aValues = a.reduce((acc, val) => {
    acc[val] = val
    return acc
  }, {})

  for (let i = 0; i < b.length; i += 1) {
    if (aValues[v - b[i]]) return true
  }

  return false
}

console.log(sumOfTwo([1, 2, 3], [10, 20, 30, 40], 420))
console.log(sumOfTwo([10, 1, 5, 3, 8], [100, 6, 3, 1, 5], 4)) // true
console.log(sumOfTwo(aArray, bArray, 200000))

console.timeEnd('sumOfTwo') // about 4-5 ms
