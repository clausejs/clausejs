'use strict';

var Problem = require('./_Problem');
var isFn = require('./isFn');

var validate = function(pred, x) {
  if(pred && pred.validator) {
      return pred.validator(x);
  } else if (pred && isFn(pred)) {
    var validator = makeValidatorFromPred(pred);
    return validator(x);
  } else {
    throw new Error('Pred needs either be of type Spec or a function that returns true of false.');
  }
};

function makeValidatorFromPred(pred) {
  return function(x) {
    if(pred(x)) {
      return x;
    } else {
      return new Problem(x, pred);
    }
  }
}

module.exports = validate;
