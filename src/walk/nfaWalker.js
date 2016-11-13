var simulate = require('../ops/nfa/simulate');
var getMatch = require('../ops/nfa/getMatch')
var compile = require('../ops/nfa/compile');
var Problem = require('../models/Problem');

function nfaWalker(spec, walkFn) {
  var nfa;

  return function nfaWalk(x, walkOpts) {
    var { conform, instrument, trailblaze } = walkOpts;

    if(conform || instrument || trailblaze) {
      if(!nfa) {
        nfa = compile(spec); //lazy
      }

      var { chain, matched, lastProblem } = simulate(nfa, x, walkFn, walkOpts);
      if(matched === true) {
        var result = getMatch(chain, walkFn, walkOpts);
        return result;
      } else {
        var subproblems = [];
        if(lastProblem) {
          subproblems.push(lastProblem);
        }
        if (conform || instrument || trailblaze) {
          return new Problem(x, spec, [], 'Spec ' + spec.type + ' did not match val: ' + JSON.stringify(x));
        } else {
          console.error(walkOpts);
          throw 'no impl case';
        }
      }
    }
  }
}

module.exports = nfaWalker;
