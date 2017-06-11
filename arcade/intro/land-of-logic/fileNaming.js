const assert = require('assert');

function fileNaming(names) {
  'use strict';
  const nameCache = {};

  return names.map(name => {
    let i = 1;
    let suffix = '';
    while(nameCache[name + suffix]) {
      suffix = `(${i})`;
      i += 1;
    }

    name += suffix;
    nameCache[name] = name;

    return name;
  });
}

let names;
let expected;
let acutal;

names = ["doc", "doc", "image", "doc(1)", "doc"]
expected = ["doc", "doc(1)", "image", "doc(1)(1)", "doc(2)"];
actual = fileNaming(names);
assert.deepEqual(actual, expected);

names = ["a(1)",
 "a(6)",
 "a",
 "a",
 "a",
 "a",
 "a",
 "a",
 "a",
 "a",
 "a",
 "a"];
 expected = ["a(1)",
 "a(6)",
 "a",
 "a(2)",
 "a(3)",
 "a(4)",
 "a(5)",
 "a(7)",
 "a(8)",
 "a(9)",
 "a(10)",
 "a(11)"];
 actual = fileNaming(names);
 assert.deepEqual(actual, expected);

 names = ["dd",
 "dd(1)",
 "dd(2)",
 "dd",
 "dd(1)",
 "dd(1)(2)",
 "dd(1)(1)",
 "dd",
 "dd(1)"];
 expected = ["dd",
 "dd(1)",
 "dd(2)",
 "dd(3)",
 "dd(1)(1)",
 "dd(1)(2)",
 "dd(1)(1)(1)",
 "dd(4)",
 "dd(1)(3)"];
 actual = fileNaming(names);
 assert.deepEqual(actual, expected);

console.log('All tests passed.');
