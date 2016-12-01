module.exports = function instanceOf( t ) {
  return function instanceOfT( x ) {
    return x instanceof t;
  };
}
