var isProblem = require( './isProblem' );
// TODO : replace with checkProblem
var conform = require( './conform' );

module.exports = function enforce( spec, x ) {
  const r = conform( spec, x );
  if ( isProblem( r ) ) {
    throw r;
  }
  return undefined;
};
