function allLongestStrings(inputArray) {
  const filterLen = inputArray.reduce((acc, val) => Math.max(acc, val.length), 0)
  return inputArray.filter(st => st.length === filterLen)
}
