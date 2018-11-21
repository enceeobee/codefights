const assert = require('assert')

class Stack {
  constructor () {
    this.values = []
  }

  pop () {
    return this.values.pop() || 0
  }

  push (val) {
    this.values.push(val)
  }
}

const reducer = (state, instruction) => {
  state.steps = 1

  switch (instruction) {
    case '@': {
      if (!state.inStringMode) return { ...state, doTerminate: true }
      return state
    }
    case '>': {
      return { ...state, direction: 'r' }
    }
    case 'v': {
      return { ...state, direction: 'd' }
    }
    case '<': {
      return { ...state, direction: 'l' }
    }
    case '^': {
      return { ...state, direction: 'u' }
    }
    case '#': {
      return { ...state, steps: 2 }
    }

    // Conditional
    case '_': {
      // Pop a value; move right if value = 0, left otherwise
      return { ...state, direction: state.stack.pop() === 0 ? 'r' : 'l' }
    }
    case '|': {
      // pop a value; move down if value = 0, up otherwise
      return { ...state, direction: state.stack.pop() === 0 ? 'd' : 'u' }
    }

    case '+': {
      state.stack.push(state.stack.pop() + state.stack.pop())
      return state
    }
    case '-': {
      const a = state.stack.pop()
      const b = state.stack.pop()
      state.stack.push(b - a)
      return state
    }
    case '*': {
      state.stack.push(state.stack.pop() * state.stack.pop())
      return state
    }
    case '/': {
      const a = state.stack.pop()
      const b = state.stack.pop()
      state.stack.push(Math.floor(b / a))
      return state
    }
    case '%': {
      const a = state.stack.pop()
      const b = state.stack.pop()
      state.stack.push(b % a)
      return state
    }

    // Logical
    case '!': {
      // !: logical NOT; pop a value, if the value = 0, push 1, otherwise push 0
      state.stack.push(state.stack.pop() === 0 ? 1 : 0)
      return state
    }
    case '`': {
      // `: greater than; pop a and b, then push 1 if b > a, otherwise 0
      const a = state.stack.pop()
      const b = state.stack.pop()
      state.stack.push(b > a ? 1 : 0)
      return state
    }

    // Stack
    case ':': {
      // :: duplicate value on top of the stack
      const val = state.stack.pop()
      state.stack.push(val)
      state.stack.push(val)
      return state
    }
    case '\\': {
      // \: swap the top stack value with the second to the top
      const a = state.stack.pop()
      const b = state.stack.pop()
      state.stack.push(a)
      state.stack.push(b)
      return state
    }
    case '$': {
      // $: pop value from the stack and discard it
      state.stack.pop()
      return state
    }

    // Output
    case '.': {
      // .: pop value and output it as an integer followed by a space
      state.output += `${Number(state.stack.pop())} `
      return state
    }
    case ',': {
      // ,: pop value and output it as ASCII character
      const val = state.stack.pop()
      state.output += String.fromCharCode(val)
      return state
    }
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9': {
      // digits 0-9: push the encountered number on the stack
      state.stack.push(Number(instruction))
      return state
    }

    case '"': {
      // ": start string mode; push each character's ASCII value all the way up to the next "
      return { ...state, inStringMode: !state.inStringMode }
    }

    default: {
      return state
    }
  }
}

function befunge93 (program) {
  let state = {
    col: 0,
    direction: 'r',
    doTerminate: false,
    inStringMode: false,
    output: '',
    row: 0,
    stack: new Stack(),
    steps: 1
  }

  let instruction = ''
  let runCount = 0

  while (!state.doTerminate) {
    if (runCount >= 100000 || state.output.length >= 100) return state.output

    runCount++
    instruction = program[state.row][state.col]

    if (state.inStringMode && instruction !== '"') {
      state.stack.push(instruction.charCodeAt())
    } else {
      state = reducer(state, instruction)
    }

    // Direction
    switch (state.direction) {
      case 'r': {
        state.col += state.steps
        if (state.col >= program[state.row].length) state.col = 0
        break
      }
      case 'd': {
        state.row += state.steps
        if (state.row >= program.length) state.row = 0
        break
      }
      case 'l': {
        state.col -= state.steps
        if (state.col < 0) state.col = program[state.row].length - 1
        break
      }
      case 'u': {
        state.row -= state.steps
        if (state.row < 0) state.row = program.length - 1
      }
    }
  }

  return state.output
}

// Mini unit tests for each instruction
function unitTest () {
  let state = { direction: '' }
  let expected

  // direction instructions:
  assert.deepStrictEqual(reducer(state, '>'), { direction: 'r' })
  assert.deepStrictEqual(reducer(state, 'v'), { direction: 'd' })
  assert.deepStrictEqual(reducer(state, '<'), { direction: 'l' })
  assert.deepStrictEqual(reducer(state, '^'), { direction: 'u' })

  // conditional instructions
  let stack = new Stack()
  stack.push(0)
  state = { stack, direction: '' }
  assert.deepStrictEqual(reducer(state, '_'), { stack, direction: 'r' })

  stack = new Stack()
  stack.push(60)
  state = { stack, direction: '' }
  assert.deepStrictEqual(reducer(state, '_'), { stack, direction: 'l' })

  stack = new Stack()
  stack.push(0)
  state = { stack, direction: '' }
  assert.deepStrictEqual(reducer(state, '|'), { stack, direction: 'd' })

  stack = new Stack()
  stack.push(60)
  state = { stack, direction: '' }
  assert.deepStrictEqual(reducer(state, '|'), { stack, direction: 'u' })

  // math operators
  // case '+'
  stack = new Stack()
  stack.push(60)
  stack.push(90)
  state = { stack }
  expected = new Stack()
  expected.push(150)
  assert.deepStrictEqual(reducer(state, '+'), { stack: expected })

  stack = new Stack()
  stack.push(90)
  stack.push(60)
  state = { stack }
  expected = new Stack()
  expected.push(30)
  assert.deepStrictEqual(reducer(state, '-'), { stack: expected })

  stack = new Stack()
  stack.push(90)
  stack.push(60)
  state = { stack }
  expected = new Stack()
  expected.push(5400)
  assert.deepStrictEqual(reducer(state, '*'), { stack: expected })

  stack = new Stack()
  stack.push(120)
  stack.push(60)
  state = { stack }
  expected = new Stack()
  expected.push(2)
  assert.deepStrictEqual(reducer(state, '/'), { stack: expected })

  stack = new Stack()
  stack.push(19)
  stack.push(4)
  state = { stack }
  expected = new Stack()
  expected.push(3)
  assert.deepStrictEqual(reducer(state, '%'), { stack: expected })

  // Logical
  stack = new Stack()
  stack.push(0)
  state = { stack }
  expected = new Stack()
  expected.push(1)
  assert.deepStrictEqual(reducer(state, '!'), { stack: expected })

  stack = new Stack()
  stack.push(110)
  state = { stack }
  expected = new Stack()
  expected.push(0)
  assert.deepStrictEqual(reducer(state, '!'), { stack: expected })

  stack = new Stack()
  stack.push(50)
  stack.push(0)
  state = { stack }
  expected = new Stack()
  expected.push(1)
  assert.deepStrictEqual(reducer(state, '`'), { stack: expected })

  stack = new Stack()
  stack.push(50)
  stack.push(70)
  state = { stack }
  expected = new Stack()
  expected.push(0)
  assert.deepStrictEqual(reducer(state, '`'), { stack: expected })

  // Stack
  stack = new Stack()
  stack.push(70)
  state = { stack }
  expected = new Stack()
  expected.push(70)
  expected.push(70)
  assert.deepStrictEqual(reducer(state, ':'), { stack: expected })

  stack = new Stack()
  stack.push(70)
  stack.push(20)
  state = { stack }
  expected = new Stack()
  expected.push(20)
  expected.push(70)
  assert.deepStrictEqual(reducer(state, '\\'), { stack: expected })

  stack = new Stack()
  stack.push(70)
  stack.push(20)
  state = { stack }
  expected = new Stack()
  expected.push(70)
  assert.deepStrictEqual(reducer(state, '$'), { stack: expected })

  // Output
  stack = new Stack()
  stack.push('70')
  state = { output: '', stack }
  assert.deepStrictEqual(reducer(state, '.'), { stack, output: '70 ' })

  stack = new Stack()
  stack.push(97)
  state = { output: '', stack }
  assert.deepStrictEqual(reducer(state, ','), { stack, output: 'a' })

  state = { stack: new Stack() }
  expected = new Stack()
  expected.push(7)
  assert.deepStrictEqual(reducer(state, '7'), { stack: expected })

  state = { inStringMode: false }
  assert.deepStrictEqual(reducer(state, '"'), { inStringMode: true })
  state = { inStringMode: true }
  assert.deepStrictEqual(reducer(state, '"'), { inStringMode: false })

  // TODO - do we need this at all?
  // case ' ': {
  //   //  (whitespace character): empty instruction; does nothing
  //   break
  // }
}

// unitTest()

const makeTest = (p, x) => ({ p, x })
const tests = [
  makeTest(['               v',
    'v  ,,,,,"Hello"<',
    '>48*,          v',
    '"!dlroW",,,,,,v>',
    '25*,@         > '], 'Hello World!\n'),

  makeTest(
    [
      '>25*"!dlrow ,olleH":v ',
      '                 v:,_@',
      '                 >  ^ '
    ]
    , 'Hello, world!\n'),

  makeTest(['1+:::*.9`#@_'], '1 4 9 16 25 36 49 64 81 100 '),

  makeTest([
    '"^a&EPm=kY}t/qYC+i9wHye$m N@~x+"v',
    '"|DsY<"-"z6n<[Yo2x|UP5VD:">:#v_@>',
    '-:19+/"0"+,19+%"0"+,      ^  >39*'],
  '3141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067'),

  makeTest(['@'], ''),

  makeTest(['>!|',
    ' @<',
    '  .',
    '  /',
    '  1',
    '  .',
    '  `'], '0 0 '),

  makeTest(['">:#,_66*2-,@This prints itself out backwards......  but it has to be 80x1 cell'], 'llec 1x08 eb ot sah ti tub  ......sdrawkcab tuo flesti stnirp sihT@,-2*66_,#:>"'),

  makeTest(['v>v>',
    'v^v^',
    'v^v^',
    'v^v^',
    '>^>^'], ''),

  makeTest(['94/.@'], '2 '),

  makeTest(['92+9*                           :. v  <      ',
    '>v"bottles of beer on the wall"+910<         ',
    ',:                                           ',
    '^_ $                             :.v         ',
    '            >v"bottles of beer"+910<         ',
    '            ,:                               ',
    '            ^_ $                     v       ',
    '>v"Take one down, pass it around"+910<       ',
    ',:                                           ',
    '^_ $                           1-v           ',
    '                                 :           ',
    '        >v"bottles of beer"+910.:_          v',
    '        ,:                                   ',
    '        ^_ $                          ^      ',
    '                    >v" no more beer..."+910<',
    '                    ,:                       ',
    '                    ^_ $$ @                  '], '99 bottles of beer on the wall\n99 bottles of beer\nTake one down, pass it around\n98 bottles of beer\nb'),

  makeTest(['<>: #+1 #:+ 3 : *6+ $#2 9v#',
    'v 7 :   +   8 \\ + + 5   <  ',
    '>-  :2  -:  " " 1 + \\ v ^< ',
    '2 + :   7   + : 7 + v > :  ',
    ':1- :3- >   :#, _ @ >:3 5*-'], 'BEFUNGE!EGNUFEB'),

  makeTest(['25*3*4+>:."=",:,"   "v',
    '       |-*2*88:+1,,, <',
    '       @              '], "34 =\"   35 =#   36 =$   37 =%   38 =&   39 ='   40 =(   41 =)   42 =*   43 =+   44 =,   45 =-   46 ="),

  makeTest(['vv    <>v *<',
    '9>:1-:|$>\\:|',
    '>^    >^@.$<'], '362880 '),

  makeTest(['0'], ''),

  makeTest([
    '> v > v',
    '. > ^  ',
    '^/ 29 <'], '4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 ')
]

tests.forEach(t => {
  assert.strictEqual(befunge93(t.p), t.x)
})
