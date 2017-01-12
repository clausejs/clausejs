var Problem = require( '../models/Problem' );
var isProblem = require( '../utils/isProblem' );
var clauseFromAlts = require( '../utils/clauseFromAlts' );
var oAssign = require( '../utils/objectAssign' );

function andWalker( clause, walkFn ) {
  var exprs = clause.opts.conformedExprs.map( clauseFromAlts );

  return {
    trailblaze: andTrailblaze,
    reconstruct: andReconstruct,
  };

  function andTrailblaze( data, walkOpts ) {
    var r = data;
    var conforms = [];
    var problems = [];

    for ( var i = 0; i < exprs.length; i += 1 ) {
      var currData = ( i === 0 ) ? data : conforms[ i - 1 ];
      r = walkFn( exprs[ i ], currData, walkOpts );
      if ( isProblem( r ) ) {
        problems.push( r );
        break;
      } else {
        var conformedR = walkFn( exprs[ i ], r, oAssign( {}, walkOpts, { phase: 'reconstruct' } ) );
        conforms.push( conformedR );
      }
    }

    if ( problems.length === 0 ) {
      return { conforms };
    } else {
      return new Problem( data, exprs, problems, 'One or more expressions failed AND test' );
    }
  }

  function andReconstruct( { conforms } ) {
    //TODO: implement propagated conform. Perhaps as an option propagateConform
    // or as a separate clause construct such as "propagate"
    return conforms[ exprs.length - 1 ];
  }
}

module.exports = andWalker;
