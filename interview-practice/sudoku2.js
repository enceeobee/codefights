const assert = require('assert');

function sudoku2(grid) {
  'use strict';

  function hasRepeats(chars) {
    return chars.filter((n, i, a) => !isNaN(n) && a.slice(i + 1).includes(n)).length > 0;
  }

  const grids = [];
  const cols = [];
  let col;
  let subgrid;

  for (let i = 0; i < 8; i += 1) {
    col = [];
    for (let j = 0; j < 8; j += 1) {
      col.push(grid[j][i]);

      if ([1, 4, 7].includes(i) && [1, 4, 7].includes(j)) {
        subgrid = [];
        for (let r = i - 1; r < i + 2; r += 1) {
          for (let c = j - 1; c < j + 2; c += 1) {
            subgrid.push(grid[c][r]);
          }
        }
        grids.push(subgrid);
      }
    }
    cols.push(col);
  }

  const hasValidCols = cols.reduce((acc, col) => acc && !hasRepeats(col), true);
  const hasValidSubgrids = grids.reduce((acc, subgrid) => acc && !hasRepeats(subgrid), true);
  const hasValidRows = grid.reduce((acc, row) => acc && !hasRepeats(row), true);

  return hasValidRows && hasValidCols && hasValidSubgrids;
}

let grid = [['.', '.', '.', '1', '4', '.', '.', '2', '.'],
            ['.', '.', '6', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '1', '.', '.', '.', '.', '.', '.'],
            ['.', '6', '7', '.', '.', '.', '.', '.', '9'],
            ['.', '.', '.', '.', '.', '.', '8', '1', '.'],
            ['.', '3', '.', '.', '.', '.', '.', '.', '6'],
            ['.', '.', '.', '.', '.', '7', '.', '.', '.'],
            ['.', '.', '.', '5', '.', '.', '.', '7', '.']];
let expected = true;
let actual = sudoku2(grid);
assert.equal(actual, expected);

// Bad grid
grid = [['6', '.', '.', '1', '4', '.', '.', '2', '.'],
        ['.', '.', '6', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '1', '.', '.', '.', '.', '.', '.'],
        ['.', '6', '7', '.', '.', '.', '.', '.', '9'],
        ['.', '.', '.', '.', '.', '.', '8', '1', '.'],
        ['.', '3', '.', '.', '.', '.', '.', '.', '6'],
        ['.', '.', '.', '.', '.', '7', '.', '.', '.'],
        ['.', '.', '.', '5', '.', '.', '.', '7', '.']];
expected = false;
actual = sudoku2(grid);
assert.equal(actual, expected);

grid = [['.', '.', '.', '.', '2', '.', '.', '9', '.'],
        ['.', '.', '.', '.', '6', '.', '.', '.', '.'],
        ['7', '1', '.', '.', '7', '5', '.', '.', '.'],
        ['.', '7', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '8', '3', '.', '.', '.'],
        ['.', '.', '8', '.', '.', '7', '.', '6', '.'],
        ['.', '.', '.', '.', '.', '2', '.', '.', '.'],
        ['.', '1', '.', '2', '.', '.', '.', '.', '.'],
        ['.', '2', '.', '.', '3', '.', '.', '.', '.']];
expected = false;
actual = sudoku2(grid);
assert.equal(actual, expected);

grid = [['.','.','4','.','.','.','6','3','.'],
        ['.','.','.','.','.','.','.','.','.'],
        ['5','.','.','.','.','.','.','9','.'],
        ['.','.','.','5','6','.','.','.','.'],
        ['4','.','3','.','.','.','.','.','1'],
        ['.','.','.','7','.','.','.','.','.'],
        ['.','.','.','5','.','.','.','.','.'],
        ['.','.','.','.','.','.','.','.','.'],
        ['.','.','.','.','.','.','.','.','.']];
expected = false;
actual = sudoku2(grid);
assert.equal(actual, expected);

grid = [['.','.','.','.','.','.','.','.','2'],
        ['.','.','.','.','.','.','6','.','.'],
        ['.','.','1','4','.','.','8','.','.'],
        ['.','.','.','.','.','.','.','.','.'],
        ['.','.','.','.','.','.','.','.','.'],
        ['.','.','.','.','3','.','.','.','.'],
        ['5','.','8','6','.','.','.','.','.'],
        ['.','9','.','.','.','.','4','.','.'],
        ['.','.','.','.','5','.','.','.','.']];
expected = true;
actual = sudoku2(grid);
assert.equal(actual, expected);

grid = [['.','9','.','.','4','.','.','.','.'],
        ['1','.','.','.','.','.','6','.','.'],
        ['.','.','3','.','.','.','.','.','.'],
        ['.','.','.','.','.','.','.','.','.'],
        ['.','.','.','7','.','.','.','.','.'],
        ['3','.','.','.','5','.','.','.','.'],
        ['.','.','7','.','.','4','.','.','.'],
        ['.','.','.','.','.','.','.','.','.'],
        ['.','.','.','.','7','.','.','.','.']];
expected = true;
actual = sudoku2(grid);
assert.equal(actual, expected);

console.log('All tests passed');