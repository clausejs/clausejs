var ClauseRef = require( '../models/ClauseRef' );
// TODO
function isClauseRef( x ) {
  return x instanceof ClauseRef;
}
module.exports = isClauseRef;
