var isPred = require('./isPred');
var isSpec = require('./isSpec');
var Spec = require('../_Spec');
var Problem = require('../_Problem');

var SPEC_TYPE = 'PRED';

function coerceIntoSpec(expr) {
  if(isSpec(expr)) {
    return expr;
  } else if (isPred(expr)) {
    return _wrap(expr);
  } else {
    throw new Error('Expression must either be a Spec object or a predication function that returns true or false. ');
  }
}

function _wrap(pred) {
  return new Spec(SPEC_TYPE, pred, predConformer(pred), null);
}

function predConformer(pred) {
  return function conformPred(x) {
    if(pred(x)) {
      return x;
    } else {
      return new Problem(x, pred, 'Predicate returns false');
    }
  }
}

module.exports = coerceIntoSpec;
