var isSpec = require( './isSpec' );

function isFspec( x ) {
  return isSpec( x ) && x.type === 'FSPEC';
}

module.exports = isFspec;
