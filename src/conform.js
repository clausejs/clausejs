'use strict';

var Problem = require('./_Problem');
var isPred = require('./utils/isPred');
var isSpec = require('./utils/isSpec');
var compile = require('./nfa/compile');
var simulate = require('./nfa/simulate');


function conform(spec, x) {
  // console.log('------');
  // console.log(spec.toString());

  if(spec && isSpec(spec)) {
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
