var isClause = require( './isClause' );

function isFclause( x ) {
  return isClause( x ) && x.type === 'FCLAUSE';
}

module.exports = isFclause;
