var simulate = require('./simulate');
var compile = require('./compile');
var Problem = require('../models/Problem');

function nfaConformer(spec) {
  var nfa; //lazy

  return function conform(x) {
    if(!nfa) {
      nfa = compile(spec);
    }
    var r = simulate(nfa, x);
    if(r.matched === true) {
      return r.result;
    } else {
      var subproblems = [];
      if(r.lastProblem) {
        subproblems.push(r.lastProblem);
      }
      return new Problem(x, spec, [], 'NFA expression ' + spec.type + ' did not match; val: ' + JSON.stringify(x));
    }
  }
}

module.exports = nfaConformer;
