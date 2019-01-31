function makeTest (...args) {
  const test = {}

  console.log('args', args)

  // Object.keys(args).forEach(a => (test[a] = args[a]))

  return test
}

module.exports = makeTest
