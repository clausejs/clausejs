const S = require( '../src' );
var expect = require( 'chai' ).expect;

function beginsWith( prefix ) {
  return ( x ) => x.indexOf( prefix ) === 0;
}

describe( 'mapOf', () => {
  it( 'empty spec args', () => {
    expect( () => S.mapOf() ).to.throw( S.Problem );
  } );

  it( 'basic case', () => {
    var MapOfSpec = S.mapOf(
      beginsWith( 'me' ), S.isNatInt
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

    expect( MapOfSpec.conform( data ) ).to.deep.equal( data );
    expect( MapOfSpec.conform( unconformed1 ) ).to.be.an.instanceOf( S.Problem );
    expect( MapOfSpec.conform( unconformed2 ) ).to.be.an.instanceOf( S.Problem );
  } );
} );
