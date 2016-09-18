var Problem = require('./_Problem');
var isPred = require('./utils/isPred');
var isSpec = require('./utils/isSpec');

function conform(spec, x) {
  if(spec && isSpec(spec)) {
    return spec.conform(x);
  } else {
    throw new Error('Pred needs to be of type Spec. expression: ' + pred + ', val: ' + x );
  }
};


module.exports = conform;
