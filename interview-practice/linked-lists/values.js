const values = (node) => {
  const vals = []

  while (node) {
    vals.push(node.value)
    node = node.next
  }

  return vals
}

module.exports = values
