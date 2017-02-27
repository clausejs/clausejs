import isProblem from "../../utils/isProblem";
import isStr from "../../preds/isStr";

export default function simulate( nfa, rawInput, walkFn, walkOpts ) {

  var r: any = {
    matched: false,
    chain: null,
  };

  const inputType = typeof rawInput;

  var initial = {
    state: 0,
    offset: 0,
    input: [ rawInput ],
    groupCount: 0,
    arrayed: false };
  var frontier = [ initial ];
  while ( frontier.length > 0 ) {
    var current = frontier.shift();
    const { offset: currentOffset, input } = current;
    if ( current.state === nfa.finalState && currentOffset === input.length ) {
      r.matched = true;
      r.chain = _getChain( nfa, current, inputType );
      return r;
    }
    for ( var nextStateStr in nfa.transitions[ current.state ] ) {
      var nextState = parseInt( nextStateStr );

      var m = _getNextMove( nfa, nextState, current, walkFn, walkOpts );
      if ( m ) {
        if ( m.isProblem ) {
          let { name, problem, position } = m;
          r.lastProblem = { name, problem, position };
        } else {
          frontier.push( m );
        }
      }
    }
  }
  return r;
}

function _getNextMove( nfa, nextState, current, walkFn, walkOpts ) {
  var { input, offset: currentOffset, groupCount, arrayed } = current;
  var observed = input[ currentOffset ];
  var transition = nfa.transitions[ current.state ][ nextState ];

  if ( transition.group === 'in' ) {
    if ( groupCount === 0 ) {
      if ( Array.isArray( input[ 0 ] ) || isStr( input [ 0 ] ) ) {
        input = input[ 0 ];
        currentOffset = 0;
        arrayed = true;
      }
    }
    groupCount += 1;

  } else if ( transition.group === 'out' ) {
    groupCount -= 1;
    if ( groupCount === 0 ) {
      if ( arrayed ) {
        if ( currentOffset === input.length ) {
          currentOffset = 1;
        } else {
          currentOffset = 0;
        }
        input = [ input ];
      }
      arrayed = false;
    }
  }

  var nextOffset;
  var move;
  if ( !transition.isEpsilon ) {
    nextOffset = currentOffset + 1;
  } else {
    nextOffset = currentOffset;
  }

  var validateResult,
    next;

  var name = transition.name || current.move && current.move.name;
  if ( nextOffset <= input.length ) {
    if ( transition.isEpsilon ) {
      if ( transition.dir ) {
        move = {
          dir: transition.dir,
          name: transition.name,
          op: transition.op,
          group: transition.group
        };
      } else {
        move = null;
      }
      next = {
        input, groupCount, arrayed,
        state: nextState,
        offset: nextOffset,
        move: move,
        clause: transition,
        prev: current,
        isEpsilon: true,
      };
      return next;
    } else {
      validateResult = walkFn( transition, observed, walkOpts );
              // validateResult = walkFn(transition, observed, walkOpts);
      if ( !isProblem( validateResult ) ) {
        if ( currentOffset < input.length ) {
          move = { dir: 'clause' };
          next = {
            input, groupCount, arrayed,
            state: nextState,
            offset: nextOffset,
            move: move,
            prev: current,
            isEpsilon: false,
            clause: transition,
            guide: validateResult,
          };
          return next;
        }
      } else {
        return { isProblem: true, problem: validateResult, name: name, position: currentOffset };
      }
    }
  }
}

function _getChain( nfa, finalState, inputType ) {
  var chain: any = [];
  var curr = finalState;
  var prev;
  while ( curr ) {
    if ( !prev || ( curr.state !== prev.state ) && curr.move ) {
      var o: any = {
        isEpsilon: curr.isEpsilon,
        move: curr.move,
        state: curr.state,
      };
      if ( !curr.isEpsilon ) {
        o.guide = curr.guide;
        o.clause = curr.clause;
      }
      chain.unshift( o );
    }
    prev = curr;
    curr = curr.prev;
  }
  chain.inputType = inputType;
  return chain;
}
