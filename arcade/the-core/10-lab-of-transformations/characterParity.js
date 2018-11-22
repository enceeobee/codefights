function characterParity (symbol) {
  if (isNaN(Number(symbol))) return 'not a digit'
  return Number(symbol) % 2 ? 'odd' : 'even'
}

module.exports = characterParity
