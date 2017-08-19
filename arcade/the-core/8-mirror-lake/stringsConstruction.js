function stringsConstruction(a, b) {

  const getLetters = string => (
    string.split('').reduce((acc, val) => {
      if (a.includes(val)) {
        if (!acc[val]) acc[val] = 0;
        acc[val] += 1;
      }
      return acc;
    }, {})
  );

  const aLetters = getLetters(a);
  const bLetters = getLetters(b);
  const bKeys = Object.keys(bLetters);

  if (bKeys.length === 0 || bKeys.length !== Object.keys(aLetters).length) return 0;

  return bKeys.reduce((acc, val) => (
    Math.min(acc, Math.floor(bLetters[val] / aLetters[val]))
  ), Infinity);
}
