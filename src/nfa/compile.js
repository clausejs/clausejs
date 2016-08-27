
var util = require('util');
var fragment = require('./fragment.js');

var indexedFragmentStates = function(fragment) {
  var nextIndex = 0;
  var frontier = [fragment.head];
  var states = [];
  while (frontier.length > 0) {
    var state = frontier.pop();
    if (state.index == null) {
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
var evalSpec = function(expr) {
  if (expr.type == null) {
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
    var childFrag = evalSpec(expr.children[0]);
    return wrapper(childFrag);
  };
};

var evalChildrenThen = function(wrapper) {
  return function(expr) {
    var evalChild = function(child) { return evalSpec(child); };
    var childFrags = expr.children.map(evalChild);
    return wrapper(childFrags);
  };
};

evalFunctions.root = evalChildThen(fragment.root);
evalFunctions.concatenation = evalChildrenThen(fragment.concatenation);
evalFunctions.alternation = evalChildrenThen(fragment.alternation);
evalFunctions.zeroOrMore = evalChildThen(fragment.zeroOrMore);
evalFunctions.oneOrMore = evalChildThen(fragment.oneOrMore);
evalFunctions.zeroOrOne = evalChildThen(fragment.zeroOrOne);
evalFunctions.predicate = function(expr) {
  var name = expr.data.name;
  return fragment.predicate(name);
};

var compile = function(specOrPred) {
  var fragment = evalSpec(specOrPred);
  var util=require('util');
  var states = indexedFragmentStates(fragment);
  var numStates = states.length;
  var nfaTransitions = {};
  var finalState;
  states.forEach(function(state) {
    if (state.transitions.length == 0) {
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
    spec: specOrPred
  };
};

module.exports = compile;
