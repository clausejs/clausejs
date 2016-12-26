var S = require( '../src' );
var expect = require( 'chai' ).expect;

describe( 'the void', () => {
  it( 'nullable', () => {
    var NullableSpec = S.nullable( S.cat( S.isNum, S.isObj ) );
    expect( NullableSpec.conform( [ 1, { c: 2 } ] ) ).to.deep.equal( [ 1, { c: 2 } ] );
    expect( NullableSpec.conform( null ) ).to.deep.equal( null );
  } );

  it( 'undefinable', () => {
    var UndefinableSpec = S.undefinable( S.cat( S.isNum, S.isObj ) );
    expect( UndefinableSpec.conform( [ 1, { c: 2 } ] ) ).to.deep.equal( [ 1, { c: 2 } ] );
    expect( UndefinableSpec.conform( null ) ).to.be.instanceOf( S.Problem );
    expect( UndefinableSpec.conform( ) ).to.equal( undefined );
  } );

  it( 'conbined', () => {
    var NullableUndefinableSpec = S.nullable( S.undefinable( S.cat( S.isNum, S.isObj ) ) );
    var UndefinableNullableSpec = S.undefinable( S.nullable( S.cat( S.isNum, S.isObj ) ) );

    [ NullableUndefinableSpec, UndefinableNullableSpec ].forEach( ( Spec ) => {
      expect( Spec.conform( [ 1, { c: 2 } ] ) ).to.deep.equal( [ 1, { c: 2 } ] );
      expect( Spec.conform( null ) ).to.deep.equal( null );
      expect( Spec.conform( ) ).to.equal( undefined );
    } );
  } );
} );
