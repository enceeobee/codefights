function allLongestStrings(inputArray) {
  const stringsOfLength = {};
  let maxLen = 0;
  let stringLength;

  inputArray.forEach(string => {
    stringLength = string.length;
    stringsOfLength[stringLength] = stringsOfLength[stringLength] || [];
    stringsOfLength[stringLength].push(string);
    maxLen = Math.max(maxLen, stringLength);
  });

  return stringsOfLength[maxLen];
}

let inputArray = ['aba', 'aa', 'ad', 'vcd', 'aba'];
console.log(allLongestStrings(inputArray));

inputArray = ['aa'];
console.log(allLongestStrings(inputArray));