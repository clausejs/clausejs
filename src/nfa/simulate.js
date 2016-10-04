var Problem = require('../_Problem');
var isProblem = require('../utils/isProblem');
var isArray = require('isarray');

function simulate(nfa, rawInput) {
  var input, isCocerced;
  if(!isArray(rawInput)) {
    isCoerced = true;
    input = [rawInput];
  } else {
    isCoerced = false;
    input = rawInput;
  }

  var r = {
    matched: false,
    result: null,
  };

  var initial = { state: 0, offset: 0, names: [] };
  // var names = [];
  var frontier = [initial];
  // console.log('input: ', input);
  // console.log('nfa: ', nfa.transitions);
  while (frontier.length > 0) {
    // console.log(frontier);
    var current = frontier.shift();
    if (current.state === nfa.finalState && current.offset === input.length) {
      r.matched = true;
      r.result = _getMatch(nfa, rawInput, current);
      return r;
    }
    for (nextStateStr in nfa.transitions[current.state]) {
      var nextState = parseInt(nextStateStr);
      var observed = input[current.offset];
      var transition = nfa.transitions[current.state][nextState];
      var nextOffset;
      if(!transition.isEpsilon) {
        nextOffset = current.offset + 1;
      } else {
        nextOffset = current.offset;
      }
      if ((transition.isEpsilon ||
           !isProblem(transition.conform(observed))) &&
          nextOffset <= input.length) {

        var newNames = current.names.concat([]);
        if(transition.nameIn) {
          newNames.push(transition.nameIn);
        } else if (transition.nameOut) {
          var n = newNames.pop();
          if(n !== transition.nameOut) {
            console.log(current.state, n, transition.nameOut);
            throw new Error('this shouldn\'t be happening');
          }
        }
      	var next = {
          state: nextState,
          offset: nextOffset,
          names: newNames,
          prev: current,
          observed: observed,
          isEpsilon: transition.isEpsilon,
        };
      	frontier.push(next);
      }
    }
  }

  return r;
};

function _getMatch(nfa, input, finalState) {
  var chain = _stateChain(nfa, finalState);
  // var util = require('util');
  // console.log(util.inspect(chain, false, null));
  var r = {};
  chain.forEach(function (curr) {
    _setToValue(r, curr.names, curr.observed);
  })
  return r;
}

function _setToValue(object, path, value) {
  var a = path;
  var o = object;
  for (var i = 0; i < a.length - 1; i++) {
    var n = a[i];
    if (n in o) {
      o = o[n];
    } else {
      o[n] = {};
      o = o[n];
    }
  }
  o[a[a.length - 1]] = value;
}

function _stateChain(nfa, finalState) {
  var chain = [];
  var curr = finalState;
  while(curr) {
    if(!curr.isEpsilon) {
      chain.unshift({
        offset: curr.offset,
        names: curr.names,
        observed: curr.observed,
      });
    }
    curr = curr.prev;
  }
  chain.shift();
  return chain;
}


module.exports = simulate;
