var expect = require( 'chai' ).expect;

var C = require( '../src' );

describe( 'describe', () => {
  it( 'describes', () => {
    var NamedSpec = C.cat( 'zz', C.isFn, 'bb', C.isObj, 'cc', C.isFn, 'aa', C.isObj );
    var rNamedSpec = C.describe( NamedSpec );

    [ 'zz', 'bb', 'isObject', 'isFunction', 'aa', 'cc' ].forEach( ( s ) => {
      expect( rNamedSpec ).to.include( s );
    } )
  } );
} )
