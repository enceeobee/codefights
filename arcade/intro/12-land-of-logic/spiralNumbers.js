const assert = require('assert');

function spiralNumbers(n) {
  const r = [];

  for (let i = 0; i < n; i += 1) {
    r.push([]);
    for (let j = 0; j < n; j += 1) r[i][j] = 0;
  }

  let row = 0;
  let col = 0;
  let direction = 'right';

  const controller = {
    right: {
      nextDirection: 'down',
      thisRow: row => row,
      thisCol: col => col + 1,
      nextRow: row => row + 1,
      nextCol: col => col - 1
    },
    down: {
      nextDirection: 'left',
      thisRow: row => row + 1,
      thisCol: col => col,
      nextRow: row => row - 1,
      nextCol: col => col - 1
    },
    left: {
      nextDirection: 'up',
      thisRow: row => row,
      thisCol: col => col - 1,
      nextRow: row => row - 1,
      nextCol: col => col + 1
    },
    up: {
      nextDirection: 'right',
      thisRow: row => row - 1,
      thisCol: col => col,
      nextRow: row => row + 1,
      nextCol: col => col + 1
    }
  };


  let isValidSpace;
  for (let i = 0; i < n * n; i += 1) {
    isValidSpace = ((row < n && col < n) && (row > -1 && col > -1) && (r[row][col] === 0));
    if (!isValidSpace) {
      row = controller[direction].nextRow(row);
      col = controller[direction].nextCol(col);

      direction = controller[direction].nextDirection;
    }
    r[row][col] = i + 1;

    row = controller[direction].thisRow(row);
    col = controller[direction].thisCol(col);
  }
  return r;
}

let n;
let actual;
let expected;

n = 3;
expected = [[1, 2, 3],
            [8, 9, 4],
            [7, 6, 5]];
actual = spiralNumbers(n);
assert.deepEqual(actual, expected);

n = 5;
expected = [[1,2,3,4,5],
           [16,17,18,19,6],
           [15,24,25,20,7],
           [14,23,22,21,8],
           [13,12,11,10,9]];
actual = spiralNumbers(n);
assert.deepEqual(actual, expected);

console.log('All tests passed.');
