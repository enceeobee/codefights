const assert = require('assert');

// function isIPv4Address(inputString) {
//   return inputString.split('.').reduce((acc, val, i, a) => {
//     if (!acc) return acc;
//     if (i === a.length - 1 && i < 3) return false;
//     if (typeof val !== 'number') return false;
//     return val < 256;
//   }, true);
// }

// return /^[0-2]+[0-9]{0,2}\.[0-2]+[0-9]{0,2}\.[0-2]+[0-9]{0,2}\.[0-2]+[0-9]{0,2}$/.test(inputString);

function isIPv4Address(s) {
  return s.split('.').every((val, i, a) => a.length === 4 && val.length > 0 && Number(val) < 256);
}

let inputString = ".254.255.0";
assert.equal(isIPv4Address(inputString), false);

inputString = "172.16.254.1";
assert.equal(isIPv4Address(inputString), true);

inputString = "172.16.254.1a";
assert.equal(isIPv4Address(inputString), false);
