const assert = require('assert');

function digitsProduct(product) {
  'use strict';

  if (product === 0) return 10;
  else if (product > 0 && product < 10) return product;

  const numberProduct = n => (
    String(n).split('').reduce((acc, val) => Number(acc) * Number(val))
  );
  const dps = [];
  let stringVers;

  function getDps(factor, result) {
    stringVers = String(result) + String(factor);
    if (numberProduct(Number(stringVers)) === product) return Number(stringVers);

    for (let i = 2; i <= Math.ceil(factor / 2); i += 1) {
      if (factor % i === 0) dps.push(getDps(factor / i, String(result) + String(i)));
    }
    return Infinity;
  }

  getDps(product, '');

  const result = (dps.length > 0) ? Math.min(...dps) : -1

  return (result !== Infinity) ? result : -1;
}

let actual;
let expected;
let product;

product = 2;
expected = 2;
actual = digitsProduct(product);
assert.equal(actual, expected);

product = 10;
expected = 25;
actual = digitsProduct(product);
assert.equal(actual, expected);

product = 12;
expected = 26;
actual = digitsProduct(product);
assert.equal(actual, expected);

product = 14;
expected = 27;
actual = digitsProduct(product);
assert.equal(actual, expected);

product = 19;
expected = -1;
actual = digitsProduct(product);
assert.equal(actual, expected);

// 450 / 2 = 225
// 225 / 5 = 45
// 45 / 3 = 15 -> BUST
// 45 / 5 = 9
// 2 * 5 * 5 * 9 === 450
product = 450;
expected = 2559;
actual = digitsProduct(product);
assert.equal(actual, expected);

product = 0;
expected = 10;
actual = digitsProduct(product);
assert.equal(actual, expected);

product = 13;
expected = -1;
actual = digitsProduct(product);
assert.equal(actual, expected);

product = 555;
expected = -1;
actual = digitsProduct(product);
assert.equal(actual, expected);

product = 1;
expected = 1;
actual = digitsProduct(product);
assert.equal(actual, expected);

console.log('All tests passed.');
