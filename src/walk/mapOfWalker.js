var specFromAlts = require( '../utils/specFromAlts' );
var isProblem = require( '../utils/isProblem' );
var Problem = require( '../models/Problem' );

function mapOfWalker( spec, walkFn ) {
  var { keySpecAlts, valSpecAlts } = spec.opts;
  var keySpec = keySpecAlts && specFromAlts( keySpecAlts );
  var valSpec = valSpecAlts && specFromAlts( valSpecAlts );

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

  function mapOfReconstruct( { val }, walkOpts ) {
    return val;
  }

}
module.exports = mapOfWalker;
