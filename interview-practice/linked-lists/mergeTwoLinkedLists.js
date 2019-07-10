// Definition for singly-linked list:
// function ListNode(x) {
//   this.value = x;
//   this.next = null;
// }

function mergeTwoLinkedLists (l1, l2) {
  const merged = []

  while (l1 || l2) {
    if (!l1) {
      merged.push(l2.value)
      l2 = l2.next
    } else if (!l2) {
      merged.push(l1.value)
      l1 = l1.next
    } else if (l1.value < l2.value) {
      merged.push(l1.value)
      l1 = l1.next
    } else {
      merged.push(l2.value)
      l2 = l2.next
    }
  }

  return merged
}
