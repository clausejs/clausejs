var isClause = require( '../utils/isClause' );

function conform( clause, x, options ) {
  if ( clause && isClause( clause ) ) {
    var r = clause.conform( x );
    return r;
  } else {
    throw new Error( 'Expression needs to be of type Clause. expression: \n' + clause + '\n offending value: ' + x );
  }
}

module.exports = conform;
