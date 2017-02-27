var C = require( '../src/' );
import { expect } from "chai";

describe( 'perhaps, perhaps, perhaps', () => {
  it( 'nullable', () => {
    var NullableClause = C.nullable( C.cat( C.isNum, C.isObj ) );
    expect( NullableClause.conform( [ 1, { c: 2 } ] ) ).to.deep.equal( [ 1, { c: 2 } ] );
    expect( NullableClause.conform( null ) ).to.deep.equal( null );
  } );

  it( 'undefinable', () => {
    var UndefinableClause = C.undefinable( C.cat( C.isNum, C.isObj ) );
    expect( UndefinableClause.conform( [ 1, { c: 2 } ] ) ).to.deep.equal( [ 1, { c: 2 } ] );
    expect( UndefinableClause.conform( null ) ).to.be.instanceOf( C.Problem );
    expect( UndefinableClause.conform( ) ).to.equal( undefined );
  } );

  it( 'combined', () => {
    var NullableUndefinableClause = C.nullable( C.undefinable( C.cat( C.isNum, C.isObj ) ) );
    var UndefinableNullableClause = C.undefinable( C.nullable( C.cat( C.isNum, C.isObj ) ) );

    [ NullableUndefinableClause, UndefinableNullableClause ].forEach( ( Clause ) => {
      expect( Clause.conform( [ 1, { c: 2 } ] ) ).to.deep.equal( [ 1, { c: 2 } ] );
      expect( Clause.conform( null ) ).to.deep.equal( null );
      expect( Clause.conform( ) ).to.equal( undefined );
    } );
  } );

  it( 'maybe', () => {
    var MaybeClause = C.maybe( C.cat( C.isNum, C.isObj ) );


    expect( MaybeClause.conform( [ 1, { c: 2 } ] ) ).to.deep.equal( [ 1, { c: 2 } ] );
    expect( MaybeClause.conform( null ) ).to.deep.equal( null );
    expect( MaybeClause.conform( ) ).to.equal( undefined );
  } );
} );
