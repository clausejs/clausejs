function isStr( x ) {
  return x !== null && x !== undefined && x.constructor === String
}

module.exports = isStr;
