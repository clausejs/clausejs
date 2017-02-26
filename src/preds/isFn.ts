export default function isFunction( x ) {
  var getType = {};
  // (x || false) guarantees returning of boolean type
  return ( x || false ) &&
   [ '[object Function]', '[object GeneratorFunction]' ].indexOf(
    getType.toString.call( x )
   ) >= 0;
}
