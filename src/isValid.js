'use strict';

var Problem = require('./_Problem');
var isProblem = require('./isProblem');
var isPred = require('./utils/isPred');
var isComp = require('./utils/isComp');

function isValid(pred, x) {
  if(!pred) {
    throw new Error('Spec is required');
  }
  else if (isComp(pred)) {
    return !(isProblem(pred.conform(x)));
  } else if (isPred(pred)) {
    return pred(x);
  }
  else {
    return true;
  }
};

module.exports = isValid;
