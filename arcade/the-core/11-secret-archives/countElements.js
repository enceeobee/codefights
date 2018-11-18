const assert = require('assert')

/*
  If input is empty string, return 0

  If the input is not an array:
    - Check if number; if so return 1
    - Check if there are opening and closing quotes: if so return 1
    - Check if input is 'true' or 'false'; if so return 1

  If array is empty, return 0

  Parse each element, and increment if element is valid
*/

const isPrimitive = val => (
  ((val.length > 0 && !isNaN(val)) ||
  (val[0] === '"' && val[val.length - 1] === '"') ||
  (val === 'true' || val === 'false'))
)

function countElements (inputString) {
  if (isPrimitive(inputString)) return 1

  // Ok, first, we need to remove the brackets before splitting
  // Second, we can't split on commas, because there could be commas in a string
  // Then we need a recursive function to handle nested arrays
  // const prims = inputString.split(',').reduce((acc, val) => isPrimitive(val) ? acc + 1 : acc, 0)

  // Ok, new plan, maybe we simply parse the string
  // and track values as we go

  // If we're in a string, don't count ~commas~ anything as the next element until
  // the string closes.

  /*
    Ok, parse inputString.

    Variables:
      - curString - The string we build as doAppend is true
      - curVal - The value we're building as doAppend is false
        - If this is anything but a number or bool, it shouldn't count in the answer

    If val is '"', toggle doAppend
    Else
      - if doAppend, add the char to the current string
      - if char is a number or letter, add char to curValue

  */

  const valuesToTest = []
  let doAppend = false
  let curValue = ''

  inputString.split('').forEach((char, i) => {
    if (char === '"') {
      doAppend = !doAppend

      if (!doAppend) { // string has closed
        // console.log('string has closed. pushing', curValue + '"')

        if (curValue.length > 0) {
          valuesToTest.push(curValue + '"')
          curValue = ''
        }
      } else { // string has opened
        // console.log('string has opened, pushing', curValue)

        valuesToTest.push(curValue)
        curValue = '"'
      }
      return
    }
    if (doAppend) return (curValue += char)

    // TODO - it's possible we need additional character exemptions
    if (/\w|\d|-/.test(char)) return (curValue += char)
    else if (curValue.length > 0) {
      // Here doAppend is false, and we've hit a non-number/letter
      // So we want to end our curValue
      // console.log('hit a non-number/letter char, pushing', curValue)

      valuesToTest.push(curValue)
      curValue = ''
    }
  })

  // console.log('valuesToTest', valuesToTest)

  return valuesToTest.reduce((acc, val) => isPrimitive(val) ? acc + 1 : acc, 0)
}

const makeTest = (i, x) => ({ i, x })
const tests = [
  makeTest('[[0, 20], [33, 99]]', 4),
  makeTest('[ "one", 2, "three" ]', 3),
  makeTest('true', 1),
  makeTest('[[1, 2, [3]], 4]', 4),
  makeTest('["oh, no! kind, of, tricky", "test, case"]', 2),
  makeTest('"try this!, [1, 2, 3, 32], false"', 1),
  makeTest('"a,,,,,,,,,,,,,,asdf"', 1),
  makeTest('1023456789', 1),
  makeTest('["ZZZ]zero"]', 1),
  makeTest('[true,"false", true, [2], false, false]', 6),
  makeTest('[]', 0),
  makeTest('["[   -45,   95]   ", [ 87,  -655]]', 3),
  makeTest('111', 1)
]

tests.forEach(t => assert.strictEqual(countElements(t.i), t.x))
