const assert = require('assert')

class Source {
  constructor ({ origin, sink, pourDir }) {
    this.origin = origin
    this.pourDir = pourDir
    this.sink = sink
    this.curRow = origin[0]
    this.curCol = origin[1]
    this.isPouring = true
  }

  isAtOrigin () {
    return this.curRow === this.origin[0] && this.curCol === this.origin[1]
  }
}

function pipesGame (state) {
  const sources = []
  const filledPipes = state.map(s => Array(s.length).fill(false))
  const dirs = ['up', 'right', 'down', 'left']
  let isWinner = true

  // Find all sources
  for (let row = 0; row < state.length; row++) {
    if (!/[a-z]/.test(state[row])) continue

    for (let col = 0; col < state[row].length; col++) {
      if (/[a-z]/.test(state[row][col])) {
        dirs.forEach(dir => {
          sources.push(new Source({
            pourDir: dir,
            origin: [row, col],
            sink: state[row][col].toUpperCase()
          }))
        })
      }
    }
  }

  // Turn the water on for every source, for every direction
  // until either the game wins (every pour finds a sink) or
  // the game loses (by leaking or going to the wrong sink)
  const pourOneCell = () => {
    const result = []
    let next
    let foundPipe = false
    let foundSink = false

    const checkEdge = (source, edgeCondition) => {
      if (edgeCondition) {
        source.isPouring = false
        isWinner = source.isAtOrigin()
        return true
      }

      return false
    }

    const pour = (source) => {
      const dirs = {
        up: {
          edgeCondition: (source.curRow <= 0),
          next () {
            return state[--source.curRow][source.curCol]
          },
          pipeRegex: /[1347]/,
          updateDir (next) {
            if (next === '3') source.pourDir = 'right'
            else if (next === '4') source.pourDir = 'left'
          }
        },
        right: {
          edgeCondition: (source.curCol >= state[source.curRow].length - 1),
          next () {
            return state[source.curRow][++source.curCol]
          },
          pipeRegex: /[2457]/,
          updateDir (next) {
            if (next === '4') source.pourDir = 'down'
            else if (next === '5') source.pourDir = 'up'
          }
        },
        down: {
          edgeCondition: (source.curRow >= state.length - 1),
          next () {
            return state[++source.curRow][source.curCol]
          },
          pipeRegex: /[1567]/,
          updateDir (next) {
            if (next === '5') source.pourDir = 'left'
            else if (next === '6') source.pourDir = 'right'
          }
        },
        left: {
          edgeCondition: (source.curCol === 0),
          next () {
            return state[source.curRow][--source.curCol]
          },
          pipeRegex: /[2367]/,
          updateDir (next) {
            if (next === '3') source.pourDir = 'down'
            else if (next === '6') source.pourDir = 'up'
          }
        }
      }

      const isAtOrigin = source.isAtOrigin()
      const flow = dirs[source.pourDir]

      if (checkEdge(source, flow.edgeCondition)) return

      next = flow.next()
      foundPipe = flow.pipeRegex.test(next)
      foundSink = next === source.sink

      if (foundPipe || foundSink) {
        flow.updateDir(next)

        if (!foundSink) result.push([source.curRow, source.curCol])
        source.isPouring = !foundSink
      } else {
        source.isPouring = false
        isWinner = isAtOrigin
      }
    }

    sources.forEach((source) => {
      if (source.isPouring) pour(source)
    })

    return isWinner ? result : []
  }

  let cellsPoured = pourOneCell()

  while (cellsPoured.length > 0) {
    cellsPoured.forEach(c => (filledPipes[c[0]][c[1]] = true))
    cellsPoured = pourOneCell()
  }

  const numFilled = filledPipes.reduce((acc, val) => {
    return acc + val.reduce((a, v) => a + (v ? 1 : 0), 0)
  }, 0)

  return numFilled * (isWinner || numFilled === 0 ? 1 : -1)
}

// const makeTest = (s, x) => ({ s, x })
const makeTest = (s, x) => {
  const drawRow = (r) => {
    let drawn = ''
    for (let c = 0; c < r.length; c++) {
      switch (r[c]) {
        case '0':
          drawn += ' '
          break
        case '1':
          drawn += '|'
          break
        case '2':
          drawn += '-'
          break
        case '3':
          drawn += '<'
          break
        case '4':
          drawn += '>'
          break
        case '5':
          drawn += '≥'
          break
        case '6':
          drawn += '≤'
          break
        case '7':
          drawn += '+'
          break
        default:
          drawn += r[c]
      }
    }

    return drawn
  }
  // s.forEach(row => console.log(drawRow(row)))

  return { s, x }
}

const tests = [
  makeTest(['a224C22300000',
    '0001643722B00',
    '0b27275100000',
    '00c7256500000',
    '0006A45000000'], 19),

  makeTest(['a000',
    '000A'], 0),

  makeTest(['a727272777A'], 9),

  makeTest(['a',
    '7',
    '1',
    '7',
    '7',
    '1',
    '1',
    'A'], 6),

  makeTest(['A0000b0000',
    '0000000000',
    '0000000000',
    '0000a00000',
    '0000000000',
    '0c00000000',
    '01000000B0',
    '0C00000000'], 1),

  makeTest(['0000000000',
    '0000000000',
    '0000000000',
    '0000000000',
    '0000000000',
    '0000000000',
    '0000000000',
    '0000000000'], 0),

  makeTest(['0020400040',
    '1203300300',
    '7340000000',
    '2040100000',
    '7000500700',
    '0000200000',
    '0002303000',
    '0000000600'], 0),

  makeTest([
    '0002270003777z24',
    '3a40052001000101',
    '1064000001000101',
    '1006774001032501',
    '1000001001010001',
    '1010001001064035',
    '6227206A0622Z250'], -48),

  makeTest(['00p2400003777z24',
    '1a406P0001000101',
    '1064000001000101',
    '1006774001032501',
    '1000001001010001',
    '1000001001064035',
    '6227276A0622Z250'], 43),

  makeTest(['3277222400000000',
    '1000032A40000000',
    '1000010110000000',
    '1Q2227277q000000',
    '1000010110000000',
    '1000062a50000000',
    '6222222500000000'], 40),

  makeTest(['3222222400000000',
    '1000032A40000000',
    '1000010110000000',
    '72q227277Q000000',
    '1000010110000000',
    '1000062a50000000',
    '6222222500000000'], -12)
]

tests.forEach(t => assert.strictEqual(pipesGame(t.s), t.x))
