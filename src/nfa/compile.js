
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

function evalSpec(spec) {
  var evalFn;

  if (spec.type === null) {
    throw "Spec has no type: " + spec;
  } else if (!(spec.type in evalFunctions)) {
    evalFn = evalFunctions.PRED;
  } else {
    evalFn = evalFunctions[spec.type];
  }
  var r = evalFn(spec);
  return r;
};


var evalChildThen = function(wrapper) {
  return function(spec) {
    var childFrag = evalSpec(spec.expr);
    return wrapper(childFrag);
  };
};

var evalChildrenThen = function(wrapper) {
  return function(spec) {
    var childFrags = spec.exprs.map(function(child) {
      var s = evalSpec(child.expr);
      s.head.name = child.name;
      // s.name = child.name;
      return s;
    });
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
  return fragment['PRED'](x);
};

function wrapRoot(expr) {
  return new Spec('ROOT', { expr: expr }, null, null);
}

var compile = function(expr) {
  var rootedExpr = wrapRoot(expr);
  var fragment = evalSpec(rootedExpr);

  // var util = require('util');
  // console.log(util.inspect(fragment, false, null));

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
      outTrans[fragTrans.target.index] = fragTrans.spec;
    });
    nfaTransitions[state.index.toString()] = outTrans;
  });
  return {
    initialState: 0,
    numStates: numStates,
    finalState: finalState,
    transitions: nfaTransitions,
    expression: expr,
  };
};

module.exports = compile;
