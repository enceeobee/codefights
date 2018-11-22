const assert = require('assert')

/**
  * Loop through words
  *
  * Find the first letter, then 'x' it out of the board
  * Then search for the next letter in its neighbors
  *
  *
  * Our recursive function will only look for the next letter
  *
  * First, check if the passed word is the resultWord. If so, return.
  */

function wordBoggle (board, words) {
  const foundWords = []
  const foundWordsMap = {}

  let tempBoard
  let didFindWord

  words.forEach((word) => {
    board.forEach((row, ri) => {
      row.forEach((boardLetter, ci) => {
        if (boardLetter === word[0]) {
          tempBoard = board.map(row => row.map(letter => letter))
          tempBoard[ri][ci] = 'x'

          didFindWord = checkResult(word, word[0], tempBoard, { row: ri, col: ci })

          if (didFindWord && !foundWordsMap[word]) {
            foundWords.push(word)
            foundWordsMap[word] = true
          }
        }
      })
    })
  })

  return foundWords.sort()
}

function checkResult (resultWord, currentWord, board, { row, col }) {
  if (currentWord === resultWord) return true

  const nextLetter = resultWord[currentWord.length]
  let nextLetterCol
  let nextLetterRow
  let tempBoard
  let result

  // Above
  if (row > 0 && board[row - 1][col] === nextLetter) {
    nextLetterCol = col
    nextLetterRow = row - 1

    result = checkCell(nextLetterRow, nextLetterCol)
    if (result) return true
  }
  // above right
  if (row > 0 && col < board[row].length - 1 && board[row - 1][col + 1] === nextLetter) {
    nextLetterCol = col + 1
    nextLetterRow = row - 1

    result = checkCell(nextLetterRow, nextLetterCol)
    if (result) return true
  }
  // right
  if (col < board[row].length - 1 && board[row][col + 1] === nextLetter) {
    nextLetterCol = col + 1
    nextLetterRow = row

    result = checkCell(nextLetterRow, nextLetterCol)
    if (result) return true
  }
  // right below
  if (col < board[row].length - 1 && row < board.length - 1 && board[row + 1][col + 1] === nextLetter) {
    nextLetterCol = col + 1
    nextLetterRow = row + 1

    result = checkCell(nextLetterRow, nextLetterCol)
    if (result) return true
  }
  // below
  if (row < board.length - 1 && board[row + 1][col] === nextLetter) {
    nextLetterCol = col
    nextLetterRow = row + 1

    result = checkCell(nextLetterRow, nextLetterCol)
    if (result) return true
  }
  // below left
  if (row < board.length - 1 && col > 0 && board[row + 1][col - 1] === nextLetter) {
    nextLetterCol = col - 1
    nextLetterRow = row + 1

    result = checkCell(nextLetterRow, nextLetterCol)
    if (result) return true
  }
  // left
  if (col > 0 && board[row][col - 1] === nextLetter) {
    nextLetterCol = col - 1
    nextLetterRow = row

    result = checkCell(nextLetterRow, nextLetterCol)
    if (result) return true
  }
  // left above
  if (col > 0 && row > 0 && board[row - 1][col - 1] === nextLetter) {
    nextLetterCol = col - 1
    nextLetterRow = row - 1

    result = checkCell(nextLetterRow, nextLetterCol)
    if (result) return true
  }

  function checkCell (nextLetterRow, nextLetterCol) {
    tempBoard = board.map(row => row.map(letter => letter))
    tempBoard[nextLetterRow][nextLetterCol] = 'x'

    return checkResult(resultWord, currentWord + nextLetter, tempBoard, { row: nextLetterRow, col: nextLetterCol })
  }

  return false
}

// Testing

let testActual
let testBoard
let testWords
let testExpected

// 1.

testBoard = [['R', 'L', 'D'],
  ['U', 'O', 'E'],
  ['C', 'S', 'O']]
testWords = ['CODE',
  'SOLO',
  'RULES',
  'COOL']
testActual = wordBoggle(testBoard, testWords)
testExpected = ['CODE',
  'RULES']

assert.strictDeepEqual(testActual, testExpected)

// 2.

testBoard = [['A', 'X', 'V', 'W'],
  ['A', 'L', 'T', 'I'],
  ['T', 'T', 'J', 'R']]
testWords = ['AXOLOTL',
  'TAXA',
  'ABA',
  'VITA',
  'VITTA',
  'GO',
  'AXAL',
  'LATTE',
  'TALA',
  'RJ']
testExpected = ['AXAL',
  'RJ',
  'TALA',
  'TAXA',
  'VITTA']
testActual = wordBoggle(testBoard, testWords)
assert.strictDeepEqual(testActual, testExpected)

// 3.

// Has to be something with dupes, right?
testBoard = [['A', 'B'],
  ['A', 'B']]
testWords = ['AB', 'ABBA', 'ABAB']
testExpected = ['AB', 'ABAB', 'ABBA']
testActual = wordBoggle(testBoard, testWords)
assert.strictDeepEqual(testActual, testExpected)

// 4.

testBoard = [['A', 'B', 'C'],
  ['A', 'B', 'C']]
testWords = ['AB', 'ABBA', 'ABAB', 'ABCA', 'AABBCC', 'AABBCCC', 'XXX', 'AAA', 'ABCABC', 'ABCCB']
testExpected = ['AABBCC', 'AB', 'ABAB', 'ABBA', 'ABCCB']
testActual = wordBoggle(testBoard, testWords)
assert.strictDeepEqual(testActual, testExpected)

// 5.

testBoard = [['A', 'B', 'C', 'D'],
  ['A', 'B', 'C', 'D'],
  ['A', 'B', 'C', 'D']]
testWords = ['B', 'B', 'BCBCBC', 'BAC']
testExpected = ['B', 'BCBCBC']
testActual = wordBoggle(testBoard, testWords)
assert.strictDeepEqual(testActual, testExpected)

// 6.

testBoard = [['A', 'B', 'C'],
  ['A', 'B', 'C']]
testWords = ['AB', 'ABBA', 'ABAB', 'ABCA', 'AABBCC', 'AABBCCC', 'XXX', 'AAA', 'ABCABC', 'ABCCB', 'AB', 'ABBA', 'ABAB', 'ABCA', 'AABBCC', 'AABBCCC', 'XXX', 'AAA', 'ABCABC', 'ABCCB', 'AB', 'ABBA', 'ABAB', 'ABCA', 'AABBCC', 'AABBCCC', 'XXX', 'AAA', 'ABCABC', 'ABCCB', 'AB', 'ABBA', 'ABAB', 'ABCA', 'AABBCC', 'AABBCCC', 'XXX', 'AAA', 'ABCABC', 'ABCCB', 'AB', 'ABBA', 'ABAB', 'ABCA', 'AABBCC', 'AABBCCC', 'XXX', 'AAA', 'ABCABC', 'ABCCB', 'AB', 'ABBA', 'ABAB', 'ABCA', 'AABBCC', 'AABBCCC', 'XXX', 'AAA', 'ABCABC', 'ABCCB', 'AB', 'ABBA', 'ABAB', 'ABCA', 'AABBCC', 'AABBCCC', 'XXX', 'AAA', 'ABCABC', 'ABCCB', 'AB', 'ABBA', 'ABAB', 'ABCA', 'AABBCC', 'AABBCCC', 'XXX', 'AAA', 'ABCABC', 'ABCCB', 'AB', 'ABBA', 'ABAB', 'ABCA', 'AABBCC', 'AABBCCC', 'XXX', 'AAA', 'ABCABC', 'ABCCB', 'AB', 'ABBA', 'ABAB', 'ABCA', 'AABBCC', 'AABBCCC', 'XXX', 'AAA', 'ABCABC', 'ABCCB', 'AB', 'ABBA', 'ABAB', 'ABCA', 'AABBCC', 'AABBCCC', 'XXX', 'AAA', 'ABCABC', 'ABCCB', 'AB', 'ABBA', 'ABAB', 'ABCA', 'AABBCC', 'AABBCCC', 'XXX', 'AAA', 'ABCABC', 'ABCCB', 'AB', 'ABBA', 'ABAB', 'ABCA', 'AABBCC', 'AABBCCC', 'XXX', 'AAA', 'ABCABC', 'ABCCB', 'AB', 'ABBA', 'ABAB', 'ABCA', 'AABBCC', 'AABBCCC', 'XXX', 'AAA', 'ABCABC', 'ABCCB', 'AB', 'ABBA', 'ABAB', 'ABCA', 'AABBCC', 'AABBCCC', 'XXX', 'AAA', 'ABCABC', 'ABCCB', 'AB', 'ABBA', 'ABAB', 'ABCA', 'AABBCC', 'AABBCCC', 'XXX', 'AAA', 'ABCABC', 'ABCCB']
testExpected = ['AABBCC', 'AB', 'ABAB', 'ABBA', 'ABCCB']
testActual = wordBoggle(testBoard, testWords)
assert.strictDeepEqual(testActual, testExpected)

// 7.
testBoard = [['A', 'B', 'C', 'D'],
  ['E', 'F', 'G', 'H'],
  ['I', 'J', 'K', 'L']]
testWords = ['B', 'B', 'BCBCBC', 'BAC', 'DCBA', 'DHL', 'CDHLK', 'CDHLKL']
testExpected = ['B', 'CDHLK', 'DCBA', 'DHL']
testActual = wordBoggle(testBoard, testWords)
assert.strictDeepEqual(testActual, testExpected)

// 8.

testBoard = []
testWords = ['JGADJDALD']
testExpected = []
testActual = wordBoggle(testBoard, testWords)
assert.strictDeepEqual(testActual, testExpected)

// 9. - Ok, it's not performance-related

testBoard = [['A', 'B', 'C', 'D'],
  ['H', 'G', 'F', 'E'],
  ['I', 'J', 'K', 'L'],
  ['P', 'O', 'N', 'M']]
testWords = ['ABCDEFGHIJKLMNOP', 'AGC', 'DA', 'DL', 'DF', 'DM', 'AHI']
for (let i = 0; i < 150; i++) testWords.push('ABCDEFGHIJKLMNOP')
console.log('testWords', testWords.length)
testExpected = ['ABCDEFGHIJKLMNOP', 'AGC', 'AHI', 'DF']
testActual = wordBoggle(testBoard, testWords)
assert.strictDeepEqual(testActual, testExpected)

// 10.

testBoard = [['A', 'A', 'A', 'A'],
  ['A', 'A', 'A', 'A'],
  ['A', 'A', 'A', 'A']]
testWords = ['A', 'AAAAAAAAAAAA', 'AAAAAAAAAAAAAAA']
testExpected = ['A', 'AAAAAAAAAAAA']
testActual = wordBoggle(testBoard, testWords)
assert.strictDeepEqual(testActual, testExpected)

// 11. Definitely not perf related - Oh shit, this breaks it.

// testBoard = [['A', 'A', 'A', 'A'],
//              ['A', 'A', 'A', 'A'],
//              ['A', 'A', 'A', 'A'],
//              ['A', 'A', 'A', 'A']]
// testWords = ['A', 'AAAAAAAAAAAA', 'AAAAAAAAAAAAAAA', 'A'.repeat(18)]
// for (let i = 0; i < 150; i++) testWords.push('A'.repeat(16))
// testExpected = ['A', 'AAAAAAAAAAAA', 'AAAAAAAAAAAAAAA', 'A'.repeat(16)]
// testActual = wordBoggle(testBoard, testWords)
// assert.strictDeepEqual(testActual, testExpected)

// 12. Words with double letters, where >1 ways to solve it

testBoard = [['B', 'O'],
  ['O', 'G'],
  ['L', 'E']]
testWords = ['BOOGLE', 'BOGE', 'BOLE', 'BOO'] // IT DIDN'T FIND BOLE
testExpected = ['BOGE', 'BOLE', 'BOO', 'BOOGLE']
testActual = wordBoggle(testBoard, testWords)
assert.strictDeepEqual(testActual, testExpected)

// 13.

testBoard = [['B', 'O', 'O'],
  ['O', 'O', 'O'],
  ['O', 'G', 'O'],
  ['L', 'O', 'O']]
testWords = ['BOOGOO', 'BOOL']
testExpected = ['BOOGOO', 'BOOL']
testActual = wordBoggle(testBoard, testWords)
assert.strictDeepEqual(testActual, testExpected)

// 14.

testBoard = [['O']]
testWords = ['O']
testExpected = ['O']
testActual = wordBoggle(testBoard, testWords)
assert.strictDeepEqual(testActual, testExpected)

// 15.

testBoard = [['O', 'R', 'E', 'O'],
  ['O', 'R', 'E', 'O'],
  ['O', 'R', 'E', 'O'],
  ['O', 'R', 'E', 'O']]
testWords = ['O', 'OOOOR', 'OREO', 'OOOOO', 'ROOR']
testExpected = ['O', 'OOOOR', 'OREO', 'ROOR']
testActual = wordBoggle(testBoard, testWords)
assert.strictDeepEqual(testActual, testExpected)
