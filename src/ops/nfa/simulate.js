var isProblem = require('../../utils/isProblem');

function simulate(nfa, rawInput, walkFn, walkOpts) {
  var { conform, instrument, trailblaze } = walkOpts;
  var input;

  var r = {
    matched: false,
    chain: null,
  };

  var initial = { state: 0, offset: 0, leftOff: 0, input: [rawInput], groupCount: 0, arrayed: false };
  var frontier = [initial];
  while (frontier.length > 0) {
    var current = frontier.shift();
    var { offset: currentOffset, leftOff, input, groupCount, arrayed } = current;
    if (current.state === nfa.finalState && currentOffset === input.length) {
      r.matched = true;
      r.chain = _stateChain(nfa, current, walkFn, walkOpts);
      return r;
    }
    for (var nextStateStr in nfa.transitions[current.state]) {
      var nextState = parseInt(nextStateStr);
        var observed = input[currentOffset];
        var transition = nfa.transitions[current.state][nextState];

        if(transition.group === 'in') {
          if (groupCount === 0) {
            if (Array.isArray(input[0])) {
              input = input[0];
              currentOffset = 0;
              arrayed = true;
            }
          }
          groupCount += 1;

        } else if (transition.group === 'out') {
          groupCount -= 1;
          if (groupCount === 0) {
            if(arrayed) {
              if(currentOffset === input.length) {
                currentOffset = 1;
              } else {
                currentOffset = 0;
              }
              input = [input];
            }
            arrayed = false;
          }
        }

        var nextOffset;
        var move;
        if(!transition.isEpsilon) {
          nextOffset = currentOffset + 1;
        } else {
          nextOffset = currentOffset;
        }

        var validateResult, next;
        if (nextOffset <= input.length) {
          if (transition.isEpsilon) {
            if(transition.dir) {
              move = {dir: transition.dir, name: transition.name, op: transition.op, group: transition.group};
            } else {
              move = null;
            }
            next = {
              input, groupCount, arrayed, leftOff,
              state: nextState,
              offset: nextOffset,
              move: move,
              spec: transition,
              prev: current,
              isEpsilon: true,
            };

            frontier.push(next);
          } else {
            if(conform || instrument || trailblaze) {
              validateResult = walkFn(transition, observed, { trailblaze: true });
              // validateResult = walkFn(transition, observed, walkOpts);
              if(!isProblem(validateResult)) {
                if(currentOffset < input.length) {
                  move = { dir: 'pred' };
                  next = {
                    input, groupCount, arrayed, leftOff,
                    state: nextState,
                    offset: nextOffset,
                    move: move,
                    prev: current,
                    isEpsilon: false,
                    spec: transition,
                    observed: observed,
                  };
                  frontier.push(next);
                }
              } else {
                r.lastProblem = validateResult;
              }
            }
          }
        }
    }
  }

  return r;
};

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


module.exports = simulate;
