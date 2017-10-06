const assert = require('assert')

/**
 * When to return 1:
 *  - cuts === 2 && i === a.length - 1
 *
 * When to return 0:
 *  - thisSetSum !== subsetSum && i === a.length - 1
 *
 * When to append next value:
 *  - thisSetSum !== subsetSum
 *  - thisSetSum === subsetSum && i < a.length - 1 - The next value might be 0
 *
 * When to increment cuts
 *  - thisSetSum === subsetSum
 */

// function threeSplit (a) {
  // const getSum = subset => subset.reduce((acc, val) => acc + val)
  // const subsetSum = getSum(a) / 3
//   let numSets = 0

//   // console.log(subsetSum)
//   // const makeCut = (val, subset) => {}

//   // return makeCut(a[0], [])

//   const firstSet = [a[0]]
//   let thisSetSum = a[0]
//   let startIndex = 0
//   let i = 1
//   let cuts = 0

//   while (i < a.length - 1 && (thisSetSum + a[i + 1 !== thisSetSum])) {
//     i += 1
//     if (thisSetSum === subsetSum) cuts++
//     if (i === a.length - 1 && cuts === 2) {
//       // restart
//       i = ++startIndex
//       cuts = 0
//     }
//   }

//   // while (thisSetSum !== subsetSum && i < a.length) {
//   //   thisSetSum += a[i]
//   //   // if (thisSetSum === subsetSum) firstSet.push(a[i])
//   //   console.log('thisSetSum', thisSetSum)
//   //   firstSet.push(a[i])
//   //   i += 1
//   // }

//   /**
//    * Take a set and check its sum.
//    * If it doesn't add up to the sum:
//    *  if at end of set, return 0
//    *  check again with the next value
//    * If it does, increase cutNum and check again with the next value as well as not checking the next
//    *
//    * if cuts === 2, increase numSets
//    */
//   const recursive = (set, cuts, i) => {
//     if (getSum(set) === subsetSum) {
//       // cuts += 1 // Don't do this because we might not want to cut until we add the next value

//       if (cuts >= 2) {
//         if (i === a.length - 1) return 1
//         return recursive(set.append(a[i + 1], cuts, i + 1))
//       } else {

//       }
//     } else {
//       // remove last value and check sum. If it's good, cuts++
//       const setCopy = [].append(set)
//       setCopy.push()
//       if (getSum(setCopy) === subsetSum) {
//         cuts++
//       }
//       // If at end of the array, FAIL
//       if (i === a.length - 1) return 0
//       return recursive(set.append(a[i + 1], cuts, i + 1))
//     }
//   }

//   console.log(firstSet)

//   return numSets
// }

// This works, but is stupid and times out
function threeSplit (a) {
  const arrSum = (acc, val) => acc + val
  const getSum = subset => subset.reduce(arrSum)
  const subsetSum = getSum(a) / 3
  const aLen = a.length
  let numSets = 0
  let cut1 = 1
  let cut2
  let sum1
  let sum2
  let sum3

  while (cut1 < aLen - 2) {
    cut2 = cut1 + 1
    sum1 = a.slice(0, cut1).reduce(arrSum)
    if (sum1 !== subsetSum) {
      cut1 += 1
      continue
    }

    while (cut2 < aLen) {
      sum2 = a.slice(cut1, cut2).reduce(arrSum)
      if (sum2 !== subsetSum) {
        cut2 += 1
        continue
      }

      sum3 = a.slice(cut2, aLen).reduce(arrSum)
      if (sum1 === sum2 && sum2 === sum3) numSets += 1
      cut2 += 1
    }
    cut1 += 1
  }

  return numSets
}

const test = (a, x) => assert.equal(threeSplit(a), x)

test([0, -1, 0, -1, 0, -1], 4)
test([-1, 0, -1, 0, -1, 0], 4)
test([-1, 1, -1, 1, -1, 1, -1, 1], 3)
test([184138, -37745, 82759, 14851, 79647, -91351, -9413, 84612, -101031, -181203, -162841, -14357, -122060, -56837, -59344, 95670, 19230, -197053, -151794, -12451, 1512, 108952, -155189, -8121, 43054, -25951, 125440, 28768, -42373, 188365, 150867, -38140, 61777, 186009, 93565, -76218, -133893, -103795, -187274, -175627, -170204, -30250, 151764, 92036, 9080, 41271, -34582, 75906, -176277, 179547, 152773, 27776, -70639, -186460, 134040, 135416, 196278, 15198, -167083, 190726, 175444, -25970, -37584, 130247, 163481, -78746, 123875, -127859, 63643, 131400, 177022, -51120, -33714, -64067, -153262, -152369, -51938, 173432, -101008, 124992, -151945, -170175, 182191, 144348, -43276, -29398, 143683, 4763, 164814, 195818, 28225, 180864, -127334, 37600, 184790, 4152, 199588, 133654, -18816, -121196, -67769, 112234, 57594, 90858, 199031, 184334, 112916, 130951, -181948, -61114, 74154, -44010, 164849, 163083, -165563, 34566, -103124, 185075, 28700, -196978, -192354, -17883, -142522, -83792, 43765, -183610, 44134, -22779, 192282, 115221, 12296, 20731, 98280, -89394, 72800, -110352, -6289, 54054, 151191, 53169, 12397, -77496, 76249, 40497, 8377, -134898, 1345, -49669, 72688, 181648, 113789, -91593, -85917, 85401, 76632, -71710, 106722, -128521, -119048, 37976, -72773, 34432, 40118, -153781, 163824, 149927, -83901, 58599, 114268, -195468, 101292, 37934, 163551, -51514, 93980, -178182, -152702, -76796, -114697, 31344, -51611, -4632, -85532, -188408, 163967, 83255, 34003, -175284, -60057, 15142, 175259, 194554, -115806, 47879, 6083, -181421, 31385, -154069, -280, 187971], 0)
test([1, 1, 0, 1], 2)

console.log('All tests passed.')
