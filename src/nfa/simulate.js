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
  // var util = require('util');
  // console.log('nfa', util.inspect(nfa, false, null));
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
      var move;
      if(!transition.isEpsilon) {
        nextOffset = current.offset + 1;
      } else {
        nextOffset = current.offset;
      }

      if ((transition.isEpsilon ||
           !isProblem(transition.conform(observed))) &&
          nextOffset <= input.length) {
        var newNames = current.names.concat([]);
        if(transition.isEpsilon) {
          if(transition.dir === 'in' && transition.name !== undefined) {
            if(transition.name !== null) {
              newNames.push(transition.name);
            }
          } else if (transition.dir === 'out' && transition.name !== undefined) {
            if(transition.name !== null) {
              var n = newNames.pop();
              if(n !== transition.name) {
                // console.error(current.state, n, transition.name);
                throw new Error('this shouldn\'t be happening');
              }
            }
          }
          move = {dir: transition.dir, name: transition.name, op: transition.op, group: transition.group};
        }
      	var next = {
          state: nextState,
          offset: nextOffset,
          move: move,
          names: newNames,
          prev: current,
          observed: observed,
          isEpsilon: transition.isEpsilon || false,
        };
      	frontier.push(next);
      }
    }
  }

  return r;
};

function _getMatch(nfa, input, finalState) {
  var chain = _stateChain(nfa, finalState);
  // chain.forEach(function (c) {
  //   console.log('c', c);
  // })
  // var util = require('util');
  // console.log(util.inspect(chain, false, null));
  var valStack = [];
  var r = {};
  chain.forEach(function (curr) {
    // console.log(curr);
    var nnames = ['ROOT'].concat(curr.names);
    if(curr.isEpsilon) {
      if (curr.move.dir === 'in' && curr.move.group === true) {
        valStack.push(null);
      } else if(curr.move.dir === 'out'  && curr.move.group === true) {
        var finalVal = valStack.pop();
        var path = curr.move.name ? nnames.concat([curr.move.name]) : nnames;
        // console.log(path, finalVal);
        _setToValue(r, path, finalVal);
      }
    } else {
      var currVal = valStack[valStack.length - 1];
      valStack[valStack.length - 1] = _mergeIn(currVal, curr.observed);
    }

  });
  return r['ROOT'];
}

function _mergeIn(acc, val) {
  var r;
  if(acc === null) {
    r = val;
  } else if (!isArray(acc)) {
    r = [acc, val];
  } else {
    r = acc.concat([val]);
  }
  return r;
}

function _setToValue(object, path, value) {
  var o = object;
  for (var i = 0; i < path.length - 1; i++) {
    var n = path[i];
    if (n in o) {
      o = o[n];
    } else {
      o[n] = {};
      o = o[n];
    }
  }
  o[path[path.length - 1]] = value;
}

function _getValue(object, path) {
      var o = object;
      var a = [].concat(path);
      while (a.length) {
          var n = a.shift();
          if (n in o) {
              o = o[n];
          } else {
              return;
          }
      }
      return o;
  }

function _stateChain(nfa, finalState) {
  var chain = [];
  var curr = finalState;
  while(curr) {
    // if(!curr.isEpsilon) {
      chain.unshift({
        offset: curr.offset,
        names: curr.names,
        move: curr.move,
        observed: curr.observed,
        isEpsilon: curr.isEpsilon,
      });
    // }
    curr = curr.prev;
  }
  chain.shift();
  return chain;
}


module.exports = simulate;
