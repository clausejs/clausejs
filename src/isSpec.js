'use strict';

var Spec = require('./_Spec');

function isSpec(x) {
  return x instanceof Spec;
}

module.exports = isSpec;
