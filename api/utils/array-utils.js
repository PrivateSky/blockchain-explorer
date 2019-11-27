function unique(array) {
  return array.filter((elem, pos, arr) => arr.indexOf(elem) == pos);
}

module.exports = {
  unique
};
