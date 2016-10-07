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
      if(!transition.isEpsilon) {
        nextOffset = current.offset + 1;
      } else {
        nextOffset = current.offset;
      }
      if ((transition.isEpsilon ||
           !isProblem(transition.conform(observed))) &&
          nextOffset <= input.length) {

        var newNames = current.names.concat([]);
        var move;
        if(transition.nameIn !== undefined) {
          if(transition.nameIn !== null) {
            newNames.push(transition.nameIn);
          }
          move = {dir: 'in', name: transition.nameIn, op: transition.op, group: transition.group};
        } else if (transition.nameOut !== undefined) {
          if(transition.nameOut !== null) {
            var n = newNames.pop();
            if(n !== transition.nameOut) {
              // console.error(current.state, n, transition.nameOut);
              throw new Error('this shouldn\'t be happening');
            }
          }
          move = {dir: 'out', name: transition.nameOut, op: transition.op, group: transition.group};
        }
      	var next = {
          state: nextState,
          offset: nextOffset,
          move: move,
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
  // chain.forEach(function (c) {
  //   console.log('c', c);
  // })
  // var util = require('util');
  // console.log(util.inspect(chain, false, null));
  var r = {};
  chain.forEach(function (curr) {
    var nnames = ['ROOT'].concat(curr.names);
    if(curr.move.dir === 'in' &&
      (nnames[nnames.length -1] === curr.move.name || curr.move.group)) {

      _setToValue(r, nnames, curr.observed, curr.move.group);
    }
  });
  return r['ROOT'];
}

function _setToValue(object, path, value, group) {
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
  if(!group) {
    o[path[path.length - 1]] = value;
  } else {
    if(o[path[path.length - 1]] === undefined) {
      o[path[path.length - 1]] = [value];
    } else if (!isArray(o[path[path.length - 1]])) {
      o[path[path.length - 1]] = [o[path[path.length - 1]]];
    } else {
      o[path[path.length - 1]] = o[path[path.length - 1]].concat([value]);
    }
  }

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
      });
    // }
    curr = curr.prev;
  }
  chain.shift();
  return chain;
}


module.exports = simulate;
