export default function oneOf( ) {
  var items;

  if ( arguments.length === 1 && Array.isArray( arguments[ 0 ] ) ) {
    items = arguments[ 0 ];
  } else if ( arguments.length > 0 ) {
    items = Array.prototype.slice.call( arguments );
  } else {
    throw new Error( 'Items list is required.' );
  }

   var fn: { (): any;  __predToString: () => String; };

    fn = (() => {
        var _f : any = function oneOf( x ) {
          return items.indexOf( x ) >= 0;
        };
        _f.__predToString = () => {
          return Array.from('oneOf(').concat( [ items.map( JSON.stringify ).join( ', ' ) ] ).concat( ')' );
        }
        return _f;
    })();
  
  return fn;
}
