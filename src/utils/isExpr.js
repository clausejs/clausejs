var isPred = require( './isPred' );
var isSpec = require( './isSpec' );
var isSpecRef = require( './isSpecRef' );

function isExpr( x ) {
  return isPred( x ) || isSpec( x ) || isSpecRef( x );
}

module.exports = isExpr;
