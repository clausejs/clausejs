var isSpec = require('./utils/isSpec');

function conform(spec, x) {
  if(spec && isSpec(spec)) {
    return spec.conform(x);
  } else {
    throw new Error('Expression needs to be of type Spec. expression: ' + spec + ', val: ' + x );
  }
}

module.exports = conform;
