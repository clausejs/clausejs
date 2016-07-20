'use strict';

var Spec = require('./Spec');

function isSpec(x) {
  return x.___isSpec === true;
}

module.exports = isSpec;
