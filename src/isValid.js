'use strict';

var Problem = require('./_Problem');
var isFn = require('./isFn');

var isValid = function(pred, x) {
  if(!pred) {
    throw new Error('Spec is required');
  }
  else if(pred.validator) {
      return !(pred.validator(x) instanceof Problem);
  } else if (isFn(pred)) {
    return pred(x);
  }
  else {
    return true;
  }
};

module.exports = isValid;
