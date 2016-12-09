var expect = require( 'chai' ).expect;

var S = require( '../src' );

describe( 'describe', () => {
  it( 'describes', () => {
    var NamedSpec = S.cat( 'zz', S.isFn, 'bb', S.isObj, 'cc', S.isFn, 'aa', S.isObj );
    var rNamedSpec = S.describe( NamedSpec );

    [ 'zz', 'bb', 'isObject', 'isFunction', 'aa', 'cc' ].forEach( ( s ) => {
      expect( rNamedSpec ).to.include( s );
    } )
  } );
} )
