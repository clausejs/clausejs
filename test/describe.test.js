var expect = require( 'chai' ).expect;

var C = require( '../src' );

describe( 'describe', () => {
  it( 'describes', () => {
    var NamedClause = C.cat( 'zz', C.isFn, 'bb', C.isObj, 'cc', C.isFn, 'aa', C.isObj );
    var rNamedClause = C.describe( NamedClause );

    [ 'zz', 'bb', 'isObject', 'isFunction', 'aa', 'cc' ].forEach( ( s ) => {
      expect( rNamedClause ).to.include( s );
    } )
  } );
} )
