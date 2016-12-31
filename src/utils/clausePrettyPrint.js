 // TODO
const stringifyWithFnName = require( './stringifyWithFnName' );

function clausePrettyPrint( clause ) {
  if ( !clause ) {
    return '';
  }
  return stringifyWithFnName( clause, null, 2 );
}

module.exports = clausePrettyPrint;
