var fnName = require( '../utils/fnName' );
var namedFn = require( '../utils/namedFn' );

module.exports = function instanceOf( t ) {
  var n = fnName( t );

  var fn = function instanceOfX( x ) {
    return x instanceof t;
  };

  if ( n ) {
    fn = namedFn( `instanceOf_${n}`, fn );
  }

  fn.__predToString = () => {
    return `instanceOf(${n || '(anonymous_type)'})`;
  }

  return fn;
}
