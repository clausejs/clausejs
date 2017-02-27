import fnName from "../utils/fnName";
import namedFn from "../utils/namedFn";

export default function instanceOf( t ) {
  const n = fnName( t );
  
  var _f : any;
    _f = function instanceOfX( x ) {
      return (x instanceof t);
    };
    if(n) {
      _f = namedFn( `instanceOf_${n}`, _f );
    }

  return _f;
}
