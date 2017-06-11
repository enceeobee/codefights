const assert = require('assert');

function chessKnight(cell) {
  'use strict';
  const col = cell[0].toLowerCase();
  const row = cell[1];
  const cols = {
    a: 0,
    b: 1,
    c: 2,
    d: 3,
    e: 4,
    f: 5,
    g: 6,
    h: 7
  };
  let numValidMoves = 0;
  // NE
  if (cols[col] < 7 && row < 7) numValidMoves += 1;
  if (cols[col] < 6 && row < 8) numValidMoves += 1;
  // SE
  if (cols[col] < 7 && row > 2) numValidMoves += 1;
  if (cols[col] < 6 && row > 1) numValidMoves += 1;
  // SW
  if (cols[col] > 0 && row > 2) numValidMoves += 1;
  if (cols[col] > 1 && row > 1) numValidMoves += 1;
  // NW
  if (cols[col] > 1 && row < 8) numValidMoves += 1;
  if (cols[col] > 0 && row < 7) numValidMoves += 1;

  return numValidMoves;
}

let cell = 'a1';
let expected = 2;
let actual = chessKnight(cell);
assert.equal(actual, expected);

cell = 'c2';
expected = 6;
actual = chessKnight(cell);
assert.equal(actual, expected);

cell = 'd4';
expected = 8;
actual = chessKnight(cell);
assert.equal(actual, expected);

cell = 'g6';
expected = 6;
actual = chessKnight(cell);
assert.equal(actual, expected);

console.log('All tests passed.');
