const assert = require('assert')

function rectangleRotation (a, b) {
  // a=6, b=4
  // 5*3 + 4*2
  // return ((a-1) * (b - 1)) + ((a - 2) * (b - 2));
  return ((a - 1) * (b - 1)) + ((a - 2) * (b - 2))

  // If a is even, there are a-1 points at the origin.
  // If a is odd, there are a-2 points

  // So a=4, b=0 will be 3
  /*
  a = 30; b = 2; expected = 65;
  29
  // hmm, so it's like calculating the area, then +/- some extra points
*/
  // const halfA = a / 2;
  // const halfB = b / 2;
  // const topRight = [halfA, halfB];
  // const bottomRight = [halfA, -halfB];
  // const bottomLeft = [-halfA, -halfB];
  // const topLeft = [-halfA, halfB];
  // const origCoords = [topRight, bottomRight, bottomLeft, topLeft];

  // console.log(origCoords);

  // const radians = 45 * (Math.PI / 180);
  // const newCoords = origCoords.map(coords => [ coords[0] - (coords[0] * Math.cos(radians)), coords[1] + (coords[1] * Math.cos(radians)) ]);

  // console.log('newCoords', newCoords);
}

let a
let b
let expected
let actual

a = 6
b = 4
expected = 23
actual = rectangleRotation(a, b)
assert.strictEqual(actual, expected)

a = 30
b = 2
expected = 65
actual = rectangleRotation(a, b)
assert.strictEqual(actual, expected)

a = 8
b = 6
expected = 49
actual = rectangleRotation(a, b)
assert.strictEqual(actual, expected)

a = 16
b = 20
expected = 333
actual = rectangleRotation(a, b)
assert.strictEqual(actual, expected)

console.log('All tests passed.')
