var s = require( '../src/' );
var expect = require( 'chai' ).expect;
var Problem = s.Problem;

describe( 'collOf', () => {
  it( 'simple case', () => {
    var CollOfStrsSpec = s.collOf( s.isStr );

    var conformed = [ '', 'a', 'b', 'c' ];

    expect( CollOfStrsSpec.conform( conformed ) ).to.deep.equal( conformed );
  } );

  it( 'collOf cat', () => {
    var CollOfStrsSpec = s.collOf( s.cat( s.isStr, s.isNum, s.isBool ) );

    var conformed = [ [ 'a', 2, true ], [ 'b', 3, false ] ];
    expect( CollOfStrsSpec.conform( conformed ) ).to.deep.equal( conformed );

    var unconformed = [ [ 'a', 2, true ], [ 'b', 3, false ], [ 'd', '2', 'true' ] ];
    expect( CollOfStrsSpec.conform( unconformed ) ).to.be.an.instanceof( Problem );
  } );

  it( 'minCount and maxCount', () => {
    var CollOfStrsSpec = s.collOf( s.isNum, { minCount: 2, maxCount: 5 } );

    var conformed = [ 1, 2, 3 ];
    expect( CollOfStrsSpec.conform( conformed ) ).to.deep.equal( conformed );

    var unconformed1 = [ 1 ]; //too few
    var unconformed2 = [ 1, 2, 3, 4, 5, 6 ]; //too many
    expect( CollOfStrsSpec.conform( unconformed1 ) ).to.be.an.instanceof( Problem );
    expect( CollOfStrsSpec.conform( unconformed2 ) ).to.be.an.instanceof( Problem );
  } );
} );
