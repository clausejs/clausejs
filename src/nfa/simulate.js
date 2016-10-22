var Problem = require('../models/Problem');
var isProblem = require('../utils/isProblem');
var isArray = require('isarray');
var oAssign = require('object-assign');

function simulate(nfa, rawInput) {
  var input;

  if(!isArray(rawInput)) {
    input = [rawInput];
  } else {
    input = rawInput;
  }

  var r = {
    matched: false,
    result: null,
  };

  var initial = { state: 0, offset: 0 };
  // var names = [];
  var frontier = [initial];
  // console.log('input: ', input);
  // var util = require('util');
  // console.log('nfa', util.inspect(nfa, false, null));
  while (frontier.length > 0) {
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
        if(transition.isEpsilon) {
          if(transition.dir) {
            move = {dir: transition.dir, name: transition.name, op: transition.op, group: transition.group};
          } else {
            move = null;
          }
        } else {
          move = { dir: 'pred' };
        }
      	var next = {
          state: nextState,
          offset: nextOffset,
          move: move,
          prev: current,
          isEpsilon: transition.isEpsilon || false,
        };
        if(!transition.isEpsilon) {
          next.observed = observed;
        }
      	frontier.push(next);
      }
    }
  }

  return r;
};

var FOLD = function() {};
var ENTER = function() {};
var MAYBE_ENTER = function() {};
// var FOLD = 'FOLD';
// var ENTER = 'ENTER';
// var MAYBE_ENTER = 'MAYBE_ENTER';
var Name = function(n) { this.value = n; };
var ArrayFragment = function(val) { this.value = val; };

function _getMatch(nfa, input, finalState) {
  var chain = _stateChain(nfa, finalState);
  // chain.forEach(function (c) {
  //   console.log('c', c);
  // })
  // var util = require('util');
  // console.log(util.inspect(chain, false, null));
  var valStack = [];
  var r = {};
  // console.log(chain);
  // console.log('-------------------');
  chain.forEach(function (curr) {
    // console.log(curr, valStack);
    if(curr.move) {
      switch(curr.move.dir) {
        case 'enter' : {
          valStack.push(ENTER);
        } break;
        case 'maybe_enter' : {
          valStack.push(MAYBE_ENTER);
        } break;
        case 'in': {
          valStack.push(new Name(curr.move.name));
        } break;
        case 'loop': {
          if(valStack[valStack.length - 1] !== null) {
            valStack.push(FOLD);
          }
        } break;
        case 'pred': {
          valStack.push(curr.observed);
        } break;
        case 'out': {
          var val = valStack.pop();
          if(!(val instanceof Name)) {
            var name = valStack.pop().value;
            var newAcc;
            if(name === null || name === undefined) {
              newAcc = new ArrayFragment(val);
            } else {
              newAcc = {};
              newAcc[name] = val;
            }
            valStack.push(newAcc);
          }
        } break;
        case 'maybe_exit': {
          var c = valStack.pop();
          var acc = null;
          while(c!==MAYBE_ENTER) {
            if(c!==FOLD) {
              acc = _foldIn(acc, c);
            }
            c = valStack.pop();
          }
          if(acc === null) {
            acc = [];
          }
          valStack.push(acc);
        } break;
        case 'exit': {
          var c = valStack.pop();
          var acc = null;
          while(c!==ENTER) {
            if(c instanceof ArrayFragment) {
              if(acc === null) {
                acc = c.value;
              } else {
                acc = [c.value].concat(acc);
              }
            } else {
              acc = oAssign({}, c, acc);
            }
            c = valStack.pop();
          }
          if(acc === null) {
            acc = [];
          }
          valStack.push(acc);
        } break;
        default: console.error(curr); throw 'FUUU';
      }
    }
    // console.log(curr, valStack);
  });
  if(valStack.length !== 1) {
    console.error(valStack);
     throw 'FUUU2';
  }
  var r = valStack.pop();
  return r;
}

function _last(arr) {
  return arr[arr.length - 1];
}

function _foldIn(acc, val) {
  var r;
  if(acc === null) {
    r = [val];
  } else if (!isArray(acc)) {
    r = [val, acc];
  } else {
    r = [val].concat(acc);
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
  var prev;
  while(curr) {
    if(!prev || (curr.state !== prev.state) && curr.move) {
          // console.log(curr.isEpsilon, curr.move, curr.state);
      var o = {
        isEpsilon: curr.isEpsilon,
        move: curr.move,
        state: curr.state,
      };
      if(!curr.isEpsilon) {
        o.observed = curr.observed;
      }
      chain.unshift(o);
    }
    prev = curr;
    curr = curr.prev;
  }
  // console.log(chain);
  return chain;
}


module.exports = simulate;
