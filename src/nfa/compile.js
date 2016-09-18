
var fragment = require('./fragment.js');
var Spec = require('../_Spec');

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
  var evalFn;

  if (expr.type === null) {
    throw "Expression has no type: " + expr;
  } else if (!(expr.type in evalFunctions)) {
    evalFn = evalFunctions.PRED;
  } else {
    evalFn = evalFunctions[expr.type];
  }
  var r = evalFn(expr);
  return r;
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

['ROOT',
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

function wrapRoot(expr) {
  return new Spec('ROOT', expr, null, null);
}

var compile = function(expr) {
  var rootedExpr = wrapRoot(expr);
  var fragment = evalSpec(rootedExpr);
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
    nfaTransitions[state.index.toString()] = outTrans;
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
