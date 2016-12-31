const C = require( '../src' );
var expect = require( 'chai' ).expect;

function beginsWith( prefix ) {
  return ( x ) => x.indexOf( prefix ) === 0;
}

describe( 'mapOf', () => {
  it( 'empty clause args', () => {
    expect( () => C.mapOf() ).to.throw( C.Problem );
  } );

  it( 'basic case', () => {
    var MapOfClause = C.mapOf(
      beginsWith( 'me' ), C.isNatInt
    );

    var data = {
      meLike: 1,
      meFave: 22222,
      meGusta: 34932,
    };

    var unconformed1 = {
      hello: 123
    };

    var unconformed2 = {
      meLike: {},
      melol: 3444
    };

    expect( MapOfClause.conform( data ) ).to.deep.equal( data );
    expect( MapOfClause.conform( unconformed1 ) ).to.be.an.instanceOf( C.Problem );
    expect( MapOfClause.conform( unconformed2 ) ).to.be.an.instanceOf( C.Problem );
  } );
} );
