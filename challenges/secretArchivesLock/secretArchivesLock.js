const assert = require('assert');

function moveHorizontal(lock, direction) {
  return lock.map((row) => {
    const rowLetters = row.replace(/\./g, '');

    if (direction === 'R') {
      return '.'.repeat(row.length - rowLetters.length) + rowLetters;
    }
    return rowLetters + '.'.repeat(row.length - rowLetters.length);
  });
}

function moveVertical(lock, direction) {
  const newLock = lock.map(row => row.split(''));
  let availableRow;

  if (direction === 'D') {
    for (let col = lock[0].length - 1; col >= 0; col -= 1) {
      availableRow = -1;

      for (let row = lock.length - 1; row >= 0; row -= 1) {
        if (lock[row][col] === '.') {
          availableRow = Math.max(availableRow, row);
        } else if (availableRow > -1) {
          newLock[availableRow][col] = lock[row][col];
          newLock[row][col] = '.';
          availableRow -= 1;
        }
      }
    }
  } else {
    for (let col = 0; col < lock[0].length; col += 1) {
      availableRow = lock.length;

      for (let row = 0; row < lock.length; row += 1) {
        if (lock[row][col] === '.') {
          availableRow = Math.min(availableRow, row);
        } else if (availableRow < lock.length) {
          newLock[availableRow][col] = lock[row][col];
          newLock[row][col] = '.';
          availableRow += 1;
        }
      }
    }
  }

  return newLock.map(row => row.join(''));
}

function secretArchivesLock(lock, actions) {
  let newLock = lock.slice();
  actions.split('').forEach((action) => {
    newLock = ('RL'.includes(action)) ?  moveHorizontal(newLock, action) :  moveVertical(newLock, action);
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
