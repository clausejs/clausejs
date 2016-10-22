function isFunction(x) {
  var getType = {};
  // (x || false) guarantees returning of boolean type
  return (x || false) && getType.toString.call(x) === '[object Function]';
};

module.exports = isFunction;
