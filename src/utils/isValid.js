var isProblem = require( './isProblem' );
var isPred = require( './isPred' );
var isClause = require( './isClause' );
var conform = require( './conform' );

function isValid( pred, x ) {
  if ( !pred ) {
    throw new Error( 'Clause is required' );
  } else if ( isClause( pred ) ) {
    return !( isProblem( conform( pred, x ) ) );
  } else if ( isPred( pred ) ) {
    return pred( x );
  } else {
    return true;
  }
}

module.exports = isValid;
