var specFromAlts = require( '../utils/specFromAlts' );
var isProblem = require( '../utils/isProblem' );
var Problem = require( '../models/Problem' );

function mapOfWalker( spec, walkFn ) {
  var { keyExpression, valExpression } = spec.opts;
  var keySpec = keyExpression && specFromAlts( keyExpression );
  var valSpec = valExpression && specFromAlts( valExpression );

  return {
    trailblaze: mapOfTrailblaze,
    reconstruct: mapOfReconstruct,
  };

  function mapOfTrailblaze( x, walkOpts ) {
    for ( let key in x ) {
      if ( x.hasOwnProperty( key ) ) {
        if ( keySpec ) {
          let keyR = walkFn( keySpec, key, walkOpts );
          if ( isProblem( keyR ) ) {
            return new Problem( x, spec, { [ key ]: keyR }, `mapOf: key ${key} failed validation` );
          }
        }

        if ( valSpec ) {
          let valR = walkFn( valSpec, x[ key ], walkOpts );
          if ( isProblem( valR ) ) {
            return new Problem( x, spec, { [ key ]: valR }, `mapOf: value for key ${key} failed validation` );
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
