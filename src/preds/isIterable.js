module.exports = function isIterable( x ) {
  return !!x[ Symbol.iterable ];
};
