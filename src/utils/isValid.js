var isProblem = require( './isProblem' );
var isPred = require( './isPred' );
var isClause = require( './isClause' );
var conform = require( './conform' );

function isValid( expr, x ) {
  if ( !expr ) {
    throw new Error( 'Clause is required' );
  } else if ( isClause( expr ) ) {
    return !( isProblem( conform( expr, x ) ) );
  } else if ( isPred( expr ) ) {
    return expr( x );
  } else {
    return true;
  }
}

module.exports = isValid;
