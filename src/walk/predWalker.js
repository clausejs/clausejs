var fnName = require( '../utils/fnName' );
var Problem = require( '../models/Problem' );

function predWalker( clause ) {
  return {
    trailblaze: predTraiblaze,
    reconstruct: predReconstruct,
  }

  function predTraiblaze( x ) {
    var predFn = clause.exprs[ 0 ];
    if ( !predFn( x ) ) {
      return new Problem( x, clause, [], 'Predicate ' + fnName( predFn ) + '() returns false' );
    } else {
      return x;
    }
  }

  function predReconstruct( x ) {
    return x;
  }
}

module.exports = predWalker;
