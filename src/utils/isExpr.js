var isPred = require( './isPred' );
var isClause = require( './isClause' );
var isClauseRef = require( './isClauseRef' );
var isDelayedClause = require( './isDelayedClause' );

function isExpr( x ) {
  return isPred( x ) || isClause( x ) || isClauseRef( x ) || isDelayedClause( x );
}

module.exports = isExpr;
