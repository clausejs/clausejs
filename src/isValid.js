

var Problem = require('./_Problem');
var isProblem = require('./isProblem');
var isPred = require('./utils/isPred');
var isSpec = require('./utils/isSpec');
var conform = require('./conform');

function isValid(pred, x) {
  if(!pred) {
    throw new Error('Spec is required');
  }
  else if (isSpec(pred)) {
    return !(isProblem(conform(pred, x)));
  } else if (isPred(pred)) {
    return pred(x);
  }
  else {
    return true;
  }
};

module.exports = isValid;
