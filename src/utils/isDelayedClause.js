var DelayedClause = require( '../models/DelayedClause' );

//TODO
module.exports = function isDelayedClause( x ) {
  return x instanceof DelayedClause;
}
