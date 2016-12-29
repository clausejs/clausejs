const isFn = require( '../preds/isFn' );
const fnName = require( './fnName' );

function stringifyWithFnName( subject, currTransform ) {

  if ( !subject ) {
    return '';
  } else {
    var newArgs = Array.prototype.slice.call( arguments );

    newArgs[ 1 ] = ( key, val ) => {
      var r;
      if ( isFn( val ) ) {
        // implicitly `toString` it
        var n = fnName( val );
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

}

module.exports = stringifyWithFnName;
