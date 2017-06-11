const assert = require('assert');

function alternatingSums(a) {
  'use strict';
  const weights = [0, 0];

  for (let i = 0; i < a.length; i += 2) {
    weights[0] += a[i];
    weights[1] += a[i + 1] || 0;
  }

  return weights;
}

let a = [50, 60, 60, 45, 70];
assert.deepEqual(alternatingSums(a), [180, 105]);
