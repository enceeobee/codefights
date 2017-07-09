const assert = require('assert');

function moveRight(lock) {
  // AB.. = ..AB
  const newLock = lock.map((row) => {
    const rowLetters = row.replace(/\./g, '');
    return '.'.repeat(row.length - rowLetters.length) + rowLetters;
  });

  return newLock;
}

function moveDown(lock) {
  /**
   * ....
   * ..AB
   * ...C
   * ....
   * =
   * ....
   * ....
   * ...B
   * ..AC
   */
  const newLock = lock.map(row => row.split(''))

  let availableRow;

  for (let col = lock[0].length - 1; col >= 0; col -= 1) {
    // When we start a new column, reset availableRow
    availableRow = -1;

    for (let row = lock.length - 1; row >= 0; row -= 1) {
      // If we find a dot, and this row is higher than the current available row, we have a new available row
      if (lock[row][col] === '.') {
        availableRow = Math.max(availableRow, row);
      }
      // If we find a letter and have an available row, do stuff
      else if (availableRow > -1) {
        // console.log('placing', lock[row][col], 'at', availableRow, ',', col);
        newLock[availableRow][col] = lock[row][col];
        newLock[row][col] = '.';
        availableRow -= 1;
      }
    }
  }
  return newLock.map(row => row.join(''));
}

function moveLeft(lock) {
  // ..AB = AB..
  const newLock = lock.map((row) => {
    const rowLetters = row.replace(/\./g, '');
    return rowLetters + '.'.repeat(row.length - rowLetters.length);
  });

  return newLock;
}

/*
function moveUp(lock) {
  const newLock = lock.map(row => row.split(''))

  let availableRow;

  for (let col = 0; col < lock[0].length; col += 1) {
    availableRow = (lock[0][col] === '.') ? 0 : null;

    for (let row = 0; row < lock.length; row += 1) {
      if (lock[row][col] !== '.') {
        if (availableRow !== null && row !== availableRow) {
          newLock[availableRow][col] = lock[row][col];
          newLock[row][col] = '.';

          availableRow = row;
        }
      } else if (lock[availableRow][col] !== '.') {
        availableRow = row;
      }
    }
  }
  return newLock.map(row => row.join(''));
}
*/

function moveUp(lock) {
  const newLock = lock.map(row => row.split(''))

  let availableRow;

  for (let col = 0; col < lock[0].length; col += 1) {
    // When we start a new column, reset availableRow
    availableRow = lock.length;

    for (let row = 0; row < lock.length; row += 1) {
      // If we find a dot, and this row is higher than the current available row, we have a new available row
      if (lock[row][col] === '.') {
        availableRow = Math.min(availableRow, row);
      }
      // If we find a letter and have an available row, do stuff
      else if (availableRow < lock.length) {
        // if (col == 0) {
        //   console.log('placing', lock[row][col], 'at', availableRow, ',', col);
        // }
        newLock[availableRow][col] = lock[row][col];
        newLock[row][col] = '.';
        availableRow += 1;

        // if (col == 0) {
        //   console.log('availableRow', availableRow);
        // }
      }
    }
  }
  return newLock.map(row => row.join(''));
}

function secretArchivesLock(lock, actions) {

  // console.log('first lock', lock);

  let newLock = lock.slice();
  actions.split('').forEach((action) => {
    switch(action) {
      case 'R':
        newLock = moveRight(newLock);
        break;
      case 'D':
        newLock = moveDown(newLock);
        break;
      case 'L':
        newLock = moveLeft(newLock);
        break;
      case 'U':
        newLock = moveUp(newLock);
        break;
    }
    // console.log('after moving', action, 'new lock', newLock);
  });

  return newLock;
}

let lock;
let actions;
let expected;
let actual;

lock = [ 'VYEPRFI........',
  'ZOZURZ.........',
  'RU.............',
  'NCESRP.........',
  'JT.............',
  'HI.............',
  'NJEJF..........',
  '...............',
  'AKG............',
  'PWWG...........',
  'UOBJTGI........',
  'RJ.............',
  '...............',
  'MGCDS..........',
  'XS.............' ];
actions = 'UR';
expected = ["........VYEPRFI",
 "........ZOZURZI",
 ".........RUESRP",
 ".........NCEJFG",
 "..........JTGGT",
 "..........HIWJS",
 "...........NJBD",
 "............AKC",
 ".............PW",
 ".............UO",
 ".............RJ",
 ".............MG",
 ".............XS",
 "...............",
 "..............."];
 actual = secretArchivesLock(lock, actions);
 assert.deepEqual(actual, expected);

lock = ['....',
 'AB..',
 '.C..',
 '....'];
actions = 'RDL'
expected = ['....',
 '....',
 'B...',
 'AC..'];
actual = secretArchivesLock(lock, actions);
assert.deepEqual(actual, expected);

lock = ['A.B',
 '...',
 'C.D'];
actions = 'DR'
expected = ['...',
 '.AB',
 '.CD'];
actual = secretArchivesLock(lock, actions);
assert.deepEqual(actual, expected);

lock = ['AB',
 'CD'];
actions = 'RURL'
expected = ['AB',
 'CD'];
actual = secretArchivesLock(lock, actions);
assert.deepEqual(actual, expected);

lock = ['A.',
 'CD'];
actions = 'RRRRRRRR'
expected = ['.A',
 'CD'];
actual = secretArchivesLock(lock, actions);
assert.deepEqual(actual, expected);

lock = ['AB',
 '..'];
actions = 'DR'
expected = ['..',
 'AB'];
actual = secretArchivesLock(lock, actions);
assert.deepEqual(actual, expected);

lock = ['U....',
 '.....',
 '.....',
 '.....'];
actions = 'RDL'
expected = ['.....',
 '.....',
 '.....',
 'U....'];
actual = secretArchivesLock(lock, actions);
assert.deepEqual(actual, expected);

lock = ['.....',
 '..A..',
 '.C...',
 '...D.'];
actions = 'UDR'
expected = ['.....',
 '.....',
 '.....',
 '..CAD'];
actual = secretArchivesLock(lock, actions);
assert.deepEqual(actual, expected);

lock = ["...PD.O..P",
        ".MF.......",
        "Q.....I...",
        "....JNJ...",
        ".Y..O.O.J.",
        "V..U......",
        "..J..H....",
        "....T.J...",
        "W.....A.B.",
        ".P....O.K."];
actions = 'D'
expected = ["..........",
            "..........",
            "..........",
            "......O...",
            "......I...",
            "......J...",
            "....D.O...",
            "QM..J.J.J.",
            "VYFPONA.B.",
            "WPJUTHO.KP"];
actual = secretArchivesLock(lock, actions);
assert.deepEqual(actual, expected);

lock = ['...PD.O..P',
 '.MF.......',
 'Q.....I...',
 '....JNJ...',
 '.Y..O.O.J.',
 'V..U......',
 '..J..H....',
 '....T.J...',
 'W.....A.B.',
 '.P....O.K.'];
actions = 'L'
expected = ['PDOP......',
 'MF........',
 'QI........',
 'JNJ.......',
 'YOOJ......',
 'VU........',
 'JH........',
 'TJ........',
 'WAB.......',
 'POK.......'];
actual = secretArchivesLock(lock, actions);
assert.deepEqual(actual, expected);

lock = ['...PD.O..P',
 '.MF.......',
 'Q.....I...',
 '....JNJ...',
 '.Y..O.O.J.',
 'V..U......',
 '..J..H....',
 '....T.J...',
 'W.....A.B.',
 '.P....O.K.'];
actions = 'LD'
expected = ['PD........',
 'MF........',
 'QI........',
 'JN........',
 'YO........',
 'VUO.......',
 'JHJ.......',
 'TJO.......',
 'WABP......',
 'POKJ......'];
actual = secretArchivesLock(lock, actions);
assert.deepEqual(actual, expected);

lock = ['V...Y..E.PRFI..',
 '.ZO...ZU.R.Z...',
 '.....R.......U.',
 '..N.CE...S..RP.',
 '...J........T..',
 '.......H..I....',
 '.N.JE.......J.F',
 '...............',
 'A.K..G.........',
 '...PW.....W.G..',
 'UO..BJT.G.I....',
 '.R.....J.......',
 '...............',
 '..M.GCD.....S..',
 '.X.S...........'];
actions = 'LULLR'
expected = ['........VYEPRFI',
 '........ZOZURZI',
 '.........RUESRP',
 '.........NCEJFG',
 '..........JTGGT',
 '..........HIWJS',
 '...........NJBD',
 '............AKC',
 '.............PW',
 '.............UO',
 '.............RJ',
 '.............MG',
 '.............XS',
 '...............',
 '...............'];
actual = secretArchivesLock(lock, actions);
assert.deepEqual(actual, expected);

console.log('All tests passed.');
