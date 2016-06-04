'use strict';

var Problem = require('./_Problem');

var isValid = function(specObj, x) {
  return !(dt(specObj, x) instanceof Problem);
};

function dt (pred, x) {
  if(pred && pred.validator) {
      return pred.validator(x);
  } else {
    return x;
  }
}

module.exports = isValid;
