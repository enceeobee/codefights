const assert = require('assert');

function minesweeper(matrix) {
  'use strict';
  return matrix.map((row, rowI) => (
    row.map((square, colI) => {
      let numMines = 0;

      for (let k = rowI - 1; k <= rowI + 1; k += 1) {
        for (let l = colI - 1; l <= colI + 1; l += 1) {
          if (!(k === rowI && l === colI) && ((matrix[k]||[])[l])) numMines += 1;
        }
      }
      return numMines;
    })
  ));
}

let matrix = [[true, false, false],
              [false, true, false],
              [false, false, false]];
let expected = [[1, 2, 1],
               [2, 1, 1],
               [1, 1, 1]];
let actual = minesweeper(matrix);
assert.deepEqual(actual, expected);


matrix = [[false,false,false],
 [false,false,false]];
actual = minesweeper(matrix);
expected = [[0,0,0],
 [0,0,0]];
assert.deepEqual(actual, expected);

matrix = [[true,false,false,true],
[false,false,true,false],
[true,true,false,true]];
actual = minesweeper(matrix);
expected = [[0,2,2,1],
 [3,4,3,3],
 [1,2,3,1]];
assert.deepEqual(actual, expected);

console.log('All tests passed');
