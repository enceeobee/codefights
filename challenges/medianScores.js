const assert = require('assert')

// Attempt #1 - Works, but is too slow
// const calculateMedian = medians => {
//   medians.sort((a, b) => a - b)

//   const halfLen = medians.length / 2
//   return Math.ceil(medians.length % 2 ? medians[Math.floor(halfLen)] : ((medians[halfLen - 1] + medians[halfLen]) / 2))
// }

// function medianScores (scores) {
//   const rollingMedians = []
//   return scores.map((s) => {
//     rollingMedians.push(s)
//     return calculateMedian(rollingMedians)
//   })
// }

// Attempt #2 - no sorting. Also works but is still too slow.
// const calculateMedian = scores => {
//   const halfLen = scores.length / 2
//   return Math.ceil(scores.length % 2 ? scores[Math.floor(halfLen)] : ((scores[halfLen - 1] + scores[halfLen]) / 2))
// }

// function medianScores (scores) {
//   const sortedScores = []
//   let insertAt

//   return scores.map((s) => {
//     insertAt = sortedScores.findIndex(ss => ss > s)
//     if (insertAt === -1) {
//       if (s < sortedScores[0]) insertAt = 0
//       else insertAt = sortedScores.length
//     }

//     sortedScores.splice(insertAt, 0, s)

//     // console.log(sortedScores)

//     return calculateMedian(sortedScores)
//   })
// }

// Attempt #5 or whatever attempting binary search
const calculateMedian = scores => {
  const halfLen = scores.length / 2
  return Math.ceil(scores.length % 2 ? scores[Math.floor(halfLen)] : ((scores[halfLen - 1] + scores[halfLen]) / 2))
}

// const getInsertIndex = (score, sortedScores, index = 0) => {

//   if (sortedScores.length === 0) return -1

//   let i = Math.floor(sortedScores.length / 2)

//   console.log('score', score, 'index', index, 'sortedScores', sortedScores, 'i', i)


//   if (sortedScores.length <= 1) return index + i

//   if (score === sortedScores[i]) return index + i
//   // if (sortedScores[i] < score) return getInsertIndex(score, sortedScores.slice(0, i), i)
//   if (score < sortedScores[i]) return getInsertIndex(score, sortedScores.slice(0, i), i)

//   return getInsertIndex(score, sortedScores.slice(-i), i)
// }

const getInsertIndex = (target, scores) => {

  // We need to track startIndex and endIndex in order
  // to properly binary seach

  let i = Math.floor(scores.length / 2)
  let origI = i
  let len = scores.length

  const search = (s) => {

    // console.log('\ns', s)
    if (s.length < scores.length) len -= s.length


    if (s.length === 0) return -1
    // [20,100], t=50, i=1, origI=1 -> [20], i=0, origI=1 -> 1 = origI
    // if (s.length === 1) return target <= s[0] ? origI + 1 : origI - 1
    // if (s.length === 1) return len
    if (s.length === 1) return target <= s[0] ? len : origI // BAH

    i = Math.floor(s.length / 2)
    // origI = s.length - i
    // origI += i


    // console.log('i', i)

    if (target < s[i]) return search(s.slice(0, i))
    if (target > s[i]) return search(s.slice(-i))
  }

  if (target === scores[i]) return i
  if (scores.length === 1) return target <= scores[i] ? 0 : 1

  return search(scores)
  // if (target < scores[i]) return search(scores.slice(0, i))
  // if (target > scores[i]) return search(scores.slice(-i))

  // return search(target, scores)
  // return -1
}

function medianScores (scores) {
  const sortedScores = []
  let insertAt

  return scores.map((s) => {
    // console.log(sortedScores)
    // console.log('sortedScores.findIndex(ss => ss > s)', sortedScores.findIndex(ss => ss > s))
    // console.log('getInsertIndex(s, sortedScores)', getInsertIndex(s, sortedScores))
    console.log(sortedScores.findIndex(ss => ss > s), getInsertIndex(s, sortedScores))

    // insertAt = sortedScores.findIndex(ss => ss > s)
    insertAt = getInsertIndex(s, sortedScores)
    if (insertAt === -1) {
      if (s < sortedScores[0]) insertAt = 0
      else insertAt = sortedScores.length
    }

    sortedScores.splice(insertAt, 0, s)

    console.log(sortedScores)

    return calculateMedian(sortedScores)
  })
}

// Attempt #3 - Keep running median rather than sorting
// function medianScores (scores) {
//   const tracked = []
//   let isOdd

//   return scores.map((s, i) => {
//     if (i === 0) return s

//     isOdd = (i + 1) % 2 === 1

//     // Reset high and low scores
//     // If s < lowScore; highScore = tempLow; lowScore = s
//     // If s > highScore; lowScore = tempHigh; highScore = s
//     // If lowScore < s < highScore; highScore = s

//     if (s < tracked[0]) {
//       // e.g. tracked = [90, 100], s = 50;
//       // [90, 100] -> [50, 90, 100] -> tracked = [90]

//       // e.g. [90, 95, 100] -> tracked = [95], s = 50;
//       // [90, 95, 100] -> [50, 90, 95, 100] -> tracked = [90, 95]

//       // If i < 3; like [20, 100] -> [10, 20]
//       tracked.pop()
//       tracked.unshift(s)

//       // Else; like s=10, t=[ 20, 45, 50, 70, 100 ] -> [ 10, 20, 45, 50, 70, 100 ] -> [45, 50]
//       // FUCK, we don't have access to that 45

//       if (tracked.length === 1) return tracked[0]
//     } else if (s > tracked[1]) {
//       // e.g. [11, 34, 55], s = 99 -> [11, 34, 55, 99]; tracked is [34, 55]
//       // const tempHighScore = highScore
//       // lowScore = tempHighScore
//       // highScore = s
//     } else if (s > lowScore && s < highScore) {
//       // i.e. lowScore < s < highScore
//       // s = 70, low = 50, high = 100; should set low = 50, high = 70
//       // lowScore = s
//       // highScore = s
//     }

//     // if (s > lowScore && s < highScore) lowScore = s
//     // else if (s < lowScore) {
//     //   const tempLowScore = lowScore
//     //   highScore = tempLowScore
//     //   lowScore = s
//     // } else if (s > highScore) {
//     //   // s > highScore
//     //   const tempHighScore = highScore
//     //   lowScore = tempHighScore
//     //   highScore = s
//     // }

//     console.log('\ns', s)
//     console.log('lowScore', lowScore)
//     console.log('highScore', highScore)

//     // Odd
//     if ((i + 1) % 2 === 1) {

//       console.log('odd, returning', lowScore)
//       // How do we know which one to return?

//       return lowScore
//     }



//     // Even
//     console.log('even, returning mean of', lowScore, 'and', highScore)

//     return Math.ceil((lowScore + highScore) / 2)
//   })
// }

// function medianScores (scores) {
//   // const medians = []
//   // let mean
//   let lowScore
//   let highScore
//   let middleScore

//   return scores.map((s, i) => {
//     if (i === 0) lowScore = s

//     // Reset high and low scores
//     // If lowScore < s < highScore; lowScore = s
//     // If s < lowScore; highScore = tempLow; lowScore = s
//     // If s > highScore; lowScore = tempHigh; highScore = s

//     if (s < lowScore) {
//       const tempLowScore = lowScore
//       highScore = tempLowScore
//       lowScore = s
//     } else if (s > highScore) {
//       const tempHighScore = highScore
//       lowScore = tempHighScore
//       highScore = s
//     } else if (s > lowScore && s < highScore) {
//       // i.e. lowScore < s < highScore
//       // s = 70, low = 50, high = 100; should set low = 50, high = 70
//       // lowScore = s
//       highScore = s
//     }

//     // if (s > lowScore && s < highScore) lowScore = s
//     // else if (s < lowScore) {
//     //   const tempLowScore = lowScore
//     //   highScore = tempLowScore
//     //   lowScore = s
//     // } else if (s > highScore) {
//     //   // s > highScore
//     //   const tempHighScore = highScore
//     //   lowScore = tempHighScore
//     //   highScore = s
//     // }

//     console.log('\ns', s)
//     console.log('lowScore', lowScore)
//     console.log('highScore', highScore)

//     // Odd
//     if ((i + 1) % 2 === 1) {

//       console.log('odd, returning', lowScore)
//       // How do we know which one to return?

//       return lowScore
//     }



//     // Even
//     console.log('even, returning mean of', lowScore, 'and', highScore)

//     return Math.ceil((lowScore + highScore) / 2)
//   })
// }

/*
Test case = [100, 20, 50, 70, 45]
[ 100 ]
odd, returning 100=
[ 20, 100 ]
even, returning mean of 20 and 100
[ 20, 50, 100 ]
odd, returning 50
[ 20, 50, 70, 100 ]
even, returning mean of 50 and 70
[ 20, 45, 50, 70, 100 ]
odd, returning 50

[ 10 ]
odd, returning 10
[ 10, 20 ]
even, returning mean of 10 and 20
[ 10, 20, 30 ]
odd, returning 20

[ 98 ]
odd, returning 98
[ 91, 98 ]
even, returning mean of 91 and 98
[ 70, 91, 98 ]
odd, returning 91
[ 26, 70, 91, 98 ]
even, returning mean of 70 and 91
[ 26, 70, 75, 91, 98 ]
odd, returning 75
[ 26, 70, 75, 91, 91, 98 ]
even, returning mean of 75 and 91
[ 26, 30, 70, 75, 91, 91, 98 ]
odd, returning 75
[ 26, 30, 70, 75, 88, 91, 91, 98 ]
even, returning mean of 75 and 88
[ 26, 30, 70, 75, 86, 88, 91, 91, 98 ]
odd, returning 86
*/


const makeTest = (s, x) => ({ s, x })
const tests = [
  // makeTest([100, 20, 50, 70, 45], [100, 60, 50, 60, 50]),
  makeTest([10, 20, 30], [10, 15, 20]),
  // makeTest([98, 91, 70, 26, 75, 91, 30, 88, 86], [98, 95, 91, 81, 75, 83, 75, 82, 86]),
  // makeTest([93, 65, 48, 30, 23, 91, 24, 57, 98, 71, 60, 97], [93, 79, 65, 57, 48, 57, 48, 53, 57, 61, 60, 63]),
  // makeTest([82, 65, 70, 67, 70, 50, 67, 85, 52, 98, 51, 76, 60, 51, 73, 61, 75, 89, 57, 50, 73, 96, 76, 65, 76, 64, 71, 55, 86, 50, 50, 87, 65, 59, 60, 56, 57, 74, 80, 50], [82, 74, 70, 69, 70, 69, 67, 69, 67, 69, 67, 69, 67, 67, 67, 67, 67, 69, 67, 67, 67, 69, 70, 69, 70, 69, 70, 69, 70, 69, 67, 69, 67, 67, 67, 66, 65, 66, 67, 66]),
  // makeTest([1, 2, 3], [1, 2, 2]),
  // makeTest([20, 11, 45, 0, 0, 40, 12, 88, 56, 66, 96, 32, 79, 98, 96, 57, 72, 33, 15, 14], [20, 16, 20, 16, 11, 16, 12, 16, 20, 30, 40, 36, 40, 43, 45, 51, 56, 51, 45, 43]),
  // makeTest([100], [100]),
  // makeTest([97, 65, 90, 95, 95, 78, 80, 84, 70, 67, 87, 71, 53, 65, 86, 76, 81, 67, 78, 84, 92, 84, 75, 55, 58, 55, 59, 71, 91, 76, 54, 58], [97, 81, 90, 93, 95, 93, 90, 87, 84, 82, 84, 82, 80, 79, 80, 79, 80, 79, 78, 79, 80, 81, 80, 79, 78, 78, 78, 77, 78, 77, 76, 76]),
  // makeTest([54, 68, 57, 91, 50, 78, 75, 55, 51, 56, 59, 60, 65, 63, 82, 86, 90, 62, 99, 53, 63, 56, 50, 56, 91, 50, 99, 95, 52, 69, 70, 53, 80, 83, 81, 91, 59, 51, 87, 66, 62, 57, 82, 67, 68, 51, 71, 66, 53, 60, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [54, 61, 57, 63, 57, 63, 68, 63, 57, 57, 57, 58, 59, 60, 60, 62, 63, 63, 63, 63, 63, 63, 62, 61, 62, 61, 62, 63, 62, 63, 63, 63, 63, 63, 63, 64, 63, 63, 63, 64, 63, 63, 63, 64, 65, 64, 65, 66, 65, 64, 63, 63, 63, 63, 62, 62, 62, 61, 60, 60, 60, 60, 59, 59, 59, 58, 57, 57, 57, 57, 56, 56, 56, 56, 56, 56, 55, 55, 54, 54, 53, 53, 53, 53, 53, 53, 52, 52, 51, 51, 51, 51, 51, 51, 50, 50, 50, 50, 50, 25])
]

tests.forEach(t => assert.deepStrictEqual(medianScores(t.s), t.x))
