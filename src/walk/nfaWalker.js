var simulate = require( '../core/nfa/simulate' );
var getMatch = require( '../core/nfa/getMatch' )
var compile = require( '../core/nfa/compile' );
var Problem = require( '../models/Problem' );

function nfaWalker( clause, walkFn ) {
  var nfa;

  return {
    trailblaze: nfaTrailblaze,
    reconstruct: nfaReconstruct,
  }

  function nfaTrailblaze( x, walkOpts ) {

    if ( !nfa ) {
      //lazy
      nfa = compile( clause );
    }
    var { chain, matched, lastProblem } = simulate( nfa, x, walkFn, walkOpts );
    if ( matched === true ) {
      return { chain };
    } else {
      let subproblems;

      if ( lastProblem ) {
        let { name, position, problem } = lastProblem;
        subproblems = { [ name ? `"${name}"` : `<At position ${position}>` ]: problem };
      } else {
        subproblems = [];
      }
      return new Problem( x, clause, subproblems, 'Clause ' + clause.type + ' did not match value' );
    }
  }

  function nfaReconstruct( { chain }, walkOpts ) {
    var result = getMatch( chain, walkFn, walkOpts );
    return result;
  }
}

module.exports = nfaWalker;
