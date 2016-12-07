var fnName = require( '../utils/fnName' );
var Problem = require( '../models/Problem' );

function predWalker( spec ) {
  return {
    trailblaze: predTraiblaze,
    reconstruct: predReconstruct,
  }

  function predTraiblaze( x ) {
    var predFn = spec.exprs[ 0 ];
    if ( !predFn( x ) ) {
      return new Problem( x, spec, [], 'Predicate ' + fnName( predFn ) + '() returns false' );
    } else {
      return x;
    }
  }

  function predReconstruct( x ) {
    return x;
  }
}

module.exports = predWalker;
