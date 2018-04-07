const assert = require('assert')

function displayDiff (oldVersion, newVersion) {
  let result = ''
  let oldToken = ''
  let newToken = ''
  let i = 0
  let newI = 0

  const oldTokens = {
    // oldVersionIndex = oldToken
  }

  // let hasCompleteGroup = false

  /* for (let i = 0; i < oldVersion.length; i++) {
    for (let j = i + 1; j < oldVersion.length + 1; j++) {
      token = oldVersion.substring(i, j)

      console.log('token', token)

      if (!newVersion.includes(token, newI)) {
        group += oldVersion[j]
        // console.log('both strings have', token.substring(0, token.length - 1))
        console.log('only old has', token.substring(token.length - 1))

        // Only the old version has:
        if (hasCompleteGroup) {
          result += `(${token.substring(token.length - 1)})`
          hasCompleteGroup = false
        }

        newI = i
        i += j - i - 1
      } else {
        console.log('both strings have', token)
        result += token
      }
    }
    // If newI < new.length - 1; whatever's left in new is, well, new
    if (newI < newVersion.length - 1) {
      console.log('only new has', newVersion.slice(newI + 1))
      result += `[${newVersion.slice(newI + 1)}]`
    }
  } */

  for (i; i < oldVersion.length; i++) {
    if (oldVersion[i] === newVersion[newI]) {
      // Same, add to result
      result += oldVersion[i]
      newI++
    } else {
      oldToken = ''
      // newToken = ''

      //  old: 'aab',
      //  new: 'ab',
      //  x: 'a(a)b'

      // Something is different...
      // Check for next diff in old
      // TODO - I wonder if we need to start looking at the next char; i.e. j = i + 1. Maybe not, I dunno
      for (let j = i; j < oldVersion.length; j++) {
        if (oldVersion[j] !== newVersion[newI]) {
          oldToken += oldVersion[j]
        } else {
          break
        }
      }
      // Check for next diff in new
      // for (let j = newI; j < newVersion.length; j++) {
      //   if (newVersion[j] !== oldVersion[i]) {
      //     newToken += newVersion[j]
      //   } else {
      //     break
      //   }
      // }

      console.log('oldtoken', oldToken, 'newtoken', newToken)
      oldTokens[i] = oldToken
      i += oldToken.length - 1


      // if (oldToken.length < newToken.length) {
      //   result += `(${oldToken})`
      //   i += oldToken.length - 1
      // } else if (oldToken.length > newToken.length) {
      //   result += `[${newToken}]`
      //   newI += newToken.length
      //   i--
      // } else {
      //   result += `(${oldToken})[${newToken}]`
      // }
    }
  }

  // TODO - Account for leftovers
  // if (i <= oldVersion.length - 1 && result[result.length - 1] !== ')') result += `(${oldVersion.slice(i)})`
  // if (newI <= newVersion.length - 1 && result[result.length - 1] !== ']') result += `[${newVersion.slice(newI)}]`

  console.log('oldTokens', oldTokens)

  return result
}

const tests = [
  {
    old: 'same_prefix_1233_same_suffix',
    new: 'same_prefix23123_same_suffix',
    x: 'same_prefix(_1)23[12]3_same_suffix'
  },
  {
    old: 'a',
    new: 'b',
    x: '(a)[b]'
  },
  {
    old: '111a222',
    new: '111bb222',
    x: '111(a)[bb]222'
  },
  {
    old: 'a',
    new: 'a',
    x: 'a'
  },
  {
    old: 'ab',
    new: 'bb',
    x: '(a)b[b]'
  },
  {
    old: 'nate',
    new: 'naate',
    x: 'na[a]te'
  },
  {
    old: 'aab',
    new: 'ab',
    x: 'a(a)b'
  },
  // {
  //   old: 'ab',
  //   new: 'aab',
  //   x: 'a[a]b'
  // },
  // {
  //   old: 'a2_3b42c_78d',
  //   new: 'a_34c27_8ed',
  //   x: 'a(2)_3(b)4(2)c(_)[2]7[_]8[e]d'
  // },
  // {
  //   old: 'same_prefix_12533_same_suffix',
  //   new: 'same_prefix23123_same_suffix',
  //   x: 'same_prefix(_1)2(5)3[12]3_same_suffix'
  // },
  // {
  //   old: 'same_prefix_1233_same_suffix',
  //   new: 'same_prefix231233_same_suffix',
  //   x: 'same_prefix(_)[23]1233_same_suffix'
  // }
]

tests.forEach(test => assert.equal(displayDiff(test.old, test.new), test.x))
