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
      return new Problem(x, spec, 'Expression did not match');
    }
  }
}

module.exports = nfaConformer;
