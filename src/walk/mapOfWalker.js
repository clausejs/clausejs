var clauseFromAlts = require( '../utils/clauseFromAlts' );
var isProblem = require( '../utils/isProblem' );
var Problem = require( '../models/Problem' );

function mapOfWalker( clause, walkFn ) {
  var { keyExpression, valExpression } = clause.opts;
  var keyClause = keyExpression && clauseFromAlts( keyExpression );
  var valClause = valExpression && clauseFromAlts( valExpression );

  return {
    trailblaze: mapOfTrailblaze,
    reconstruct: mapOfReconstruct,
  };

  function mapOfTrailblaze( x, walkOpts ) {
    for ( let key in x ) {
      if ( x.hasOwnProperty( key ) ) {
        if ( keyClause ) {
          let keyR = walkFn( keyClause, key, walkOpts );
          if ( isProblem( keyR ) ) {
            return new Problem( x, clause, { [ key ]: keyR }, `mapOf: key ${key} failed validation` );
          }
        }

        if ( valClause ) {
          let valR = walkFn( valClause, x[ key ], walkOpts );
          if ( isProblem( valR ) ) {
            return new Problem( x, clause, { [ key ]: valR }, `mapOf: value for key ${key} failed validation` );
          }
        }
      }
    }
    return { val: x };
  }

  function mapOfReconstruct( { val } ) {
    return val;
  }

}
module.exports = mapOfWalker;
