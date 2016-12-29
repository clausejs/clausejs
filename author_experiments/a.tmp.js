require( 'babel-core/register' );

var S = require( '../src' );

S( 'abc/A', S.cat( S.isStr ) );

//
// var MySpec = S.cat( S.oneOrMore( S.isNum ), S.zeroOrOne( S.isObj ) );
// var r = S.isValid( MySpec, [ 1, 2, 3, { a: 1 } ] );
//
// var MyLabelledSpec = S.cat(
//     'myNumbers', S.oneOrMore( S.isNum ),
//     'myObject', S.zeroOrMore( S.isObj )
//   );
//
// var r = S.conform( MyLabelledSpec, [ 1, 2, 3, { a: 1 } ] );
//
// console.log( r );
