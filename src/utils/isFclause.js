var isClause = require( './isClause' );

function isFclause( x ) {
  return isClause( x ) && x.type === 'FSPEC';
}

module.exports = isFclause;
