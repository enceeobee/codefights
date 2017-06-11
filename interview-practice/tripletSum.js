const assert = require('assert');

function tripletSum(x, a) {
  return a.reduce((acc, val, i) => (
    acc || a
      .slice(i + 1)
      .reduce((acc2, val2, i2, a2) => (
        acc2 || a2.slice(i2 + 1).includes(x - (val + val2))
      ), false)
  ), false);
}

let x = 15;
let a = [14, 1, 2, 3, 8, 15, 3];
let actual = tripletSum(x, a);
let expected = false;
assert.equal(actual, expected);

x = 8;
a = [1, 1, 2, 5, 3];
actual = tripletSum(x, a);
expected = true;
assert.equal(actual, expected);

x = 8;
a = [1, 3, 2, 9, 5, 1];
actual = tripletSum(x, a);
expected = true;
assert.equal(actual, expected);

x = 6;
a = [2, 3, 1];
actual = tripletSum(x, a);
expected = true;
assert.equal(actual, expected);

x = 5;
actual = tripletSum(x, a);
expected = false;
assert.equal(actual, expected);

x = 468;
a = [335, 501, 170, 725, 479, 359, 963, 465, 706, 146, 282, 828, 962, 492, 996, 943, 828, 437, 392, 605, 903, 154, 293, 383, 422, 717, 719, 896, 448, 727, 772, 539, 870, 913, 668, 300, 36, 895, 704, 812, 323, 334];
actual = tripletSum(x, a);
expected = false;
assert.equal(actual, expected);

x = 165;
a = [142, 712, 254, 869, 548, 645, 663, 758, 38, 860, 724, 742, 530, 779, 317, 36, 191, 843, 289, 107, 41, 943, 265, 649, 447, 806, 891, 730, 371, 351, 7, 102, 394, 549, 630, 624, 85, 955, 757, 841, 967, 377, 932, 309, 945, 440, 627, 324, 538, 539, 119, 83, 930, 542, 834, 116, 640, 659, 705, 931, 978, 307, 674, 387, 22, 746, 925, 73, 271, 830, 778, 574, 98, 513];
actual = tripletSum(x, a);
expected = true;
assert.equal(actual, expected);

console.log('All tests passed');
