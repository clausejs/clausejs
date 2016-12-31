require( 'babel-core/register' );

var C = require( '../src' );

C( 'abc/A', C.cat( C.isStr ) );

//
// var MySpec = C.cat( C.oneOrMore( C.isNum ), C.zeroOrOne( C.isObj ) );
// var r = C.isValid( MySpec, [ 1, 2, 3, { a: 1 } ] );
//
// var MyLabelledSpec = C.cat(
//     'myNumbers', C.oneOrMore( C.isNum ),
//     'myObject', C.zeroOrMore( C.isObj )
//   );
//
// var r = C.conform( MyLabelledSpec, [ 1, 2, 3, { a: 1 } ] );
//
// console.log( r );
