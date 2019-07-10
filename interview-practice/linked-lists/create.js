const ListNode = require('./ListNode')

function create (array) {
  if (!array || array.length === 0) return null

  let linkedList = new ListNode(array[array.length - 1])
  let currentNode

  for (let i = array.length - 2; i > -1; i--) {
    currentNode = new ListNode(array[i])
    currentNode.next = linkedList
    linkedList = currentNode
  }

  return linkedList
}

module.exports = create
