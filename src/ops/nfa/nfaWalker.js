var simulate = require('./simulate');
var compile = require('./compile');
var Problem = require('../../models/Problem');

function nfaWalker(spec, walkFn) {
  var nfa;

  return function nfaWalk(x, walkOpts) {
    var { conform, instrument, justValidate } = walkOpts;

    if(conform || instrument || justValidate) {
      if(!nfa) {
        nfa = compile(spec); //lazy
      }

      var { result, matched, lastProblem } = simulate(nfa, x, walkFn, walkOpts);
      if(matched === true) {
        return result;
      } else {
        var subproblems = [];
        if(lastProblem) {
          subproblems.push(lastProblem);
        }
        if (conform || instrument || justValidate) {
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
