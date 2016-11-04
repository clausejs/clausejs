var isSpec = require('../utils/isSpec');

function conform(spec, x) {
  if(spec && isSpec(spec)) {
    var r = spec.conform(x);
    return r;
  } else {
    throw new Error('Expression needs to be of type Spec. expression: ' + spec + ', offending value: ' + x );
  }
}

module.exports = conform;
