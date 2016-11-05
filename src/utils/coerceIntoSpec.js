var isPred = require('./isPred');
var isSpec = require('./isSpec');
var isSpecRef = require('./isSpecRef');
var isDelayedSpec = require('./isDelayedSpec');
var Spec = require('../models/Spec');
var Problem = require('../models/Problem');
var namedFn = require('./namedFn');
var fnName = require('./fnName');

var SPEC_TYPE = 'PRED';

function coerceIntoSpec(expr) {
  if(isSpec(expr) || isSpecRef(expr) || isDelayedSpec(expr)) {
    return expr;
  } else if (isPred(expr)) {
    return _wrap(expr);
  } else {
    throw new Error('Expression must either be a Spec object or a predication function that returns true or false. ');
  }
}

function _wrap(pred) {
  return new Spec(SPEC_TYPE, [pred], null, predConformer(pred), null);
}

function predConformer(pred) {
  return function conformPred(x) {
    if(pred(x)) {
      return x;
    } else {
      return new Problem(x, pred, [], 'Predicate ' + fnName(pred) + ' returns false on value ' + JSON.stringify(x));
    }
  }
}

module.exports = coerceIntoSpec;
