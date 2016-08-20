'use strict';

var Spec = require('./_Spec');
var isProblem = require('./isProblem');
var Problem = require('./_Problem');
var conform = require('./conform');
var fspec = require('./fspec');

function or() {
  var orSpecs = Array.from(arguments);
  var nulls = orSpecs.filter(function(s) {
    return s === null || s === undefined;
  });
  if(nulls.length > 0) {
    throw 'Or: one of the specs is null or undefined';
  }

  return new Spec('OR', orSpecs, genOrConformer(orSpecs), null);
};

function genOrConformer(orSpecs) {
  return function tryConformOr(x) {
    if(orSpecs.length === 0) { //special case
      return x;
    }
    var evalResults = orSpecs.map(function specToConformed(s) { return conform(s, x); });
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
