const assert = require('assert');

function seatsInTheater(nCols, nRows, col, row) {
  return (nRows - row) * (nCols - col + 1);
}

let nCols;
let nRows;
let col;
let row;
let expected;
let actual;

nCols = 16, nRows = 11, col = 5, row = 3;
expected = 96;
actual = seatsInTheater(nCols, nRows, col, row);
assert.equal(actual, expected);

console.log('All tests passed.');
