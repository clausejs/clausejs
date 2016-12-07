var simulate = require( '../core/nfa/simulate' );
var getMatch = require( '../core/nfa/getMatch' )
var compile = require( '../core/nfa/compile' );
var Problem = require( '../models/Problem' );

function nfaWalker( spec, walkFn ) {
  var nfa;

  return {
    trailblaze: nfaTrailblaze,
    reconstruct: nfaReconstruct,
  }

  function nfaTrailblaze( x, walkOpts ) {

    if ( !nfa ) {
      //lazy
      nfa = compile( spec );
    }
    var { chain, matched, lastProblem } = simulate( nfa, x, walkFn, walkOpts );
    if ( matched === true ) {
      return chain;
    } else {
      var subproblems = [];
      if ( lastProblem ) {
        subproblems.push( lastProblem );
      }
      return new Problem( x, spec, subproblems, 'Spec ' + spec.type + ' did not match value' );
    }
  }

  function nfaReconstruct( chain, walkOpts ) {
    var result = getMatch( chain, walkFn, walkOpts );
    return result;
  }
}

module.exports = nfaWalker;
