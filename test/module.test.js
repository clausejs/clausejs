var C = require( '../src/' );
var expect = require( 'chai' ).expect;

describe( 'module integrity', () => {
  var fnList = [ 'shape', 'isValid', 'conform', 'fclause', 'isObj', 'isFn', 'wall' ];

  it( 'should contain all the core functions', () => {
    var ClauseObj = C.shape( { req: [ 'shape' ] } );
    var InsaneClauseObj = C.shape( { req: fnList.concat( [ 'voodooooooooo' ] ) } );
    expect( C.isValid( ClauseObj, C ) ).to.be.true;
    expect( C.isValid( InsaneClauseObj, C ) ).to.be.false;
  } );
} );
