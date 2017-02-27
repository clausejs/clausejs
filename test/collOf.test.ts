import * as C from "../src";
import {expect} from "chai";
var Problem = C.Problem;

describe( 'collOf', () => {
  it( 'simple case', () => {
    var CollOfStrsClause = C.collOf( C.isStr );

    var conformed = [ '', 'a', 'b', 'c' ];

    expect( CollOfStrsClause.conform( conformed ) ).to.deep.equal( conformed );
  } );

  it( 'collOf cat', () => {
    var CollOfStrsClause = C.collOf( C.cat( C.isStr, C.isNum, C.isBool ) );

    var conformed = [ [ 'a', 2, true ], [ 'b', 3, false ] ];
    expect( CollOfStrsClause.conform( conformed ) ).to.deep.equal( conformed );

    var unconformed = [ [ 'a', 2, true ], [ 'b', 3, false ], [ 'd', '2', 'true' ] ];
    expect( CollOfStrsClause.conform( unconformed ) ).to.be.an.instanceof( Problem );
  } );

  it( 'minCount and maxCount', () => {
    var CollOfStrsClause = C.collOf( C.isNum, { minCount: 2, maxCount: 5 } );

    var conformed = [ 1, 2, 3 ];
    expect( CollOfStrsClause.conform( conformed ) ).to.deep.equal( conformed );

     //too few
    var unconformed1 = [ 1 ];
    //too many
    var unconformed2 = [ 1, 2, 3, 4, 5, 6 ];
    expect( CollOfStrsClause.conform( unconformed1 ) ).to.be.an.instanceof( Problem );
    expect( CollOfStrsClause.conform( unconformed2 ) ).to.be.an.instanceof( Problem );
  } );
} );
