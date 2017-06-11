const assert = require('assert');

function avoidObstacles(a) {
  'use strict';
  let clearsObstacles;
  for (let i = 2; i < Math.max(...a) + 2; i += 1) {
    for (let j = i; j < Math.max(...a) + 2; j += i) {
      clearsObstacles = (a.indexOf(j) === -1);
      if (!clearsObstacles) break;
    }
    if (clearsObstacles) return i;
  }
  return i + 1;
}

let a = [5, 3, 6, 7, 9];
assert.equal(avoidObstacles(a), 4);

a = [2, 3];
assert.equal(avoidObstacles(a), 4);

a = [1, 4, 10, 6, 2]
assert.equal(avoidObstacles(a), 7);
