import isObj from "./isObj";

export default function isPlainObject( x ) {
// Basic check for Type object that's not null
  if ( isObj( x ) ) {

    // If Object.getPrototypeOf supported, use it
    if ( typeof Object.getPrototypeOf == 'function' ) {
      var proto = Object.getPrototypeOf( x );
      return proto === Object.prototype || proto === null;
    }

    // Otherwise, use internal class
    // This should be reliable as if getPrototypeOf not supported, is pre-ES5
    return Object.prototype.toString.call( x ) == '[object Object]';
  }

  // Not an object
  return false;
}
