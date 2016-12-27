require( 'babel-core/register' );


var S = require( '../src' );

var catS = function( str ) {
  return S.cat.apply( null, Array.from( str ).map( S.equals ) );
};

var VocabSpec = S.or.apply( null, [ 'foo', 'bar', 'baz', ' ' ].map( catS ) );
var ContentSpec = S.zeroOrMore( VocabSpec );

var r = ContentSpec.conform( ' baz foo bar bar' );

console.log( r );
