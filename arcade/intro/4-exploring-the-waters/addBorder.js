function addBorder (pic) {
  const row = `*${pic[0].split('').reduce(acc => `${acc}*`, '')}*`
  return [row].concat(pic.map(picRow => `*${picRow}*`)).concat([row])
}

console.log(addBorder(['abc', 'ded']))
console.log(addBorder(['a']))
