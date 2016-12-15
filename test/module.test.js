var S = require( '../src/' );
var expect = require( 'chai' ).expect;

describe( 'module integrity', () => {
  var fnList = [ 'shape', 'isValid', 'conform', 'fspec', 'isObj', 'isFn', 'wall' ];

  it( 'should contain all the core functions', () => {
    var SpecObj = S.shape( { req: [ 'shape' ] } );
    var InsaneSpecObj = S.shape( { req: fnList.concat( [ 'voodooooooooo' ] ) } );
    expect( S.isValid( SpecObj, S ) ).to.be.true;
    expect( S.isValid( InsaneSpecObj, S ) ).to.be.false;
  } );
} );
