'use strict';

var Problem = require('./_Problem');
var isPred = require('./utils/isPred');
var isComp = require('./utils/isComp');
var compile = require('./nfa/compile');
var simulate = require('./nfa/simulate');


function conform(spec, x) {
  if(spec && isComp(spec)) {
    var compiled = compile(spec);
    var matchedX = nfa.simulate(compiled, x);
    return matchedX;
    // return spec.conform(x);
  } else if (spec && isPred(spec)) {
    return spec(x);
  } else {
    throw new Error('Pred needs to be either of type Spec or a function that returns true of false. pred: ' + pred + ', val: ' + x );
  }
};


module.exports = conform;
