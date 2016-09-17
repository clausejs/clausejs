

var isFn = require('../preds/isFn');
var Spec = require('../_Spec');

function isPred(x) {
  return isFn(x);
}

module.exports = isPred;
