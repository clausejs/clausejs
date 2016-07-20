'use strict';

var Spec = require('./Spec');
var isProblem = require('./isProblem');
var Problem = require('./Problem');
var conform = require('./conform');
var fspec = require('./fspec');

var or = function() {
  var orSpecs = Array.from(arguments);

  return new Spec(genOrConformer(orSpecs));
};

function genOrConformer(orSpecs) {
  return function(x) {
    if(orSpecs.length === 0) { //special case
      return x;
    }
    var evalResults = orSpecs.map(function(s) { return conform(s, x); });
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
