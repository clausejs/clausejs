

var Spec = require('./_Spec');
var isProblem = require('./isProblem');
var Problem = require('./_Problem');
var conform = require('./conform');
var fspec = require('./fspec');
var coerceIntoSpec = require('./utils/coerceIntoSpec');

function or() {
  var rawExprs = Array.from(arguments);
  var nulls = rawExprs.filter(function(s) {
    return s === null || s === undefined;
  });
  if(nulls.length > 0) {
    throw 'Or: one of the specs is null or undefined';
  }
  var specs = rawExprs.map(coerceIntoSpec);

  return new Spec('OR', specs, genOrConformer(specs), null);
};

function genOrConformer(specs) {
  return function tryConformOr(x) {
    if(specs.length === 0) { //special case
      return x;
    }
    var evalResults = specs.map(function specToConformed(s) { return conform(s, x); });
    var problems = evalResults.filter(isProblem);
    if(evalResults.length > 0 && evalResults.length === problems.length) {
      //all paths should lead to problem
      return new Problem(x, null, 'or: none of the specs is a match for value ' + x);
    } else {
      return x;
    }
  }
}

module.exports = or;
