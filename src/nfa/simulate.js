var Problem = require('../_Problem');
var isProblem = require('../utils/isProblem');
var isArray = require('isarray');

var EPSILON = "\u03B5";

function matches(nfa, rawInput) {
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

  var initial = { state: 0, offset: 0 };
  var frontier = [initial];
  // console.log('nfa: ', nfa);
  // console.log('input: ', input);
  while (frontier.length > 0) {
    // console.log(frontier);
    var current = frontier.shift();
    // console.log('current: ', current);
    if (current.state === nfa.finalState && current.offset === input.length) {
      r.matched = true;
      r.result = rawInput;
    }
    for (nextStateStr in nfa.transitions[current.state]) {
      var nextState = parseInt(nextStateStr);
      var observed = input[current.offset];
      var transition = nfa.transitions[current.state][nextState];
      var nextOffset;
      // console.log(transition);
      if(transition !== EPSILON) {
        nextOffset = current.offset + 1;
      } else {
        nextOffset = current.offset;
      }
      if ((transition === EPSILON ||
           !isProblem(transition.conform(observed))) &&
          nextOffset <= input.length) {
      	var next = { state: nextState, offset: nextOffset };
      	frontier.push(next);
      }
    }
  }

  return r;
};



module.exports = matches;
