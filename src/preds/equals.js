module.exports = function equals(test) {
  return function(x) {
    return x === test;
  }
};
