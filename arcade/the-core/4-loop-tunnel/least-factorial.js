const { equal: areEqual } = require('assert');

function leastFactorial(n) {
  let factorial = 1;
  let i = 0;
  while (factorial < n) factorial *= ++i;
  return factorial;
}

let n;
let actual;
let expected;

n = 17
expected = 24;
actual = leastFactorial(n);
areEqual(actual, expected);

console.log('All tests passed');
