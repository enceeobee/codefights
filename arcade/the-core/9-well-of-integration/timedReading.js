function timedReading (maxLength, text) {
  return text
    .replace(/[^a-z ]/ig, '')
    .split(' ')
    .reduce((acc, val) => (val && val.length <= maxLength) ? acc + 1 : acc, 0)
}
