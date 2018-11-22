const assert = require('assert')

function switchLights (a) {
  // Let's start naive - This is what was submitted
  // const aa = a
  // for (let i = 0; i < a.length; i += 1) {
  //   if (a[i] === 1) {
  //     for (let j = 0; j <= i; j += 1) {
  //       aa[j] = (aa[j]) ? 0 : 1
  //     }
  //   }
  // }

  // return aa

  /*
    a[i] will be flipped as many times as there are 1s in front of it (inclusive)
    so if numOnesInFront is even, a[i] will remain the same value
    else, it will result in the opposite value
  */

  // const oneMap = a.reduce((acc, val, i) => {
  //   if (val) acc[i] = true
  //   return acc
  // }, {})

  // console.log(oneMap)

  let numOnes = 0
  // const onesArr = a.map((val) => {
  //   if (val) numOnes += 1
  //   return numOnes
  // }).reverse()
  // const onesArr = a.map(val => (val) ? (numOnes += 1) : numOnes).reverse()
  const onesArr = a.reverse().map(val => (val) ? (numOnes += 1) : numOnes).reverse()
  console.log(onesArr)

  return onesArr.map((val, i) => (val % 2 === 0) ? a[i] : Number(!a[i]))

  /**
   * [ 1, 1, 0, 1, 1, 0, 1, 0 ] =
   * [ 4, 3, 3, 3, 2, 2, 1, 1 ] =
   * [ 1, 0, 1, 0, 1, 0, 0, 1 ], should =
   * [ 1, 1, 1, 0, 0, 1, 1, 0 ]
   *
   * if val == 1, and numOnes is even, keep 1
   * if val == 1, and numOnes is odd, keep 1
   * HRMMM
   */

  // let numOnes = 0
  // return a.map(val => (val) ? (numOnes += 1) : numOnes)
  //   .reverse()
  //   .map((val, i) => (val % 2 === 0) ? a[i] : Number(Boolean(!a[i])))
}

const test = (a, x) => assert.strictDeepEqual(switchLights(a), x)

test([1, 1, 1, 1, 1], [0, 1, 0, 1, 0])
test([0, 0], [0, 0])
test([1, 0, 0, 1, 0, 1, 0, 1], [1, 1, 1, 0, 0, 1, 1, 0])
test([1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1], [1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0])

console.log('All tests passed.')
