var isFn = require('../preds/isFn');
var Spec = require('../models/Spec');

function isPred(x) {
  return isFn(x);
}

module.exports = isPred;
