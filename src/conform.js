

var Problem = require('./_Problem');
var isPred = require('./utils/isPred');
var isSpec = require('./utils/isSpec');
var compile = require('./nfa/compile');
var simulate = require('./nfa/simulate');


function conform(spec, x) {
  if(spec && isSpec(spec)) {
    var compiled = compile(spec);
    var matchedX = simulate(compiled, x);
    if(matchedX === false) {
      return new Problem(x, spec, 'Expression did not match');
    } else {
      return matchedX;
    }
    // return spec.conform(x);
  } else if (spec && isPred(spec)) {
    return spec(x);
  } else {
    throw new Error('Pred needs to be either of type Spec or a function that returns true of false. pred: ' + pred + ', val: ' + x );
  }
};


module.exports = conform;
