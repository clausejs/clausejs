module.exports = {
  alwaysTrue: function() {
    return true;
  },
  equals: function(x) {
    return function(y) {
      return x == y;
    }
  }
};
