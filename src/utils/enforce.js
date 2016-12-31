var isProblem = require( './isProblem' );
// TODO : replace with checkProblem
var conform = require( './conform' );

module.exports = function enforce( clause, x ) {
  const r = conform( clause, x );
  if ( isProblem( r ) ) {
    throw r;
  }
  return undefined;
};
