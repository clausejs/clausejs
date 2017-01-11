require( 'babel-core/register' );


var C = require( '../src' );

var catS = function( str ) {
  return C.cat.apply( null, Array.from( str ).map( C.equals ) );
};

var VocabClause = C.or.apply( null, [ 'foo', 'bar', 'baz', ' ' ].map( catS ) );
var ContentClause = C.zeroOrMore( VocabClause );

var r = ContentClause.conform( ' baz foo bar bar' );

// console.log( r );
