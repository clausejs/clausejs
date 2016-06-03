'use strict';
var CONST = { INVALID: '___SPECKY_INVALID' };

var isValid = function(spec, x) {
  return dt(spec, x) !== CONST.INVALID;
};

function dt (pred, x) {
  if(pred) {
    if(pred(x)) {
      return pred(x);
    } else { return CONST.INVALID; }
  } else {
    return x;
  }
}

module.exports = isValid;
