'use strict';

var isFn = require('./preds/isFn');
var Spec = require('./_Spec');
var or = require('./or');

function isPred(x) {
  return isFn(x) || isSpecObj(x);
}

function isSpec(x) {
  return x instanceof Spec;
}

module.exports = isPred;
