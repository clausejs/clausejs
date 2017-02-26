import fnName from "../utils/fnName";
import namedFn from "../utils/namedFn";

export default function not( pred ) {
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
