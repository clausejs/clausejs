import isFn from "../preds/isFn";
import fnName from "./fnName";

export default function stringifyWithFnName( subject, currTransform, indent? ) {

  const newArgs = Array.prototype.slice.call( arguments );

  newArgs[ 1 ] = ( key, val ) => {
    let r;
    if ( isFn( val ) ) {
      // implicitly `toString` it
      const n = fnName( val );
      if ( n ) {
        r = `${n}()`;
      } else {
        r = val.toString();
      }
    } else {
      r = val;
    }
    return currTransform ? currTransform( r ) : r;
  };

  return JSON.stringify.apply( this, newArgs );

}
