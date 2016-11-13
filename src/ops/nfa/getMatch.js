var oAssign = require('object-assign');
var Problem = require('../../models/Problem');
var isUndefined = require('../../preds/isUndefined');

var FOLD = function() {};
var ENTER = function() {};
var MULTI_ENTER = function() {};
var MAYBE_ENTER = function() {};
var MAYBE_SINGLE_ENTER = function() {};

var Name = function(n) { this.value = n; };
var ArrayFragment = function(val) { this.value = val; };

function getMatch(nfa, input, finalState, walkFn, walkOpts) {
  var { conform, instrument } = walkOpts;
  var chain = _stateChain(nfa, finalState, walkFn, walkOpts);
  var valStack = [];
  var r = {};

  chain.forEach(function (curr) {
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
            if(c!==FOLD) {
              acc = c;
            }
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
  });
  if(valStack.length !== 1) {
    console.error(valStack);
     throw 'FUUU2';
  }
  var r = valStack.pop();
  return r;
}

function _foldIn(acc, val) {
  var r;
  if(acc === null) {
    r = [val];
  } else if (!Array.isArray(acc)) {
    r = [val, acc];
  } else {
    r = [val].concat(acc);
  }
  return r;
}

function _stateChain(nfa, finalState, walkFn, walkOpts) {
  var chain = [];
  var curr = finalState;
  var prev;
  while(curr) {
    if(!prev || (curr.state !== prev.state) && curr.move) {
      var o = {
        isEpsilon: curr.isEpsilon,
        move: curr.move,
        state: curr.state,
      };
      if(!curr.isEpsilon) {
        o.observed = curr.observed;
        o.conformed = walkFn(curr.spec, curr.observed, walkOpts);
      }
      chain.unshift(o);
    }
    prev = curr;
    curr = curr.prev;
  }
  return chain;
}

module.exports = getMatch;
