var Spec = require('./_Spec');
var isProblem = require('./utils/isProblem');
var Problem = require('./_Problem');
var conform = require('./conform');
var fspec = require('./fspec');
var coerceIntoSpec = require('./utils/coerceIntoSpec');
var nfaConformer = require('./nfa/conformer');

var SPEC_TYPE = 'OR';

function or() {
  var rawSpecs = Array.from(arguments);
  var nulls = rawSpecs.filter(function(s) {
    return s === null || s === undefined;
  });
  if(nulls.length > 0) {
    throw 'Or: one of the specs is null or undefined';
  }

  var specs = rawSpecs.map(coerceIntoSpec);

  var expr = new Spec(SPEC_TYPE, specs, null, null);
  expr.conform = nfaConformer(expr);
  return expr;
};


module.exports = or;
