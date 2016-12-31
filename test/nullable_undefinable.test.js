var C = require( '../src' );
var expect = require( 'chai' ).expect;

describe( 'the void', () => {
  it( 'nullable', () => {
    var NullableSpec = C.nullable( C.cat( C.isNum, C.isObj ) );
    expect( NullableSpec.conform( [ 1, { c: 2 } ] ) ).to.deep.equal( [ 1, { c: 2 } ] );
    expect( NullableSpec.conform( null ) ).to.deep.equal( null );
  } );

  it( 'undefinable', () => {
    var UndefinableSpec = C.undefinable( C.cat( C.isNum, C.isObj ) );
    expect( UndefinableSpec.conform( [ 1, { c: 2 } ] ) ).to.deep.equal( [ 1, { c: 2 } ] );
    expect( UndefinableSpec.conform( null ) ).to.be.instanceOf( C.Problem );
    expect( UndefinableSpec.conform( ) ).to.equal( undefined );
  } );

  it( 'conbined', () => {
    var NullableUndefinableSpec = C.nullable( C.undefinable( C.cat( C.isNum, C.isObj ) ) );
    var UndefinableNullableSpec = C.undefinable( C.nullable( C.cat( C.isNum, C.isObj ) ) );

    [ NullableUndefinableSpec, UndefinableNullableSpec ].forEach( ( Spec ) => {
      expect( Spec.conform( [ 1, { c: 2 } ] ) ).to.deep.equal( [ 1, { c: 2 } ] );
      expect( Spec.conform( null ) ).to.deep.equal( null );
      expect( Spec.conform( ) ).to.equal( undefined );
    } );
  } );
} );
