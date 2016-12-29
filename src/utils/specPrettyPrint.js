 // TODO
const stringifyWithFnName = require( './stringifyWithFnName' );

function specPrettyPrint( spec ) {
  if ( !spec ) {
    return '';
  }
  return stringifyWithFnName( spec, null, 2 );
}

module.exports = specPrettyPrint;
