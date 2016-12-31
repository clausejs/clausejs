var Clause = require( '../models/Clause' );

function isClause( x ) {
  return x instanceof Clause;
}

module.exports = isClause;
