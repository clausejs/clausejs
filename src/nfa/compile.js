
var util = require('util');
var fragment = require('./fragment.js');

var indexedFragmentStates = function(fragment) {
  var nextIndex = 0;
  var frontier = [fragment.head];
  var states = [];
  while (frontier.length > 0) {
    var state = frontier.pop();
    if (state.index === null) {
      state.index = nextIndex;
      nextIndex++;
      state.transitions.forEach(function(transition) {
	frontier.push(transition.target);
      });
      states.push(state);
    };
  };
  return states;
};

var evalFunctions = {};

function evalSpec(expr) {
  if (expr.type === null) {
    var exprString = util.inspect(expr);
    throw "Expression has no type: " + exprString;
  } else if (!(expr.type in evalFunctions)) {
    throw "No evaluation function for expression type '" + expr.type + "'";
  } else {
    return evalFunctions[expr.type](expr);
  }
};

var evalChildThen = function(wrapper) {
  return function(expr) {
    var childFrag = evalSpec(expr.args[0]);
    return wrapper(childFrag);
  };
};

var evalChildrenThen = function(wrapper) {
  return function(expr) {
    var evalChild = function(child) { return evalSpec(child); };
    var childFrags = expr.args.map(evalChild);
    return wrapper(childFrags);
  };
};

['root',
 'ZERO_OR_MORE',
 'ONE_OR_MORE'].forEach(function (fragName) {
   evalFunctions[fragName] = evalChildThen(fragment[fragName]);
 });

['OR',
 'CAT'].forEach(function (fragName) {
   evalFunctions[fragName] = evalChildrenThen(fragment[fragName]);
 });

evalFunctions.PRED = function(x) {
  var name = x.args[0];
  return fragment['PRED'](name);
};

var compile = function(expr) {
  var fragment = evalSpec(expr);
  var states = indexedFragmentStates(fragment);
  var numStates = states.length;
  var nfaTransitions = {};
  var finalState;
  states.forEach(function(state) {
    if (state.transitions.length === 0) {
      finalState = state.index;
    };
    var outTrans = {};
    state.transitions.map(function(fragTrans) {
      outTrans[fragTrans.target.index] = fragTrans.name;
    });
    nfaTransitions[state.index] = outTrans;
  });
  return {
    initialState: 0,
    numStates: numStates,
    finalState: finalState,
    transitions: nfaTransitions,
    expression: expr
  };
};

module.exports = compile;
