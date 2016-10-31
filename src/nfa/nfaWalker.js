var simulate = require('./simulate');
var compile = require('./compile');
var Problem = require('../models/Problem');

function nfaWalker(spec, walkFn) {
  var nfa;

  return function nfaWalk(x, opts) {
    var { conform } = opts;
    if(!nfa) {
      nfa = compile(spec); //lazy
    }

    var { result, matched, lastProblem } = simulate(nfa, x, opts, walkFn);
    if(matched === true) {
      return result;
    } else {
      var subproblems = [];
      if(lastProblem) {
        subproblems.push(lastProblem);
      }
      if (conform) {
        return new Problem(x, spec, [], 'NFA expression ' + spec.type + ' did not match; val: ' + JSON.stringify(x));
      } else {
        throw 'unsupported';
      }
    }
  }
}

module.exports = nfaWalker;
