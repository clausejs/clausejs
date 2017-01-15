var expect = require( 'chai' ).expect;

var C = require( '../src' );
const repeat = require( '../src/utils/repeat' );

describe( 'describe', () => {
  it( 'contains expected words', () => {
    var NamedClause = C.cat( 'zz', C.isFn, 'bb', C.isObj, 'cc', C.isFn, 'aa', C.isObj );
    var rNamedClause = C.describe( NamedClause );

    [ 'zz', 'bb', 'isObject', 'isFunction', 'aa', 'cc' ].forEach( ( s ) => {
      expect( rNamedClause ).to.include( s );
    } )
  } );

  it( 'new line and indentation', () => {
    var NamedClause = C.cat( 'zz', C.isFn, 'bb', C.isObj, 'cc', C.isFn, 'aa', C.isObj );

    [ 10, 20, 30, 40 ].forEach( ( n ) => {
      const rNamedClause = C.describe( NamedClause, null, n );
      const pattern = repeat( n, ' ' ).join( '' );
      expect( _countOccurences( rNamedClause, pattern ) ).to.equal( 4 );
      expect( _countOccurences( rNamedClause, '\n' ) ).to.equal( 5 );
    } );
  } );
} );

function _countOccurences( str, pattern ) {
  let i = 0;
  let count = 0;
  while ( i < str.length ) {
    if ( str.slice( i, i + pattern.length ) === pattern ) {
      count += 1;
      i += pattern.length;
    } else {
      i += 1;
    }
  }
  return count;
}

