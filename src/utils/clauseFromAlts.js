var coerceIntoClause = require( './coerceIntoClause' );

module.exports = function clauseFromAlts( alts ) {
  if ( !alts ) {
    console.error( alts );
    throw '!';
  }
  if ( alts.clause ) {
    return alts.clause;
  } else if ( alts.pred ) {
    return coerceIntoClause( alts.pred );
  } else {
    console.error( 'unsupported:', alts );
    throw 'Not implemented';
  }
}
