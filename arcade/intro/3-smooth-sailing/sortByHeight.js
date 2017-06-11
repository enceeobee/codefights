function sortByHeight(a) {
  const sorted = a
    .filter(val => val !== -1)
    .sort((a, b) => a - b);

  return a.map(val => (val === -1) ? val : sorted.shift());
}

let a = [-1, 150, 190, 170, -1, -1, 160, 180];
console.log(sortByHeight(a)); // [-1, 150, 160, 170, -1, -1, 180, 190]

a = [-1, -1, -1, -1, -1];
console.log(sortByHeight(a)); // [-1, -1, -1, -1, -1]

