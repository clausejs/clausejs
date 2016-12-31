var C = require( '../src/' );
var expect = require( 'chai' ).expect;

describe( 'module integrity', () => {
  var fnList = [ 'shape', 'isValid', 'conform', 'fspec', 'isObj', 'isFn', 'wall' ];

  it( 'should contain all the core functions', () => {
    var SpecObj = C.shape( { req: [ 'shape' ] } );
    var InsaneSpecObj = C.shape( { req: fnList.concat( [ 'voodooooooooo' ] ) } );
    expect( C.isValid( SpecObj, C ) ).to.be.true;
    expect( C.isValid( InsaneSpecObj, C ) ).to.be.false;
  } );
} );
