const assert = require('assert')

function possibleSums (coins, quantity) {
  const sumMemo = {}
  let possibleSumCount = 0

  const memoize = (sum) => {
    if (sum > 0 && !sumMemo[sum]) {
      console.log('Placing', sum)

      sumMemo[sum] = true
      possibleSumCount++
    }
  }

  // makeTest([10, 50, 100], [1, 2, 1], 9)

  const count = (adder, values, quantities) => {
    if (values.length === 0) return console.log('success return')

    console.log('\nadder', adder)
    console.log('values', values)
    console.log('quantities', quantities)

    memoize(adder)

    // Handle adding adder to rest of array
    count(adder, values.slice(1), quantities.slice(1))

    const qCopy = [...quantities]
    let newSum

    values.forEach((value, i) => {
      console.log(`${adder} + ${value}`)

      newSum = adder + value

      memoize(newSum)

      // Handle adding newSum to rest of array
      count(newSum, values.slice(1), quantities.slice(1))

      for (let q = 1; q < quantities[i]; q++) {
        qCopy[i]--
        count(newSum, values, qCopy)
      }
    })
  }

  // coins.forEach((coin, i) => {
  //   console.log('\ni', i)

  //   for (let q = 1; q <= quantity[i]; q++) {
  //     const adder = coin * q

  //     // memoize(adder)
  //     count(adder, coins.slice(i + 1), quantity.slice(i + 1))
  //   }
  // })

  for (let q = 1; q <= quantity[0]; q++) {
    count(coins[0] * q, coins.slice(1), quantity.slice(1))
  }

  console.log(Object.keys(sumMemo))

  return possibleSumCount
}

/**
 * A helpful comment:
 *
 * Understanding the basic recursion tree was the first step to solve this problem:

  For this example
  coins = [10, 50, 100] and quantity = [1, 2, 1],

  a recursion tree is:

  (10 * 1) = 10
  ...............|__ +(50 * 1) = 60
  ........................................|__ +(100 * 1) = 160
  ...............|__ +(50 * 2) = 110
  ........................................|__ +(100 * 1) = 210
  (50 * 1) = 50
  .................|__ +(100 * 1) = 150
  (50 * 2) = 100
  .................|__ +(100 * 1) = 200
  (100 * 1) = 100 //This value is already in the set.

  Understanding that allowed me to solve the problem using a HashSet to avoid duplicated sums.

  ---

  Ok, so we always want to add the 'next' sum to this coin
  So our termination return could simply be `!coins || coins.length === 0`

  ---

  Summary: every this coin + every next coin, which is basically the recursion tree above
 */

/*
  [10, 50] [1, 2]:
    10*1 = 10 (add 10 to set)
      .........|_ +50*1 = 60 (add 60 to set)
      .........|_ +50*2 = 110 (add 110 to set)
    50*1 = 50 (add 50)
      .........|_ +50*2 = 100 (add 100)
    50*2 = 100 (100 already exists)
*/

// function possibleSums (coins, quantity) {
//   const sums = new Set()
//   const sum = (base, cns, qtys) => {
//     if (cns.length === 0) return

//     if (base > 0) sums.add(base)

//     for (let c = 0; c < cns.length; c++) {
//       for (let q = 1; q < qtys[0]; q++) {

//         console.log(`adding ${base} + ${cns[c]}*${q}`)

//         sums.add(base + cns[c] * q)
//         // sum(cns[c], cns.slice(1), qtys.slice(1))
//       }

//       sum(cns[c], cns.slice(1), qtys.slice(1))
//     }
//   }

//   sum(0, coins, quantity)

//   console.log(sums)

//   return sums.size
// }

// TODO - recursive
// function possibleSums (coins, quantity) {
//   const sumMap = {}
//   const sum = (cns, qty) => {
//     if (
//       !cns ||
//       cns.length === 0 ||
//       qty[0] === 0
//     ) {
//       return 0
//     }

//     let nextSum

//     if (cns.length === 1) {
//       // If we only have one coin, but multiple quantities, recurse
//       // with one less quantity
//       nextSum = cns[0] + sum(cns, [qty[0] - 1])

//       // if (!sumMap[nextSum]) sumMap[nextSum] = 0
//       // sumMap[nextSum]++
//       // return nextSum
//     } else {
//       // If we have multiple coins, recurse...
//       // TODO - I think we need a loop, or better recursion, here
//       nextSum = cns[0] + sum(cns.slice(1), qty.slice(1))
//     }

//     if (!sumMap[nextSum]) sumMap[nextSum] = 0
//     sumMap[nextSum]++
//     return nextSum
//   }

//   while (quantity.length > 0) {

//     console.log('quantity', quantity)

//     sum(coins, quantity)

//     if (quantity[0] > 1) {
//       quantity[0]--
//     } else {
//       if (!sumMap[coins[0]]) sumMap[coins[0]] = 0
//       sumMap[coins[0]]++
//       quantity = quantity.slice(1)
//       coins = coins.slice(1)
//     }
//   }

//   // Return count of sums that are unique

//   console.log(sumMap)

//   return Object.keys(sumMap)
//     .reduce((acc, key) => sumMap[key] === 1 ? acc + 1 : acc, 0)
// }

// Nope, this is rubbish
// function possibleSums (coins, quantity) {
//   // coins = [10, 50, 100] and quantity = [1, 2, 1],
//   // 10*1, 10*1 + 50, 10*1 + 50*2, 10*1 + 100
//   // 50*1, 50*2, 50+100
//   // 11

//   // [10, 50], [1, 2]
//   // 10*1, 10*1 + 50*1, 10*1 + 50*2
//   // 50*1, 50*2

//   // [10, 50], [2, 2]
//   // 10*1, 10*1 + 50*1, 10*1 + 50*2
//   // 10*2, 10*2 + 50*1, 10*2 + 50*2
//   // 50*1, 50*2

//   const sums = new Set()
//   let base

//   for (let c = 0; c < coins.length; c++) {
//     for (let q = 1; q <= quantity[c]; q++) {
//       base = coins[c] * q

//       console.log('\nAdding', base)

//       sums.add(base)

//       for (let c2 = c + 1; c2 < coins.length; c2++) {
//         for (let q2 = 1; q2 <= quantity[c2]; q2++) {

//           console.log(`Adding ${base} + ${coins[c2] * q2} =`, base + coins[c2] * q2)

//           sums.add(base + coins[c2] * q2)
//         }
//       }
//     }
//   }

//   console.log(sums)

//   return sums.size
// }

// THIS ONE WORKS BUT IS TOO SLOW
// function possibleSums (coins, quantity) {
//   const sums = new Set()
//   let sumSize
//   let j

//   for (let i = 0; i < coins.length; i++) {
//     sumSize = sums.size
//     j = 0

//     for (let sum of sums) {
//       if (j++ >= sumSize) break

//       sums.add(sum + coins[i])
//     }

//     sums.add(coins[i])
//   }

//   for (let i = 0; i < quantity.length; i++) {
//     for (let q = 1; q < quantity[i]; q++) {
//       sumSize = sums.size
//       j = 0

//       for (let sum of sums) {
//         if (j++ >= sumSize) break

//         sums.add(sum + coins[i])
//       }
//     }
//   }

//   return sums.size
// }

// THIS ONE WORKS, BUT IS RUNS OUT OF MEMORY
// function possibleSums (coins, quantity) {
//   const sums = []

//   for (let i = 0; i < coins.length; i++) {
//     let sumLen = sums.length

//     for (let j = 0; j < sumLen; j++) {
//       sums.push(sums[j] + coins[i])
//     }

//     sums.push(coins[i])
//   }

//   // console.log('sums', sums)
//   console.log('sums len', sums.length)

//   for (let i = 0; i < quantity.length; i++) {
//     for (let j = 1; j < quantity[i]; j++) {
//       let sumLen = sums.length

//       for (let c = 0; c < sumLen; c++) {
//         sums.push(sums[c] + coins[i])
//       }
//     }
//   }

//   // console.log('sums 2', sums)
//   console.log('sums len 2', sums.length)

//   const uniqueSums = [...new Set(sums)]

//   return uniqueSums.length
// }

// function possibleSums (coins, quantity) {
//   /**
//    * Essentially we need to determine every possible sum
//    * While determining a sum, check it against an object
//    * If it doesn't exist in the object, add it, and increment count
//    * Then return count
//    *
//    * makeTest([10, 50, 100], [1, 2, 1], 9),
//    * sumMap =
//    * {
//    *  10: 1,
//    *  50: 1,
//    *  60: 1,
//    *  100: 2,
//    *  110: 2,
//    *  150: 1,
//    *  160: 1,
//    *  200: 1,
//    *  210: 1
//    * }
//    * 10
//    * 10 + 50
//    * 10 + 50 + 100
//    * 10 + 50 + 50
//    * 10 + 50 + 50 + 100
//    * 10 + 100
//    * 50
//    * 50 + 100
//    * 50 + 50
//    * 50 + 50 + 100
//    * 100
//    *
//    * queue = [
//    *  [10], [10, 50], [10, 50, 100], [10, 50, 50], [10, 50, 50, 100], [10, 100],
//    *  [50], [50, 50], [50, 50, 100], [50, 100]
//    *  [100]
//    * ]
//    */

//   // BEGIN CODE
//   if (coins.length === 1) return quantity[0]
//   if (coins.every(val => val === 1)) return quantity.reduce((acc, val) => acc + val)

//   const sumMap = {}
//   let currentSum = 0
//   let possibleSumCount = 0

//   for (let i = 0; i < coins.length; i++) {
//     for (let j = i; j < coins.length; j++) {
//       for (let k = 0; k < quantity[j]; k++) {
//         // Skipped 0, 1, 2
//         // console.log(i, j, k)

//         // Basically, after doing 10, 50, 50; revert back to 10, 50 before moving to 10, 50, 100
//         // if (i === j) {
//         if (k === 0) {
//           // no sum, just check this value
//           // currentSum = coins[j]
//           // currentSum = coins[i]
//           currentSum -= coins[i]
//         } else {
//           currentSum += coins[j]
//         }

//         if (!sumMap[currentSum]) {
//           sumMap[currentSum] = 1
//           possibleSumCount++
//         } else {
//           sumMap[currentSum] = sumMap[currentSum] + 1
//         }
//       }
//     }
//   }

//   console.log(sumMap)

//   return possibleSumCount
// }

const makeTest = (c, q, x) => ({ c, q, x })
const tests = [
  makeTest([10, 50, 100], [1, 2, 1], 9)
  // makeTest([10, 50, 100, 500], [5, 3, 2, 2], 122),
  // makeTest([1], [5], 5),
  // makeTest([1, 1], [2, 3], 5),
  // makeTest([1, 2], [50000, 2], 50004),
  // makeTest([1, 2, 3], [2, 3, 10000], 30008),
  // makeTest([3, 1, 1], [111, 84, 104], 521),
  // makeTest([1, 1, 1, 1, 1], [9, 19, 18, 12, 19], 77),
  // // my tests
  // makeTest([10, 50], [5, 1], 10),
  // makeTest([5], [5], 5),
  // makeTest([10, 50], [1, 2], 5) // 10, 60, 110, 50, 100; 10 + sum (10, 0); 10 + sum(50, 2); 10 + sum(50, 1); 10 + sum(50, 0); 50 + sum(50, 1); 50 + sum(50, 0)
  // makeTest([50, 100], [2, 1], 4), // 50, 100, 150, 200
  // makeTest([50, 100], [2, 2], 7) // 50, 100, 150, 200, 250, 300, 400
]

tests.forEach(({ c, q, x }) => assert.strictEqual(possibleSums(c, q), x))

console.log('All tests passed')
