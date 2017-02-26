export default function repeat( n, x ) {
  var arr = [],
    i;
  for ( i = 0; i < n; i++ ) {
    arr.push( x );
  }
  return arr;
}