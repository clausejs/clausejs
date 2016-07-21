'use strict';

var Problem = require('./_Problem');
var isProblem = require('./isProblem');
var isFn = require('./isFn');
var isSpec = require('./isSpec');

function isValid(pred, x) {
  if(!pred) {
    throw new Error('Spec is required');
  }
  else if (isSpec(pred)) {
    return !(isProblem(pred(x)));
  } else if (isFn(pred)) {
    return pred(x);
  }
  else {
    return true;
  }
};

module.exports = isValid;
