function showAllSections(numberOfSections) {
  const alphabets = [];
  for (let i = 0; i < numberOfSections; i++) {
    alphabets.push((i + 10).toString(36).toUpperCase());
  }
  return alphabets;
}

module.exports = {
  showAllSections,
};
