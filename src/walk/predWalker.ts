import fnName from "../utils/fnName";
import Problem from "../models/Problem";

export default function predWalker( clause ) {
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