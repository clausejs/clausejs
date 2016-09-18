var Spec = require('../_Spec');

function isSpec(x) {
  if(!x) {
    return false;
  } else {
    return x.___isSpec === true;
  }
}

module.exports = isSpec;
