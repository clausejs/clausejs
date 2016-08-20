'use strict';

var Spec = require('./_Spec');
var Problem = require('./_Problem');
var conform = require('./conform');
var isProblem = require('./isProblem');

function zeroOrMore() {
  var spec = arguments[0];

  if(!spec) {
    throw new Error('No spec(s) provided for zeroOrMore');
  } else if (Array.from(arguments).length !== 1) {
    throw new Error('Exactly one spec required for zeroOrMore');
  }

  return new Spec('ZERO_OR_MORE', spec, genZeroOrMoreConformer(spec), null);
};

function genZeroOrMoreConformer(spec) {
  return function tryConformZeroOrMore(vals) {
    if(vals.length === 0) {
      //the zero case; comformed
      return vals;
    } else {
      var problems = vals.map(function valToConformed(v) {
        return conform(spec, v);
      }).filter(isProblem);
      if(problems.length > 0) {
        return new Problem(vals, problems, 'Some predicates failed zeroOrMore');
      } else {
        return vals;
      }
    }
  };
}

module.exports = zeroOrMore;
