const assert = require('assert')

function simplifiedUglify (code) {
  let currentVarCharCode = 97
  const replacements = {}
  const reservedWords = ['var', 'function', 'return', 'if', 'else', 'for', 'true', 'false', 'length']
    .reduce((acc, val) => {
      acc[val] = true
      return acc
    }, {})
  const wordsRegex = /([_a-z0-9]+)/i

  const replacer = (match) => {
    if (!isNaN(Number(match)) || reservedWords[match]) return match
    if (replacements[match]) return replacements[match]

    replacements[match] = String.fromCharCode(currentVarCharCode++)

    if (currentVarCharCode > 122) currentVarCharCode = 65

    return replacements[match]
  }

  return code
    .map(line => (
      line.trim().split(wordsRegex)
        .map(word => (!wordsRegex.test(word)) ? word : replacer(word))
        .join('')
    )
    )
    .join('')
}

const tests = [
  {
    c: ['var x = 1;',
      'var y = 0;',
      'var z = x / y;'],
    x: 'var a = 1;var b = 0;var c = a / b;'
  },
  {
    c: ['function add(param1, param2) {',
      '    return param1 + param2;',
      '}'],
    x: 'function a(b, c) {return b + c;}'
  },
  {
    c: ['function isEven(n) {',
      '    if (n % 2 === 0)',
      '        return true;',
      '    return false;',
      '}'],
    x: 'function a(b) {if (b % 2 === 0)return true;return false;}'
  },
  {
    c: ['var n = 0;',
      'var max_iter = 10;',
      'for (var i = 0; i < max_iter; i++)',
      '    n += i;'],
    x: 'var a = 0;var b = 10;for (var c = 0; c < b; c++)a += c;'
  },
  {
    c: ['function permutations(n, r) {',
      '    function factorial(x) {',
      '        if (x === 0) {',
      '            return 1;',
      '        }',
      '        return x * factorial(x - 1);',
      '    }',
      '    return factorial(n) / factorial(n - r);',
      '}'],
    x: 'function a(b, c) {function d(e) {if (e === 0) {return 1;}return e * d(e - 1);}return d(b) / d(b - c);}'
  }
]

tests.forEach(test => assert.deepStrictEqual(simplifiedUglify(test.c), test.x))
