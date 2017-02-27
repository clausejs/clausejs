export default function oneOf( ...args ) {
  var items;

  if ( args.length === 1 && Array.isArray( args[ 0 ] ) ) {
    items = args[ 0 ];
  } else if ( args.length > 0 ) {
    items = Array.prototype.slice.call( args );
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
