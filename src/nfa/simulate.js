var Problem = require('../_Problem');
var coerceIntoArray = require('../utils/coerceIntoArray');

var EPSILON = "\u03B5";


var simulate = function(nfa, rawInput) {
  var input = coerceIntoArray(rawInput);
  var initial = { state: 0, offset: 0 };
  var frontier = [initial];
  // console.log('nfa: ', nfa);
  // console.log('input: ', input);
  while (frontier.length > 0) {
    // console.log(frontier);
    var current = frontier.shift();
    // console.log('current: ', current);
    if (current.state === nfa.finalState && current.offset === input.length) {
      return true;
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
      if ((transition === EPSILON || transition(observed)) && nextOffset <= input.length) {
      	var next = { state: nextState, offset: nextOffset };
      	frontier.push(next);
      }
    }
  }

  return false;
};

module.exports = simulate;
