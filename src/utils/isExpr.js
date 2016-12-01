var isPred = require( './isPred' );
var isSpec = require( './isSpec' );

function isExpr( x ) {
  return isPred( x ) || isSpec( x );
}

module.exports = isExpr;
