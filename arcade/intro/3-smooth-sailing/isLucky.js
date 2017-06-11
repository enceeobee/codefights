function isLucky(n) {
  const strN = String(n);
  const sums = { l: 0, r: 0 };

  strN.split('').forEach((n, i) => {
    sums[(i < strN.length / 2) ? 'l' : 'r'] += Number(n);
  });

  return sums.l === sums.r;
}

console.log(isLucky(1230)); // true
console.log(isLucky(239017)); // false
