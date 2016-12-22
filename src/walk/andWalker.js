var Problem = require( '../models/Problem' );
var isProblem = require( '../utils/isProblem' );
var specFromAlts = require( '../utils/specFromAlts' );

function andWalker( spec, walkFn ) {
  var exprs = spec.opts.conformedExprs.map( specFromAlts );

  return {
    trailblaze: andTrailblaze,
    reconstruct: andReconstruct,
  };

  function andTrailblaze( data, walkOpts ) {
    var r = data;
    var problems = [];

    for ( var i = 0; i < exprs.length; i += 1 ) {
      r = walkFn( exprs[ i ], data, walkOpts );
      if ( isProblem( r ) ) {
        problems.push( r );
         //TODO: better handling of this
        break;
      }
    }

    if ( !problems || problems.length === 0 ) {
      return data;
    } else {
      return new Problem( data, exprs, problems, 'One or more expressions failed AND test' );
    }
  }

  function andReconstruct( data ) {
    //TODO: implement propagated conform. Perhaps as an option propagateConform
    // or as a separate spec construct such as "propagate"
    return data;
  }
}

module.exports = andWalker;
