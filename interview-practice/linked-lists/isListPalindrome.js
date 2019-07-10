// Definition for singly-linked list:
// function ListNode(x) {
//   this.value = x;
//   this.next = null;
// }
//
function isListPalindrome (l) {
  const listAsArray = []
  let listAsString = ''

  let node = l
  while (node) {
    listAsString += String(node.value)
    listAsArray.push(node.value)

    node = node.next
  }

  return listAsString === listAsArray.reverse().join('')
}
