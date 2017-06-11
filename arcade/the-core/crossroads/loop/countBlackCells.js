const assert = require('assert');

// function countBlackCells(n, m) {
//   const nTimes2 = n * 2;
//   return nTimes2 + (((n * m) % 2) ? n - 2 : 0);
// }
/**
 * Hmm, maybe we need to calculate per row. Like, where the line enters, and where it exits
 */
// function countBlackCells(n, m) {
//   const slope = n / m;
//   let numBlack = 0;

//   if (slope < 1) { // exits in the second
//     // Row 1: + 2
//     // Row 2 - n-1: 2
//     // Row n: 2
//   }
//   if (slope === 1) { // exits at exactly the corner of the first square
//     // Row 1: + 2
//     // Row 2 - n-1: 3
//     // Row n: 2
//   }
//   if (slope > 1) { // exits before the end of the first square
//     // Row 1: + 1
//     // Row 2 - n-1: 2
//     // Row n: 1(?)
//   }
// }

// function countBlackCells(n, m) {
//   const slope = -n / m;
//   // -3/4 = -.75
//   // "for every 1 unit over, it goes .75 units down" i.e. "for every .75 units down, it goes 1 unit over"
//   // So for every one unit down, we go
//   let numBlack = 0;
//   let entry = [0, 0];
//   let exit;
//   let exitX;
//   let newX;

//   for (let i = 1; i <= n; i += 1) {
//     newX = entry[0] + 1 + (1 + slope);
//     exitX = (exit || [0])[0];

//     // if (exit) numBlack += Math.ceil(newX - exit[0]);
//     // else numBlack += Math.ceil(newX);
//     // += 1 (for the entry) + maybe one behind + maybe one ahead
//     numBlack += 1;
//     // ahead
//     if (newX - exitX >= 1) numBlack += newX - exitX;
//     // behind
//     if (entry[0] <= i) numBlack += 1;

//     exit = [newX, i];
//     console.log(exit, numBlack);
//     entry = [exit[0], i];
//   }
//   return numBlack;
// }

// function countBlackCells(n, m) {
//   'use strict';
//   const slope = -n / m;
//   const blackSquares = {};

//   let numBlack = 0;
//   let entry = [0, 0];
//   let exit;

//     // entry 0,0, exit 1,-3
//     /**
//      * x
//      * x
//      * x
//      */

//   for (let i = 1; i <= m; i += 1) {
//     entry = exit || entry;
//     exit = [i, entry[1] + slope];
//     // console.log(exit);

//     // Move point to bottom right of exit, then calculate
//     // entry [ 1, -0.75 ]
//     // exit  [ 2, -1.5 ]
//     // move entry to 1, 0
//     // move exit to 2, -2
//     // yDiff = 2

//     // touched = Math.ceil(entry[1]) - Math.floor(exit[1]);

//     // Now account for being at an even point (e.g. 1, 1)
//     // if (Math.round(exit[1]) === exit[1] && exit[1] !== -n) touched += 2;

//     // numBlack += touched;
//     numBlack += Math.ceil(entry[1]) - Math.floor(exit[1]);

//     if (Math.round(exit[1]) === exit[1] && exit[1] !== -n) numBlack += 2;
//   }
//   return numBlack;
// }

function countBlackCells(n, m) {
  'use strict';
  const slope = -n / m;

  let touched = 0;
  let exit = [0, 0];
  let entry;

  for (let i = 1; i <= m; i += 1) {
    entry = exit;
    exit = [i, slope * i];

    touched += Math.ceil(entry[1]) - Math.floor(exit[1]);

    if (Math.round(exit[1]) === exit[1] && exit[1] !== -n) touched += 2;
  }
  return touched;
}

let n;
let m;
let expected;
let actual;

n = 3;
m = 4;
expected = 6;
actual = countBlackCells(n, m);
assert.equal(actual, expected);

n = 3;
m = 3;
expected = 7;
actual = countBlackCells(n, m);
assert.equal(actual, expected);

n = 2;
m = 5;
expected = 6;
actual = countBlackCells(n, m);
assert.equal(actual, expected);

n = 1;
m = 3;
expected = 3;
actual = countBlackCells(n, m);
assert.equal(actual, expected);

n = 1;
m = 239;
expected = 239;
actual = countBlackCells(n, m);
assert.equal(actual, expected);

n = 33;
m = 44;
expected = 86;
actual = countBlackCells(n, m);
assert.equal(actual, expected);

n = 16;
m = 8;
expected = 30;
actual = countBlackCells(n, m);
assert.equal(actual, expected);

// So, if odd, it adds another cell in the middle
// slope = -5/2 = -2.5
/*
'xx'// 1
'xx'// 1
'xx'// 2
'xx'// 1
'xx'// 1
*/

n = 5;
m = 2;
expected = 6;// I think?
actual = countBlackCells(n, m);
assert.equal(actual, expected);

n = 66666;
m = 88888;
expected = 177774;
actual = countBlackCells(n, m);
assert.equal(actual, expected);

/**
 * xxxxxxx
 * xxxxxxx
 * area = n * m = 14
 */

n = 239;
m = 749;
expected = 987;
actual = countBlackCells(n, m);
assert.equal(actual, expected);

n = 14;
m = 234;
expected = 248;
actual = countBlackCells(n, m);
assert.equal(actual, expected);

console.log('All tests passed.');