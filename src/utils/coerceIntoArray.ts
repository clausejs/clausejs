export default function coerceIntoArray( x ) {
  if ( Array.isArray( x ) === false ) {
    return [ x ];
  } else {
    return x;
  }
}
