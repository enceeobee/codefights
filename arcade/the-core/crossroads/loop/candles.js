const assert = require('assert');

function candles(candlesNumber, makeNew) {
  'use strict';
  let totalBurned = candlesNumber;
  let candlesToBurn = candlesNumber;
  let newCandles = 0;
  let leftovers = candlesNumber;

  while (candlesToBurn > 0 && leftovers >= makeNew) {
    newCandles += Math.floor(leftovers / makeNew);
    leftovers = (leftovers % makeNew) + newCandles;

    totalBurned += newCandles;
    candlesToBurn = newCandles;

    newCandles = 0;
  }

  return totalBurned;
}

let cn;
let mn;
let actual;
let expected;

cn = 5;
mn = 2;
expected = 9;
actual = candles(cn, mn);
assert.equal(actual, expected);

cn = 1;
mn = 2;
expected = 1;
actual = candles(cn, mn);
assert.equal(actual, expected);

cn = 3;
mn = 3;
expected = 4;
actual = candles(cn, mn);
assert.equal(actual, expected);

cn = 11;
mn = 3;
expected = 16;
actual = candles(cn, mn);
assert.equal(actual, expected);

console.log('All tests passed.');