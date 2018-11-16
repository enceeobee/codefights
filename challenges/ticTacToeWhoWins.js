const assert = require('assert')

function ticTacToeWhoWins (game) {
  const vertPlays = game.map((row, i) => game[0][i] + game[1][i] + game[2][i])
  const diagPlays = [game[0][0] + game[1][1] + game[2][2], game[0][2] + game[1][1] + game[2][0]]
  const wins = game
    .concat(vertPlays, diagPlays)
    .filter(plays => plays.split('').every(p => plays[0] % 2 === p % 2))

  if (wins.length === 0) return 'draw'

  const smallestLastTurnIndex = wins
    .map(win => win.split('').sort().pop())
    .reduce((acc, val, i, lastTurns) => (val < lastTurns[acc]) ? i : acc, 0)

  return wins[smallestLastTurnIndex][0] % 2 ? 'O' : 'X'
}

const makeTest = (g, x) => ({ g, x })
const tests = [
  makeTest(
    ['425',
      '108',
      '376'], 'X'),
  makeTest(
    ['645',
      '732',
      '081'], 'draw'),
  makeTest(
    ['405',
      '623',
      '871'], 'O'),
  makeTest(
    ['207',
      '184',
      '356'], 'X'),
  makeTest(
    ['234',
      '078',
      '561'], 'draw'
  ),
  makeTest(
    ['145',
      '076',
      '283'], 'O'),
  makeTest(
    ['721',
      '605',
      '483'], 'O'),
  makeTest(
    ['301',
      '426',
      '875'], 'X'),
  makeTest(
    ['843',
      '025',
      '761'], 'O'),
  makeTest(
    ['524',
      '013',
      '867'], 'O'),
  makeTest(
    ['234',
      '106',
      '875'], 'X'),
  makeTest(
    ['108',
      '235',
      '674'], 'draw'),
  makeTest(
    ['021',
      '635',
      '478'], 'X'),
  makeTest(
    ['240',
      '315',
      '786'], 'X'),
  makeTest(
    ['102',
      '457',
      '386'], 'draw')
]

tests.forEach((t, i) => assert.strictEqual(ticTacToeWhoWins(t.g), t.x))
