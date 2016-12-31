var isClause = require( '../utils/isClause' );

function conform( clause, x ) {
  if ( clause && isClause( clause ) ) {
    var r = clause.conform( x );
    return r;
  } else {
    throw new Error( 'Expression needs to be of type Clause. expression: ' + clause + ', offending value: ' + x );
  }
}

module.exports = conform;
