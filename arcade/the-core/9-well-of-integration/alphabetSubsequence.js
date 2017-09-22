function alphabetSubsequence (s) {
  return s.split('').every((l, i) => (i > 0) ? l > s[i - 1] : true)
}
