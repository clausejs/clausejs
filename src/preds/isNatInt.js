var isInt = require('./isInt');

function isNatInt(x) {
  return isInt(x) && x >= 0.0;
}

module.exports = isNatInt;
