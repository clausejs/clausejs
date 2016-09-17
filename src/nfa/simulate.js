var Problem = require('../_Problem');

var simulate = function(nfa, expr, input) {
  var initial = { state: 0, offset: 0 };
  var frontier = [initial];
  while (frontier.length > 0) {
    var current = frontier.shift();
    if (current.state === nfa.finalState && current.offset === input.length) {
      return true;
    }
    for (nextState in nfa.transitions[current.state]) {
      var observed = input[current.offset];
      var transition = nfa.transitions[current.state][nextState];
      var nextOffset = current.offset + transition.increment;
      if (transition.predicate(observed) && nextOffset <= input.length) {
      	var next = { state: nextState, offset: nextOffset };
      	frontier.push(next);
      }
    }
  }

  return false;
};

module.exports = simulate;
