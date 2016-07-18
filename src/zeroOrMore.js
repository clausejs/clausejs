'use strict';

var Spec = require('./_Spec');
var Problem = require('./_Problem');
var conform = require('./conform');
var isProblem = require('./isProblem');

var zeroOrMore = function() {
  var spec = arguments[0];

  if(!spec) {
    throw new Error('No spec(s) provided for zeroOrMore');
  } else if (Array.from(arguments).length !== 1) {
    throw new Error('Exactly one spec required for zeroOrMore');
  }

  return new Spec(genZeroOrMoreConformer(spec));
};

function genZeroOrMoreConformer(spec) {
  return function(vals) {
    if(vals.length === 0) {
      //the zero case; comformed
      return vals;
    } else {
      var problems = vals.filter(spec);
      if(problems.length > 0) {
        return problems;
      } else {
        return vals;
      }
    }
  };
}

module.exports = zeroOrMore;
