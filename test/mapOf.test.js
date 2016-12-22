const S = require( '../src' );

describe( 'mapOf', () => {
  it.skip( 'empty spec', () => {
    var EmptyMapOfSpec = S.mapOf();

    expect( S.isSpec( EmptyMapOfSpec ) ).to.be.true;
  } );
} )
