const assert = require('assert')

// Solution #2 - Recursion
function digitsProduct (product) {
  if (product === 0) return 10
  if (multiplyDigits(product) === product) return product

  let answer = Infinity
  let factorDigitProduct
  let combinedNumberAsString

  // Going to have to loop through all factors, then
  // recurse with each factor to find the next factor

  for (let i = 2; i < Math.ceil(product / 2); i++) {
    if (product % i === 0) {
      factorDigitProduct = digitsProduct(product / i)
      combinedNumberAsString = String(i) + factorDigitProduct

      if (multiplyDigits(combinedNumberAsString) === product) {
        answer = Math.min(answer, Number(combinedNumberAsString))
      }
    }
  }

  return answer < Infinity ? answer : -1
}

// Solution #1 - Naive
// function digitsProduct (product) {
//   for (let i = 1; i < 10000; i++) {
//     if (multiplyDigits(i) === product) return i
//   }

//   return -1
// }

function multiplyDigits (number) {
  return String(number)
    .split('')
    .reduce((acc, val) => acc * val, 1)
}

const makeTest = (p, x) => ({ p, x })
const tests = [
  makeTest(12, 26),
  makeTest(19, -1),
  makeTest(450, 2559),
  makeTest(0, 10),
  makeTest(13, -1),
  makeTest(1, 1),
  makeTest(243, 399),
  makeTest(576, 889),
  makeTest(360, 589)
]

tests.forEach(t => assert.strictEqual(digitsProduct(t.p), t.x))
