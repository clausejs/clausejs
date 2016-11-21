var simulate = require('../ops/nfa/simulate');
var getMatch = require('../ops/nfa/getMatch')
var compile = require('../ops/nfa/compile');
var Problem = require('../models/Problem');
var isProblem = require('../utils/isProblem');

function nfaWalker(spec, walkFn) {
  var nfa;

  return {
    trailblaze: nfaTrailblaze,
    reconstruct: nfaReconstruct,
  }

  function nfaTrailblaze(x, walkOpts) {

    if(!nfa) {
      nfa = compile(spec); //lazy
    }
    var { chain, matched, lastProblem } = simulate(nfa, x, walkFn, walkOpts);
    if(matched === true) {
      return chain;
    } else {
      var subproblems = [];
      if(lastProblem) {
        subproblems.push(lastProblem);
      }
      return new Problem(x, spec, subproblems, 'Spec ' + spec.type + ' did not match val: ' + JSON.stringify(x));
    }
  }

  function nfaReconstruct(chain, walkOpts) {
    var result = getMatch(chain, walkFn, walkOpts);
    return result;
  }
}

module.exports = nfaWalker;
