'use strict';

var Spec = require('./_Spec');
var Problem = require('./_Problem');
var conform = require('./conform');
var SPEC_TYPE = 'PROPS';

function props(params) {
  var reqSpecs = params.req;
  return new Spec(SPEC_TYPE, params, _genKeyConformer(reqSpecs), null);
};

module.exports = keys;
