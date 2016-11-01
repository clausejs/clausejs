var Problem = require('../models/Problem');
var isProblem = require('../utils/isProblem');
var isArray = require('isarray');
var oAssign = require('object-assign');
var isUndefined = require('../preds/isUndefined');

function simulate(nfa, rawInput, walkFn, walkOpts) {
  var { conform, instrument } = walkOpts;
  // console.log('------raw------');
  // console.log(rawInput);
  // console.log('---------------');
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
      r.result = _getMatch(nfa, rawInput, current, walkOpts);
      // console.log('-------r--------');
      // console.log(r);
      // console.log('----------------');
      return r;
    }
    for (var nextStateStr in nfa.transitions[current.state]) {
      var nextState = parseInt(nextStateStr);
      // console.log(current.offset, input);
        var observed = input[current.offset];
        var transition = nfa.transitions[current.state][nextState];
        var nextOffset;
        var move;
        if(!transition.isEpsilon) {
          nextOffset = current.offset + 1;
        } else {
          nextOffset = current.offset;
        }

        var conformed, next;
        if (nextOffset <= input.length) {
          if (transition.isEpsilon) {
            if(transition.dir) {
              move = {dir: transition.dir, name: transition.name, op: transition.op, group: transition.group};
            } else {
              move = null;
            }
            next = {
              state: nextState,
              offset: nextOffset,
              move: move,
              prev: current,
              isEpsilon: true,
            };

            frontier.push(next);
          } else {
            if(conform || instrument) {
              conformed = walkFn(transition, observed, walkOpts);
              if(!isProblem(conformed)) {
                if(current.offset < input.length) {
                  move = { dir: 'pred' };
                  next = {
                    state: nextState,
                    offset: nextOffset,
                    move: move,
                    prev: current,
                    isEpsilon: false,
                    observed: observed,
                    conformed: conformed,
                  };
                  frontier.push(next);
                }
              } else {
                r.lastProblem = conformed;
              }
            }
          }
        }
    }
  }

  return r;
};

var FOLD = function() {};
var ENTER = function() {};
var MULTI_ENTER = function() {};
var MAYBE_ENTER = function() {};
var MAYBE_SINGLE_ENTER = function() {};
// var FOLD = 'FOLD';
// var ENTER = 'ENTER';
// var MAYBE_ENTER = 'MAYBE_ENTER';
var Name = function(n) { this.value = n; };
var ArrayFragment = function(val) { this.value = val; };

function _getMatch(nfa, input, finalState, walkOpts) {
  var { conform, instrument } = walkOpts;
  var chain = _stateChain(nfa, finalState);
  // console.log(input);
  // console.log('---------chain----------');
  // var util = require('util');
  // console.log(util.inspect(chain, false, null));
  // console.log('------------------------');
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
        case 'multi_enter' : {
          valStack.push(MULTI_ENTER);
        } break;
        case 'maybe_enter' : {
          valStack.push(MAYBE_ENTER);
        } break;
        case 'maybe_single_enter' : {
          valStack.push(MAYBE_SINGLE_ENTER);
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
          valStack.push(curr.conformed);
        } break;
        case 'out': {
          var val = valStack.pop();
          if(!(val instanceof Name)) {
            var name = valStack.pop().value;
            var newAcc;
            if(name === null || name === undefined || !conform) {
              newAcc = new ArrayFragment(val);
            } else {
              newAcc = {};
              if(!isUndefined(val)) {
                newAcc[name] = val;
              }
            }
            valStack.push(newAcc);
          }
        } break;
        case 'maybe_single_exit': {
          var c = valStack.pop();
          var acc = null;
          while(c!==MAYBE_SINGLE_ENTER) {
            acc = c;
            c = valStack.pop();
          }
          if(acc === null) {
            acc = undefined;
          }
          valStack.push(acc);
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
        case 'multi_exit': {
          var c = valStack.pop();
          var acc = null;
          while(c!==MULTI_ENTER) {
            if(c instanceof ArrayFragment) {
              if(acc === null) {
                acc = [c.value];
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
        o.conformed = curr.conformed;
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
