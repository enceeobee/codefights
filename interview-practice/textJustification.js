'use strict'
const assert = require('assert')

function textJustification (words, len) {
  'use strict'

  let line = words[0].trim()

  if (words.length === 1) return [line += ' '.repeat(len - line.length)] // eslint-disable-line

  const lines = words.map(w => w.trim()).reduce((acc, word) => {
    if (line === word) return acc
    // Handle empty strings
    if (line.length === 0 && (line + word).length <= len) {
      line = word
      return acc
    }
    if (line.length > 0 && word.length > 0 && (line + word).length < len) {
      line += ` ${word}`
      return acc
    }

    // Our line is full. Let's pad it
    let spaces = ' '
    let replaceRegex

    while (line.length < len) {
      replaceRegex = new RegExp(`[\\S]${spaces}[\\S]`)

      if (replaceRegex.test(line)) line = line.replace(replaceRegex, match => match.replace(spaces, spaces + ' '))
      else if (line.indexOf(' ') !== -1) spaces += ' '
      else line += ' '.repeat(len - line.length)
    }

    acc.push(line)
    line = word

    return acc
  }, [])

  // Grab that last word, unless the last line is an empty space
  if (words[words.length - 1] !== '') lines.push(line + ' '.repeat(len - line.length))

  return lines
}

let words = ['This',
  'is',
  'an',
  'example',
  'of',
  'text',
  'justification.']
console.log(textJustification(words, 16))

words = ['just', 'too', 'short']
console.log(textJustification(words, 6))

words = ['just']
console.log(textJustification(words, 7))

words = ['']
console.log(textJustification(words, 2))

words = ['', 'empty', '', 'words']
console.log(textJustification(words, 5))

words = ['', 'empty', '']
console.log(textJustification(words, 5))
words = ['', 'empty8', '']
console.log(textJustification(words, 8))

words = ['Two',
  'words.']
console.log(textJustification(words, 11))

words = ['vba',
  'gaff',
  'ye',
  'gs',
  'cthj',
  'hf',
  'vetjj',
  'jm',
  'k',
  'f',
  'cgbf',
  'zzz']
console.log(textJustification(words, 8))
words = ['Given',
  'an',
  'array',
  'of',
  'words',
  'and',
  'a',
  'length']
console.log(textJustification(words, 9))
words = ['Extra',
  'spaces',
  'between',
  'words',
  'should',
  'be',
  'distributed',
  'as',
  'evenly',
  'as',
  'possible']
console.log(textJustification(words, 20))

assert.strictDeepEqual(textJustification(words, 20),
  ['Extra spaces between',
    'words    should   be',
    'distributed       as',
    'evenly as possible  '])
