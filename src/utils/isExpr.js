var isPred = require( './isPred' );
var isSpec = require( './isSpec' );
var isSpecRef = require( './isSpecRef' );
var isDelayedSpec = require( './isDelayedSpec' );

function isExpr( x ) {
  return isPred( x ) || isSpec( x ) || isSpecRef( x ) || isDelayedSpec( x );
}

module.exports = isExpr;
