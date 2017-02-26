import fnName from "../utils/fnName";
import namedFn from "../utils/namedFn";

export default function instanceOf( t ) {
  const n = fnName( t );

  var fn: { (): (x: any) => Boolean;  __predToString: () => String; };

  fn = (() => {
    var _f : any;
    _f = function instanceOfX( x ) {
      return (x instanceof t);
    };
    if(n) {
      _f = namedFn( `instanceOf_${n}`, _f );
    }
    _f.__predToString = () => {
      return `instanceOf_${n || 'anonymous_type'}_`;
    }
    return _f;
  })();

  return fn;
}
