var Spec = require('../_Spec');

function isSpec(x) {
  if(!x) {
    return false;
  } else {
    return x instanceof Spec;
  }
}

module.exports = isSpec;
