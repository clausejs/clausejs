import {cat, or, zeroOrMore, equals} from '../src';

var catS = function( str ) {
  return cat.apply( null, Array.from( str ).map( equals ) );
};

var VocabClause = or.apply( null, [ 'foo', 'bar', 'baz', ' ' ].map( catS ) );
var ContentClause = zeroOrMore( VocabClause );

var r = ContentClause.conform( ' baz foo bar bar' );
console.log(r);