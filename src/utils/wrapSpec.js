var isPred = require('./isPred');
var isSpec = require('./isSpec');
var Spec = require('../_Spec');

var SPEC_TYPE_PRED = 'PRED';

function wrapSpec(expr) {
  if(isSpec(expr)) {
    return expr;
  } else if (isPred(expr)) {
    return _wrap(expr);
  } else {
    throw new Error('Expression must either be a Spec object or a predication function that returns true or false. ');
  }
}

function _wrap(pred) {
  return new Spec(SPEC_TYPE_PRED, pred, pred, null);
}

module.exports = wrapSpec;
