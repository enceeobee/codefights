const assert = require('assert');

function sudoku(grid) {
  'use strict';
  const isValidSet = set => set.sort((a, b) => a - b).every((num, i) => num === i + 1);
  const cols = [];
  const squares = [];

  let col;

  for (let row = 0; row < grid.length; row += 1) {
    col = [];

    for (let column = 0; column < grid.length; column += 1) {
      if ((grid.length - row) % 3 === 0 && (grid.length - column) % 3 === 0) {
        squares.push([
          grid[row][column], grid[row][column + 1], grid[row][column + 2],
          grid[row + 1][column], grid[row + 1][column + 1], grid[row + 1][column + 2],
          grid[row + 2][column], grid[row + 2][column + 1], grid[row + 2][column + 2],
        ]);
      }

      col.push(grid[column][row]);
    }
    cols.push(col);
  }

  return grid.every(isValidSet) && cols.every(isValidSet) && squares.every(isValidSet);
}

let grid;
let actual;
let expected;

grid = [[1,3,2,5,4,6,9,8,7],
        [4,6,5,8,7,9,3,2,1],
        [7,9,8,2,1,3,6,5,4],
        [9,2,1,4,3,5,8,7,6],
        [3,5,4,7,6,8,2,1,9],
        [6,8,7,1,9,2,5,4,3],
        [5,7,6,9,8,1,4,3,2],
        [2,4,3,6,5,7,1,9,8],
        [8,1,9,3,2,4,7,6,5]];
expected = true;
actual = sudoku(grid);
assert.equal(actual, expected);

grid = [[1,3,4,2,5,6,9,8,7],
        [4,6,8,5,7,9,3,2,1],
        [7,9,2,8,1,3,6,5,4],
        [9,2,3,1,4,5,8,7,6],
        [3,5,7,4,6,8,2,1,9],
        [6,8,1,7,9,2,5,4,3],
        [5,7,6,9,8,1,4,3,2],
        [2,4,5,6,3,7,1,9,8],
        [8,1,9,3,2,4,7,6,5]];
expected = false;
actual = sudoku(grid);
assert.equal(actual, expected);

grid = [[1,2,3,4,5,6,7,8,9],
        [4,6,5,8,7,9,3,2,1],
        [7,9,8,2,1,3,6,5,4],
        [1,2,3,4,5,6,7,8,9],
        [4,6,5,8,7,9,3,2,1],
        [7,9,8,2,1,3,6,5,4],
        [1,2,3,4,5,6,7,8,9],
        [4,6,5,8,7,9,3,2,1],
        [7,9,8,2,1,3,6,5,4]];
expected = false;
actual = sudoku(grid);
assert.equal(actual, expected);

console.log('All tests passed.');
