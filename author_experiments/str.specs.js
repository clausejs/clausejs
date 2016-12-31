require( 'babel-core/register' );


var C = require( '../src' );

var catS = function( str ) {
  return C.cat.apply( null, Array.from( str ).map( C.equals ) );
};

var VocabSpec = C.or.apply( null, [ 'foo', 'bar', 'baz', ' ' ].map( catS ) );
var ContentSpec = C.zeroOrMore( VocabSpec );

var r = ContentSpec.conform( ' baz foo bar bar' );

console.log( r );
