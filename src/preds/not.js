var fnName = require( '../utils/fnName' );
var namedFn = require( '../utils/namedFn' );

function not( pred ) {
  var n = fnName( pred );

  var negated = ( x ) => {
    return !pred( x );
  };

  if ( n ) {
    return namedFn( `not_${n}`, negated );
  } else {
    return negated;
  }
}

module.exports = not;
