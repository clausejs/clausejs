

var Spec = require('./_Spec');
var Problem = require('./_Problem');
var isProblem = require('./utils/isProblem');
var coerceIntoSpec = require('./utils/coerceIntoSpec');
var nfaConformer = require('./nfa/conformer');
var SPEC_TYPE = 'ZERO_OR_MORE';

function zeroOrMore() {
  var rawSpec = arguments[0];

  if(!rawSpec) {
    throw new Error('No expression provided for zeroOrMore');
  } else if (Array.from(arguments).length !== 1) {
    throw new Error('Exactly one expression is required for zeroOrMore');
  }

  var spec = coerceIntoSpec(rawSpec);

  var expr = new Spec(SPEC_TYPE, spec, null, null);
  expr.conform = nfaConformer(expr);
  return expr;
}

module.exports = zeroOrMore;
